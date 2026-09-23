import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Analytics — Admin",
  description: "VivahLook internal analytics dashboard.",
});

export default function WeddingAdminPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">
        VivahLook Analytics
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Internal dashboard — generation metrics and popular choices.
      </p>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Generations", value: "—", note: "Connect Supabase" },
          { label: "Successful", value: "—", note: "" },
          { label: "Failed", value: "—", note: "" },
          { label: "Total Users", value: "—", note: "" },
        ].map((metric, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-border bg-surface"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {metric.label}
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {metric.value}
            </p>
            {metric.note && (
              <p className="text-xs text-muted-foreground mt-1">{metric.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Popular choices */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-border bg-surface">
          <h3 className="font-display font-semibold text-foreground mb-3">
            Popular Occasions
          </h3>
          <p className="text-sm text-muted-foreground">
            Analytics will populate once generations are tracked in Supabase.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-border bg-surface">
          <h3 className="font-display font-semibold text-foreground mb-3">
            Popular Outfits
          </h3>
          <p className="text-sm text-muted-foreground">
            Connect the generations table to see outfit popularity.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-border bg-surface">
          <h3 className="font-display font-semibold text-foreground mb-3">
            Popular Styles
          </h3>
          <p className="text-sm text-muted-foreground">
            Style preference data will appear here after launch.
          </p>
        </div>
      </div>

      {/* Estimated costs */}
      <div className="mt-8 p-5 rounded-2xl border border-border bg-surface">
        <h3 className="font-display font-semibold text-foreground mb-3">
          Estimated AI Costs
        </h3>
        <p className="text-sm text-muted-foreground">
          Track API usage costs here. Each Gemini generation costs approximately ₹2–4 depending on image complexity.
          Daily/weekly cost tracking will be populated from the generations table.
        </p>
      </div>
    </div>
  );
}
