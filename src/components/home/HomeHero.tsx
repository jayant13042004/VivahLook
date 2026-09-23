import Link from "next/link";
import Image from "next/image";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-border/50">
      {/* Subtle warm atmospheric glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-[600px] h-[500px] bg-gradient-to-b from-primary/5 via-accent/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Editorial Storytelling (5 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Delicate Tracked Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Indian Weddings, Reimagined With AI
            </div>

            {/* High-Contrast Editorial Serif Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.12] tracking-tight">
              See Yourself in <br />
              <span className="font-serif italic font-normal text-primary">Your Perfect</span> <br />
              Wedding Look
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Upload your photo and try stunning Indian wedding outfits — from royal sherwanis to intricate bridal lehengas — before you buy.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/studio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:opacity-95 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Try Vaaraa Free</span>
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

            {/* Social Validation Badge */}
            <div className="mt-10 pt-6 border-t border-border/70 flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/editorial/occ_wedding.jpg"
                  alt="Bride"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/editorial/occ_guest.jpg"
                  alt="Groom"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/editorial/occ_mehendi.jpg"
                  alt="Bride"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/editorial/before_girl.jpg"
                  alt="Customer"
                />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Loved by <span className="text-foreground font-semibold">10,000+</span> soon-to-be newlyweds
              </p>
            </div>
          </div>

          {/* Right Column — Large Cinematic Wedding Visual (7 cols) */}
          <div className="lg:col-span-6 relative">
            {/* Main Editorial Image Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-border/80 bg-surface">
              <img
                src="/images/editorial/hero_couple.jpg"
                alt="Royal Indian wedding couple in embroidered crimson lehenga and golden sherwani"
                className="w-full h-auto object-cover max-h-[560px]"
              />

              {/* Subtle dark gradient scrim at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Calligraphic Script Overlay */}
              <div className="absolute top-6 right-6 text-right pointer-events-none select-none">
                <p className="font-editorial-italic text-3xl sm:text-4xl text-amber-100/90 drop-shadow-md">
                  Your story
                </p>
                <p className="font-editorial-italic text-2xl sm:text-3xl text-amber-200/90 drop-shadow-md -mt-1">
                  Your look
                </p>
                <div className="w-8 h-[1px] bg-accent/80 ml-auto mt-2" />
              </div>

              {/* Floating Product Demonstration Tag */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-background/95 backdrop-blur-md border border-border/80 rounded-2xl p-3.5 shadow-xl flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-border shrink-0">
                  <img
                    src="/images/editorial/before_girl.jpg"
                    alt="Upload photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    Instant AI Try-On
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    Your photo → Royal Bridal Couture
                  </p>
                </div>
                <div className="ml-auto pl-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">
                    ✨
                  </span>
                </div>
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
