/**
 * VivahLook — Provider-Agnostic AI Image Generation Interface.
 *
 * Allows switching between Gemini, FLUX, Replicate, Fal.ai, or custom GPU endpoints
 * without changing the Studio UX, payment system, database, or API contracts.
 */

import type { WeddingLookRequest } from "@/lib/ai/types";

export type GenerationResult = {
  success: boolean;
  imageBase64?: string;
  imageUrl?: string;
  error?: string;
  provider: string;
  model: string;
  executionTimeMs: number;
  estimatedCostINR: number;
  metadata?: Record<string, unknown>;
};

export interface AIImageProvider {
  readonly id: string;
  readonly name: string;
  readonly estimatedCostINR: number;

  isConfigured(): boolean;

  generate(
    request: WeddingLookRequest,
    prompt: string,
  ): Promise<GenerationResult>;
}

/**
 * Generation Cost Tracking & Telemetry Record
 */
export type GenerationTelemetry = {
  id: string;
  timestamp: string;
  provider: string;
  model: string;
  success: boolean;
  executionTimeMs: number;
  estimatedCostINR: number;
  occasionId: string;
  outfitId: string;
  styleId: string;
  gender: string;
  error?: string;
};

// Internal in-memory telemetry buffer (synced to Supabase/logs in production)
class GenerationMetricsTracker {
  private logs: GenerationTelemetry[] = [];

  record(event: Omit<GenerationTelemetry, "id" | "timestamp">) {
    const record: GenerationTelemetry = {
      ...event,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `gen_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    this.logs.push(record);
    // Keep last 1,000 events in memory
    if (this.logs.length > 1000) this.logs.shift();
  }

  getSummary() {
    const total = this.logs.length;
    const successful = this.logs.filter((l) => l.success).length;
    const failed = total - successful;
    const totalCostINR = this.logs.reduce((acc, l) => acc + (l.estimatedCostINR || 0), 0);
    const avgLatencyMs =
      total > 0
        ? Math.round(this.logs.reduce((acc, l) => acc + l.executionTimeMs, 0) / total)
        : 0;

    const byProvider: Record<string, { count: number; costINR: number }> = {};
    for (const log of this.logs) {
      if (!byProvider[log.provider]) {
        byProvider[log.provider] = { count: 0, costINR: 0 };
      }
      byProvider[log.provider].count += 1;
      byProvider[log.provider].costINR += log.estimatedCostINR || 0;
    }

    return {
      total,
      successful,
      failed,
      successRatePct: total > 0 ? Math.round((successful / total) * 100) : 0,
      totalCostINR: Math.round(totalCostINR * 100) / 100,
      avgLatencyMs,
      byProvider,
    };
  }

  getRecentLogs(limit = 50) {
    return [...this.logs].reverse().slice(0, limit);
  }
}

export const generationMetrics = new GenerationMetricsTracker();
