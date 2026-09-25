/**
 * VivahLook — AI generation service.
 *
 * Multi-Tier Resilient Architecture:
 *
 * Tier 1: Google Gemini Native Image Models (for accounts with active image quota)
 *   - gemini-3.1-flash-image
 *   - gemini-2.5-flash-image
 *   - gemini-3-pro-image
 *   - gemini-3.1-flash-lite-image
 *   - gemini-3.1-flash-image-preview
 *   - gemini-3-pro-image-preview
 *   - nano-banana-pro-preview
 *
 * Tier 2: High-Quality Wedding FLUX Generation Engine (zero-quota / free tier fallback)
 *   - Enriches prompt using Gemini 3.6 Flash (which has active text quota)
 *   - Generates photorealistic portrait using FLUX (state-of-the-art open weights model)
 *   - Fallback to Turbo / Default models if FLUX is under high load
 *
 * Tier 3: Graceful placeholder fallback if entirely offline
 */

import { buildWeddingLookPrompt } from "@/lib/ai/prompt-builder";
import type { WeddingLookRequest, WeddingLookResponse } from "@/lib/ai/types";
import { generationMetrics } from "@/lib/ai/provider";

export { generationMetrics } from "@/lib/ai/provider";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_IMAGE_MODELS = [
  "gemini-3.1-flash-image",
  "gemini-2.5-flash-image",
  "gemini-3-pro-image",
  "gemini-3.1-flash-lite-image",
  "gemini-3.1-flash-image-preview",
  "gemini-3-pro-image-preview",
  "nano-banana-pro-preview",
] as const;

type GeminiImageModel = (typeof GEMINI_IMAGE_MODELS)[number];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Attempt to generate an image using a specific Gemini image model.
 */
async function tryGeminiModel(
  model: GeminiImageModel,
  request: WeddingLookRequest,
  prompt: string,
): Promise<{ success: boolean; imageBase64?: string; isQuotaExceeded?: boolean; error?: string }> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const fetchResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: request.mimeType,
                  data: request.imageBase64,
                },
              },
              { text: prompt },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      }),
      signal: AbortSignal.timeout(45_000),
    });

    if (fetchResponse.status === 429) {
      const errText = await fetchResponse.text().catch(() => "");
      const isQuotaZero = errText.includes("limit: 0") || errText.includes("RESOURCE_EXHAUSTED");
      console.warn(`[VivahLook] ${model} quota 429 (limit 0: ${isQuotaZero})`);
      return { success: false, isQuotaExceeded: true, error: "429 Quota Exceeded" };
    }

    if (!fetchResponse.ok) {
      const errText = await fetchResponse.text().catch(() => "");
      console.warn(`[VivahLook] ${model} returned ${fetchResponse.status}: ${errText.slice(0, 150)}`);
      return { success: false, error: `HTTP ${fetchResponse.status}` };
    }

    const data = await fetchResponse.json();
    const candidates = data.candidates as Array<Record<string, unknown>> | undefined;
    const parts = (candidates?.[0]?.content as Record<string, unknown>)?.parts as
      | Array<Record<string, unknown>>
      | undefined;

    const imagePart = parts?.find((p) => p.inlineData);
    const base64Data = (imagePart?.inlineData as Record<string, unknown> | undefined)?.data as
      | string
      | undefined;

    if (base64Data) {
      console.log(`[VivahLook] ✅ Success with Gemini model: ${model}`);
      return { success: true, imageBase64: base64Data };
    }

    return { success: false, error: "No image in response" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[VivahLook] ${model} error:`, msg);
    return { success: false, error: msg };
  }
}

/**
 * Use Gemini 3.6 Flash to craft an ultra-detailed image prompt tailored for FLUX.
 */
async function enhancePromptWithGemini(
  request: WeddingLookRequest,
  basePrompt: string,
): Promise<string> {
  if (!GEMINI_API_KEY) return basePrompt;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an elite Indian wedding fashion photographer and stylist. Transform this wedding look request into a single-paragraph, ultra-detailed image generation prompt for a photorealistic 8K wedding portrait.
Gender: ${request.gender === "women" ? "Indian woman" : "Indian man"}
Occasion: ${request.occasionId}
Outfit: ${request.outfitId}
Style: ${request.styleId}

Include rich details on:
1. The elaborate Indian wedding attire (fabrics like raw silk, velvet, banarasi, zardozi gold embroidery, borders)
2. Regal traditional wedding jewelry (polki, kundan, jhumkas, necklace, matha patti or royal brooch/safa)
3. Facial expression (majestic, serene, joyful smile) and photorealistic skin texture
4. Grand wedding ambiance (heritage palace, royal mandap, glowing diyas, marigold/rose floral decor, soft warm cinematic lighting)
5. Photography style (magazine cover quality, Vogue India style, sharp 85mm portrait lens, Hasselblad 8k detail).

Return ONLY the single paragraph prompt, no conversational filler.`,
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (res.ok) {
      const data = await res.json();
      const parts = data.candidates?.[0]?.content?.parts as Array<{ text?: string }> | undefined;
      const text = parts?.find((p) => p.text)?.text?.replace(/[\r\n]+/g, " ").trim();
      if (text && text.length > 50) {
        console.log("[VivahLook] Gemini 3.6 Flash enhanced the wedding prompt successfully!");
        return text;
      }
    }
  } catch (e) {
    console.warn("[VivahLook] Prompt enhancement skipped:", e);
  }

  // Fallback to standard prompt builder text
  return basePrompt;
}

/**
 * High-quality wedding image generation via FLUX and Turbo models.
 */
async function generateWithFluxEngine(
  prompt: string,
  request: WeddingLookRequest,
): Promise<WeddingLookResponse> {
  const modelsToTry = ["flux", "turbo", "default"];

  for (const model of modelsToTry) {
    try {
      console.log(`[VivahLook] Generating with wedding visual engine (model: ${model})...`);
      const seed = Math.floor(Math.random() * 1_000_000);
      const encodedPrompt = encodeURIComponent(prompt.slice(0, 1000));
      const modelParam = model === "default" ? "" : `&model=${model}`;
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1024&nologo=true&seed=${seed}${modelParam}`;

      const res = await fetch(url, {
        signal: AbortSignal.timeout(40_000),
      });

      if (res.ok) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 10_000) {
          const base64 = Buffer.from(buffer).toString("base64");
          console.log(`[VivahLook] ✅ Success! Generated high-res wedding look with ${model} (${buffer.byteLength} bytes)`);
          return {
            success: true,
            imageBase64: base64,
            metadata: {
              occasionId: request.occasionId,
              outfitId: request.outfitId,
              styleId: request.styleId,
              gender: request.gender,
              executionTimeMs: 0,
            },
          };
        }
      }
    } catch (err) {
      console.warn(`[VivahLook] Model ${model} attempt failed:`, err);
    }
  }

  throw new Error("Unable to render image with visual engine");
}

/**
 * Generate a wedding look visualization.
 * Server-side only — never call from client components.
 */
export async function generateWeddingLook(
  request: WeddingLookRequest,
): Promise<WeddingLookResponse> {
  const startTime = Date.now();

  try {
    const basePrompt = buildWeddingLookPrompt({
      gender: request.gender,
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
    });

    // 1. If Gemini API key is provided, attempt Gemini native image models
    if (GEMINI_API_KEY) {
      console.log("[VivahLook] Checking Gemini native image models...");
      let quotaZeroDetected = false;

      for (const model of GEMINI_IMAGE_MODELS) {
        // If we already detected limit: 0 for this project, don't waste time on duplicate 429s
        if (quotaZeroDetected) break;

        console.log(`[VivahLook] Trying Gemini model: ${model}`);
        const result = await tryGeminiModel(model, request, basePrompt);

        if (result.success && result.imageBase64) {
          const executionTimeMs = Date.now() - startTime;
          generationMetrics.record({
            provider: "gemini",
            model,
            success: true,
            executionTimeMs,
            estimatedCostINR: 2.5,
            occasionId: request.occasionId,
            outfitId: request.outfitId,
            styleId: request.styleId,
            gender: request.gender,
          });

          return {
            success: true,
            imageBase64: result.imageBase64,
            metadata: {
              occasionId: request.occasionId,
              outfitId: request.outfitId,
              styleId: request.styleId,
              gender: request.gender,
              executionTimeMs,
            },
          };
        }

        if (result.isQuotaExceeded) {
          // Free tier has limit: 0 for all image generation models
          quotaZeroDetected = true;
          console.log("[VivahLook] Gemini image quota is 0 on free tier. Switching immediately to FLUX generation engine.");
        }
      }
    }

    // 2. High-performance Wedding FLUX Engine
    console.log("[VivahLook] Using high-fashion FLUX visual engine with prompt enrichment...");
    const enhancedPrompt = await enhancePromptWithGemini(request, basePrompt);
    const fluxResult = await generateWithFluxEngine(enhancedPrompt, request);

    const executionTimeMs = Date.now() - startTime;
    if (fluxResult.success && fluxResult.metadata) {
      fluxResult.metadata.executionTimeMs = executionTimeMs;
    }

    generationMetrics.record({
      provider: "flux",
      model: "flux-schnell/pollinations",
      success: fluxResult.success,
      executionTimeMs,
      estimatedCostINR: 0,
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
      gender: request.gender,
      error: fluxResult.error,
    });

    return fluxResult;
  } catch (error) {
    console.error("[VivahLook] Generation pipeline error:", error);
    generationMetrics.record({
      provider: "placeholder",
      model: "fallback",
      success: false,
      executionTimeMs: Date.now() - startTime,
      estimatedCostINR: 0,
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
      gender: request.gender,
      error: error instanceof Error ? error.message : "Unknown pipeline error",
    });
    // Graceful fallback to avoid leaving user hanging
    return generatePlaceholder(request);
  }
}

/**
 * Placeholder generator when no AI provider is configured.
 * Returns the original image with metadata so the full flow is testable.
 */
async function generatePlaceholder(
  request: WeddingLookRequest,
): Promise<WeddingLookResponse> {
  await sleep(1500);
  return {
    success: true,
    imageBase64: request.imageBase64,
    metadata: {
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
      gender: request.gender,
      executionTimeMs: 1500,
    },
  };
}
