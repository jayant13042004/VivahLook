/**
 * VivahLook — AI generation service.
 *
 * Waterfall fallback across all Gemini image-generation models.
 * If one model is rate-limited or errors, the next model is tried automatically.
 *
 * Model priority (best quality → fastest):
 *  1. gemini-3.1-flash-image       (Nano Banana 2 — recommended, stable)
 *  2. gemini-2.5-flash-image        (Nano Banana — stable, fast)
 *  3. gemini-3-pro-image            (Nano Banana Pro — highest quality)
 *  4. gemini-3.1-flash-lite-image   (Nano Banana 2 Lite — ultra fast)
 *  5. gemini-2.0-flash-preview-image-generation (legacy preview fallback)
 */

import { buildWeddingLookPrompt } from "@/lib/ai/prompt-builder";
import type { WeddingLookRequest, WeddingLookResponse } from "@/lib/ai/types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/** All Gemini models that support image output, in preference order. */
const IMAGE_MODELS = [
  "gemini-3.1-flash-image",
  "gemini-2.5-flash-image",
  "gemini-3-pro-image",
  "gemini-3.1-flash-lite-image",
  "gemini-2.0-flash-preview-image-generation",
] as const;

type ImageModel = (typeof IMAGE_MODELS)[number];

/** Sleep helper for backoff. */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Attempt to call a single model. Returns:
 *  - { ok: true, response: WeddingLookResponse } on success
 *  - { ok: false, retryable: true } on 429/503 (try next model)
 *  - { ok: false, retryable: false, error: string } on hard failure
 */
async function tryModel(
  model: ImageModel,
  request: WeddingLookRequest,
  prompt: string,
  attempt: number,
): Promise<
  | { ok: true; response: WeddingLookResponse }
  | { ok: false; retryable: boolean; error: string }
> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  let fetchResponse: Response;
  try {
    fetchResponse = await fetch(apiUrl, {
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
      signal: AbortSignal.timeout(90_000), // 90s per model attempt
    });
  } catch (err) {
    // Network error / timeout
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[VivahLook] ${model} attempt ${attempt} network error:`, msg);
    return { ok: false, retryable: true, error: msg };
  }

  // Rate limit or service unavailable — retry with next model
  if (fetchResponse.status === 429 || fetchResponse.status === 503) {
    const body = await fetchResponse.text().catch(() => "");
    console.warn(
      `[VivahLook] ${model} returned ${fetchResponse.status} (attempt ${attempt}). Moving to next model.`,
      body.slice(0, 200),
    );
    return { ok: false, retryable: true, error: `HTTP ${fetchResponse.status}` };
  }

  // Model not found or not available for this key — try next
  if (fetchResponse.status === 404 || fetchResponse.status === 403) {
    const body = await fetchResponse.text().catch(() => "");
    console.warn(
      `[VivahLook] ${model} not available (${fetchResponse.status}). Skipping.`,
      body.slice(0, 200),
    );
    return { ok: false, retryable: true, error: `HTTP ${fetchResponse.status}` };
  }

  // Other HTTP error
  if (!fetchResponse.ok) {
    const errorText = await fetchResponse.text().catch(() => "");
    let apiMsg = `HTTP ${fetchResponse.status}`;
    try {
      const j = JSON.parse(errorText);
      if (j?.error?.message) apiMsg = j.error.message;
    } catch {
      // ignore parse error
    }
    console.error(`[VivahLook] ${model} hard error:`, fetchResponse.status, errorText.slice(0, 300));
    return { ok: false, retryable: false, error: apiMsg };
  }

  // Parse successful response
  let data: Record<string, unknown>;
  try {
    data = await fetchResponse.json();
  } catch {
    console.error(`[VivahLook] ${model} — failed to parse JSON response`);
    return { ok: false, retryable: true, error: "Invalid JSON response from API" };
  }

  const candidates = (data.candidates as Array<Record<string, unknown>> | undefined);
  if (!candidates || candidates.length === 0) {
    // Could be a safety filter block — log and try next model
    const blockReason = (data as Record<string, unknown>)?.promptFeedback;
    console.warn(`[VivahLook] ${model} returned no candidates. Block reason:`, JSON.stringify(blockReason));
    return { ok: false, retryable: true, error: "No candidates returned" };
  }

  const parts = (candidates[0]?.content as Record<string, unknown>)
    ?.parts as Array<Record<string, unknown>> | undefined;

  if (!parts || parts.length === 0) {
    console.warn(`[VivahLook] ${model} — candidate has no parts`);
    return { ok: false, retryable: true, error: "No parts in candidate" };
  }

  // Find the image part
  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart?.inlineData) {
    // Gemini may return only text if it couldn't generate an image
    const textPart = parts.find((p) => p.text);
    console.warn(
      `[VivahLook] ${model} — no image part found. Text response:`,
      (textPart?.text as string | undefined)?.slice(0, 200),
    );
    return { ok: false, retryable: true, error: "API returned text but no image" };
  }

  const inlineData = imagePart.inlineData as Record<string, unknown>;
  if (!inlineData.data) {
    console.warn(`[VivahLook] ${model} — inlineData has no data field`);
    return { ok: false, retryable: true, error: "Empty image data in response" };
  }

  console.log(`[VivahLook] ✅ Success with model: ${model}`);

  return {
    ok: true,
    response: {
      success: true,
      imageBase64: inlineData.data as string,
      metadata: {
        occasionId: request.occasionId,
        outfitId: request.outfitId,
        styleId: request.styleId,
        gender: request.gender,
        executionTimeMs: 0,
      },
    },
  };
}

/**
 * Generate a wedding look visualization.
 * Tries all image-generation models in order; falls back through them on rate
 * limits, quota errors, or unavailability.
 * Server-side only — never call from client components.
 */
export async function generateWeddingLook(
  request: WeddingLookRequest,
): Promise<WeddingLookResponse> {
  const startTime = Date.now();

  try {
    const prompt = buildWeddingLookPrompt({
      gender: request.gender,
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
    });

    // No API key — use placeholder mode
    if (!GEMINI_API_KEY) {
      console.log("[VivahLook] No GEMINI_API_KEY set — using placeholder mode");
      return generatePlaceholder(request);
    }

    const errors: string[] = [];

    // Waterfall: try each model with a short backoff between attempts
    for (let i = 0; i < IMAGE_MODELS.length; i++) {
      const model = IMAGE_MODELS[i];

      // Small progressive backoff between model attempts (not on first)
      if (i > 0) {
        const backoffMs = Math.min(1500 * i, 5000); // 1.5s, 3s, 4.5s, 5s
        console.log(`[VivahLook] Waiting ${backoffMs}ms before trying ${model}...`);
        await sleep(backoffMs);
      }

      console.log(`[VivahLook] Trying model ${i + 1}/${IMAGE_MODELS.length}: ${model}`);
      const result = await tryModel(model, request, prompt, i + 1);

      if (result.ok) {
        const executionTimeMs = Date.now() - startTime;
        if (result.response.metadata) {
          result.response.metadata.executionTimeMs = executionTimeMs;
        }
        return result.response;
      }

      errors.push(`${model}: ${result.error}`);

      // Hard failure (auth/billing issue) — no point trying other models
      if (!result.retryable) {
        console.error("[VivahLook] Hard failure — stopping waterfall:", result.error);
        return {
          success: false,
          error: `Generation failed: ${result.error}`,
          metadata: {
            occasionId: request.occasionId,
            outfitId: request.outfitId,
            styleId: request.styleId,
            gender: request.gender,
            executionTimeMs: Date.now() - startTime,
          },
        };
      }
    }

    // All models exhausted
    console.error("[VivahLook] All models failed:", errors);
    return {
      success: false,
      error:
        "All AI models are currently busy. Please wait 30 seconds and try again.",
      metadata: {
        occasionId: request.occasionId,
        outfitId: request.outfitId,
        styleId: request.styleId,
        gender: request.gender,
        executionTimeMs: Date.now() - startTime,
      },
    };
  } catch (error) {
    console.error("[VivahLook] Unexpected generation error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something unexpected went wrong. Please try again.",
      metadata: {
        occasionId: request.occasionId,
        outfitId: request.outfitId,
        styleId: request.styleId,
        gender: request.gender,
        executionTimeMs: Date.now() - startTime,
      },
    };
  }
}

/**
 * Placeholder generator when no AI provider is configured.
 * Returns the original image with metadata so the full flow is testable.
 */
async function generatePlaceholder(
  request: WeddingLookRequest,
): Promise<WeddingLookResponse> {
  await sleep(2000); // simulate processing
  return {
    success: true,
    imageBase64: request.imageBase64,
    metadata: {
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
      gender: request.gender,
      executionTimeMs: 2000,
    },
  };
}
