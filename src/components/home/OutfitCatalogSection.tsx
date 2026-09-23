import Link from "next/link";

const CATALOG_ITEMS = [
  {
    title: "The Royal Crimson Bridal Lehenga",
    category: "Bridal Couture",
    desc: "Heavily hand-embroidered zardozi and sequin work with ceremonial dupatta and antique gold borders.",
    image: "/images/editorial/media_1790118466820.png",
    aspect: "tall",
    badge: "Most Requested",
  },
  {
    title: "Peacock Blue Heritage Sherwani",
    category: "Groom Collection",
    desc: "Mandarin collar structured jacket with antique gold embroidery and pure banarasi silk stole.",
    image: "/images/editorial/media_1790118492242.png",
    aspect: "tall",
    badge: "Royal Edit",
  },
  {
    title: "Champagne Gold Matching Couple Set",
    category: "Coordinated Wardrobe",
    desc: "Ivory and gold silk sherwani paired with matching bridal lehenga for grand ceremony portraits.",
    image: "/images/editorial/media_1790118473567.jpg",
    aspect: "wide",
    badge: "Trending",
  },
  {
    title: "A Journey in Silk, Zari & Dreams",
    category: "Banarasi Heritage",
    desc: "Intricately woven pure silk sarees and heritage lehengas passed down through royal dynasties.",
    image: "/images/editorial/media_1790118452406.jpg",
    aspect: "wide",
    badge: "Masterpiece",
  },
];

export function OutfitCatalogSection() {
  return (
    <section id="outfits" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-2">
            Haute Couture Collection
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Bespoke Outfits <span className="font-editorial-italic font-normal text-primary">Ready to Try On</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Experience our curated wardrobe of designer bridal lehengas, royal sherwanis, and luxury silks crafted for Indian weddings.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CATALOG_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden bg-surface border border-border/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-background/90 backdrop-blur-md text-foreground text-[11px] font-semibold tracking-wider uppercase border border-border/70 shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Overlay Text */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-widest text-amber-200 font-medium mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Card Area */}
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
                  {item.desc}
                </p>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shrink-0"
                >
                  <span>Try Look</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
