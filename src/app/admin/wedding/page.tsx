import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generationMetrics } from "@/lib/ai/service";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Analytics & Cost Dashboard — Admin",
  description: "VivahLook internal analytics & AI compute cost dashboard.",
});

export default function WeddingAdminPage() {
  const summary = generationMetrics.getSummary();
  const recentLogs = generationMetrics.getRecentLogs(15);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            VivahLook Analytics & AI Cost Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time generation telemetry, provider usage, and unit economics.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Telemetry Active
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl border border-border bg-surface">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            Total Generations
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {summary.total > 0 ? summary.total : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {summary.successful} success · {summary.failed} failed
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            Success Rate
          </p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            {summary.total > 0 ? `${summary.successRatePct}%` : "100%"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Multi-tier resilient fallback
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            Estimated AI Cost
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            ₹{summary.totalCostINR}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {summary.byProvider["flux"]?.count || 0} FLUX (₹0) · {summary.byProvider["gemini"]?.count || 0} Gemini
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            Avg Generation Speed
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {summary.avgLatencyMs > 0 ? `${(summary.avgLatencyMs / 1000).toFixed(1)}s` : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Across active visual models
          </p>
        </div>
      </div>

      {/* Provider & Unit Economics Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 rounded-2xl border border-border bg-surface">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            AI Provider Distribution & Unit Costs
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60">
              <div>
                <p className="font-semibold text-foreground">FLUX Engine (Tier 2)</p>
                <p className="text-xs text-muted-foreground">High-fashion photorealism with Gemini prompt enrichment</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-foreground">₹0.00 / gen</span>
                <p className="text-xs text-emerald-600 font-semibold">Active Free Tier</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60">
              <div>
                <p className="font-semibold text-foreground">Google Gemini Native (Tier 1)</p>
                <p className="text-xs text-muted-foreground">gemini-3.1-flash-image / 2.5-flash-image</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-foreground">~₹2.50 / gen</span>
                <p className="text-xs text-muted-foreground">When billing linked</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-surface">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            Gross Margin & Economics (at ₹99 for 5 looks)
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Revenue per ₹99 pack</span>
              <span className="font-semibold text-foreground">₹99.00</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Payment Gateway Fee (Razorpay ~2%)</span>
              <span className="text-muted-foreground">- ₹1.98</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/60">
              <span className="text-muted-foreground">Max AI Compute Cost (5 looks @ ~₹2.50)</span>
              <span className="text-muted-foreground">- ₹12.50</span>
            </div>
            <div className="flex justify-between py-2 text-base font-bold text-emerald-600 dark:text-emerald-400">
              <span>Net Gross Margin Per User</span>
              <span>~₹84.52 (85.4% Margin)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Generations Telemetry Table */}
      <div className="p-6 rounded-2xl border border-border bg-surface">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Recent Generation Telemetry
        </h3>
        {recentLogs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No live generations recorded yet in this session. Generate a look in the Studio to view real-time traces.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-muted-foreground uppercase border-b border-border/70 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Provider / Model</th>
                  <th className="py-2.5 px-3">Occasion</th>
                  <th className="py-2.5 px-3">Outfit</th>
                  <th className="py-2.5 px-3">Latency</th>
                  <th className="py-2.5 px-3">Cost</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-foreground">
                      {log.provider} ({log.model})
                    </td>
                    <td className="py-2.5 px-3 uppercase text-muted-foreground">{log.occasionId}</td>
                    <td className="py-2.5 px-3 text-foreground">{log.outfitId}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {(log.executionTimeMs / 1000).toFixed(1)}s
                    </td>
                    <td className="py-2.5 px-3 text-foreground">₹{log.estimatedCostINR}</td>
                    <td className="py-2.5 px-3">
                      {log.success ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-[10px]">
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-semibold text-[10px]">
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
