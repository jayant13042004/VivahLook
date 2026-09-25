import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-border/50">
      {/* Subtle warm atmospheric glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-b from-primary/5 via-accent/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Editorial Storytelling (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Delicate Tracked Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI Wedding Stylist & Virtual Try-On
            </div>

            {/* High-Contrast Editorial Serif Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.12] tracking-tight">
              See Yourself in <br />
              <span className="font-serif italic font-normal text-primary">Your Perfect</span> <br />
              Wedding Look
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Upload your natural photo, choose from curated bridal lehengas, royal sherwanis, and silk sarees, and preview your complete wedding wardrobe before you buy.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/studio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:opacity-95 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Try VivahLook Free</span>
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border bg-surface text-foreground font-medium rounded-full text-sm hover:bg-muted/60 transition-colors shadow-sm"
              >
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs pl-0.5">
                  ▶
                </span>
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust & Occasion Tagline */}
            <div className="mt-10 pt-6 border-t border-border/70 flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> 100% Private Photo Processing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> 6 Auspicious Ceremonies
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> Recreate & Shop The Look
              </span>
            </div>
          </div>

          {/* Right Column — Visual Transformation Try-On Composition (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl p-4 sm:p-6 bg-surface border-2 border-border/80 shadow-2xl overflow-hidden">
              {/* Top Workflow Stepper Pill */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Virtual Try-On Flow
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Natural Photo → Curated Outfit → Bespoke Look
                </span>
              </div>

              {/* 3-Stage Visual Pipeline Composition */}
              <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* Step 1: User Upload (3.5 cols) */}
                <div className="col-span-4 sm:col-span-3 flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-md bg-muted">
                    <img
                      src="/images/editorial/before_girl.jpg"
                      alt="Your natural photo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-bold uppercase tracking-wider text-white">
                      1. You
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground mt-2 text-center">
                    Clear Portrait
                  </span>
                </div>

                {/* Operator Symbol (+ / arrow) */}
                <div className="col-span-1 flex items-center justify-center text-muted-foreground font-bold text-sm sm:text-lg">
                  +
                </div>

                {/* Step 2: Selected Curated Outfit (3.5 cols) */}
                <div className="col-span-3 sm:col-span-3 flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-accent/40 shadow-md bg-muted">
                    <img
                      src="/images/editorial/occ_wedding.jpg"
                      alt="Selected wedding outfit"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-primary/90 text-[9px] font-bold uppercase tracking-wider text-primary-foreground shadow-2xs">
                      2. Outfit
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-foreground mt-2 text-center truncate w-full">
                    Royal Lehenga
                  </span>
                </div>

                {/* Operator Symbol (→ / AI magic) */}
                <div className="col-span-1 flex items-center justify-center text-primary font-bold text-sm sm:text-lg">
                  →
                </div>

                {/* Step 3: AI Generated Transformation (Primary Result, 5 cols) */}
                <div className="col-span-12 sm:col-span-4 flex flex-col items-center mt-3 sm:mt-0">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-primary shadow-xl bg-muted ring-2 ring-primary/20">
                    <img
                      src="/images/editorial/after_bride.jpg"
                      alt="Generated wedding look"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[9px] font-bold uppercase tracking-wider shadow-sm">
                      ✨ 3. Your Look
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-background/95 backdrop-blur-xs rounded-lg p-1.5 border border-border/70 text-center">
                      <p className="text-[10px] font-bold text-foreground">
                        Photorealistic Result
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Ready to download & shop
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="text-primary font-bold">●</span> Preserves Facial Structure
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-accent font-bold">●</span> Drapes Authentic Embroidery
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <span className="text-emerald-500 font-bold">●</span> High-Res 8K Details
                </span>
              </div>
            </div>

            {/* Decorative Gold Corner Accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-accent/40 rounded-br-3xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
