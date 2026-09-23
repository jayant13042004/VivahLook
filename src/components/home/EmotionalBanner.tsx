export function EmotionalBanner() {
  const stats = [
    { value: "6+", label: "Wedding Occasions" },
    { value: "50+", label: "Designer Styles" },
    { value: "2", label: "Free Looks to Try" },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 bg-[#120B0D] text-white">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0 opacity-45 mix-blend-luminosity">
        <img
          src="/images/editorial/banner_couple.jpg"
          alt="Emotional Indian wedding portrait"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Wine Scrim Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#14080B] via-[#1A0A0E]/90 to-[#120709]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Emotional Headline & Narrative (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-3">
              The Vaaraa Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-amber-50">
              More Than Outfits <br />
              <span className="font-editorial-italic font-normal text-amber-200">It's a Feeling</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-amber-100/70 max-w-xl leading-relaxed">
              From the first vibrant yellow Haldi to the solemn bridal vows and the midnight reception dance, Vaaraa helps you visualize the moments that stay with you forever.
            </p>
          </div>

          {/* Stats Bar (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="font-display text-4xl sm:text-5xl font-bold text-amber-200">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs sm:text-sm text-amber-100/60 font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
