import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-primary text-primary-foreground border-t border-border">
      {/* Decorative Gold Radial Scrim */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-accent-foreground uppercase mb-4 opacity-90">
          Begin Your Wedding Journey
        </p>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Your Wedding. Your Style. <br />
          <span className="font-editorial-italic font-normal text-amber-200">See It Before You Wear It.</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
          Upload a clear photo and preview bridal lehengas, sherwanis, and luxury wedding attire in minutes.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/studio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-surface text-foreground font-bold rounded-full text-sm hover:opacity-95 transition-all shadow-xl hover:-translate-y-0.5"
          >
            <span>Try Vaaraa Free</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium rounded-full text-sm hover:bg-white/10 transition-colors"
          >
            Explore How It Works
          </Link>
        </div>

        <p className="mt-8 text-xs text-primary-foreground/60">
          No credit card required · 2 free looks · Instant results
        </p>
      </div>
    </section>
  );
}
