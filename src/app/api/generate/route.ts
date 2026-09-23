import { NextResponse } from "next/server";
import { generateWeddingLook } from "@/lib/ai/service";
import type { WeddingLookRequest } from "@/lib/ai/types";
import { usageConfig } from "@/config/wedding";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { imageBase64, mimeType, gender, occasionId, outfitId, styleId } =
      body as Partial<WeddingLookRequest>;

    // Validate required fields
    if (!imageBase64 || !mimeType || !gender || !occasionId || !outfitId || !styleId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Validate MIME type
    if (!usageConfig.supportedMimeTypes.includes(mimeType)) {
      return NextResponse.json(
        { error: "Please upload a JPG or PNG image." },
        { status: 400 },
      );
    }

    // Validate gender
    if (gender !== "women" && gender !== "men") {
      return NextResponse.json(
        { error: "Invalid gender selection." },
        { status: 400 },
      );
    }

    // Check approximate base64 size (rough: base64 is ~4/3 of original)
    const approxBytes = (imageBase64.length * 3) / 4;
    if (approxBytes > usageConfig.maxUploadSizeBytes) {
      return NextResponse.json(
        { error: "Image is too large. Please use an image under 10MB." },
        { status: 400 },
      );
    }

    const result = await generateWeddingLook({
      imageBase64,
      mimeType,
      gender,
      occasionId,
      outfitId,
      styleId,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? "Generation failed. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      imageBase64: result.imageBase64,
      imageUrl: result.imageUrl,
      metadata: result.metadata,
    });
  } catch (error) {
    console.error("[VivahLook] /api/generate error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
