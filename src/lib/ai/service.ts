/**
 * VivahLook — AI generation service.
 *
 * Abstracted generation orchestrator that dispatches to the configured provider.
 * Currently supports Google Gemini API. Falls back to a placeholder when no API key is set.
 */

import { buildWeddingLookPrompt } from "@/lib/ai/prompt-builder";
import type { WeddingLookRequest, WeddingLookResponse } from "@/lib/ai/types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Generate a wedding look visualization.
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

    let result: WeddingLookResponse;

    if (GEMINI_API_KEY) {
      result = await generateWithGemini(request, prompt);
    } else {
      result = await generatePlaceholder(request);
    }

    const executionTimeMs = Date.now() - startTime;
    if (result.success && result.metadata) {
      result.metadata.executionTimeMs = executionTimeMs;
    }

    return result;
  } catch (error) {
    console.error("[VivahLook] Generation failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't create your look this time. Please try again.",
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

async function generateWithGemini(
  request: WeddingLookRequest,
  prompt: string,
): Promise<WeddingLookResponse> {
  // gemini-2.5-flash-image: supports image input + image output generation
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(apiUrl, {
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
    signal: AbortSignal.timeout(120_000), // 2 minute timeout
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[VivahLook] Gemini API error:", response.status, errorText);

    if (response.status === 429) {
      return {
        success: false,
        error: "We're experiencing high demand. Please try again in a moment.",
      };
    }

    // Parse the error for a cleaner message
    let apiErrorMsg = `Gemini API error ${response.status}`;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson?.error?.message) apiErrorMsg = errJson.error.message;
    } catch {
      // keep generic message
    }

    return {
      success: false,
      error: `We couldn't create your look. (${apiErrorMsg})`,
    };
  }

  const data = await response.json();

  // Extract generated image from Gemini response
  const candidates = data.candidates;
  if (!candidates || candidates.length === 0) {
    return {
      success: false,
      error: "No result was generated. Please try a different photo or outfit.",
    };
  }

  const parts = candidates[0]?.content?.parts;
  if (!parts) {
    return {
      success: false,
      error: "No result was generated. Please try again.",
    };
  }

  // Find the image part in the response
  const imagePart = parts.find(
    (part: Record<string, unknown>) => part.inlineData,
  );

  if (!imagePart?.inlineData?.data) {
    return {
      success: false,
      error:
        "The AI could not generate an outfit image. Please try a clearer photo.",
    };
  }

  return {
    success: true,
    imageBase64: imagePart.inlineData.data as string,
    metadata: {
      occasionId: request.occasionId,
      outfitId: request.outfitId,
      styleId: request.styleId,
      gender: request.gender,
      executionTimeMs: 0,
    },
  };
}

/**
 * Placeholder generator when no AI provider is configured.
 * Returns the original image with metadata so the full flow is testable.
 */
async function generatePlaceholder(
  request: WeddingLookRequest,
): Promise<WeddingLookResponse> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
