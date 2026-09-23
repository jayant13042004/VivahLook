import Link from "next/link";

const OCCASIONS = [
  {
    id: "haldi",
    title: "Haldi",
    subtitle: "Bright & Joyful",
    image: "/images/editorial/occ_haldi.jpg",
  },
  {
    id: "mehendi",
    title: "Mehendi",
    subtitle: "Fresh & Playful",
    image: "/images/editorial/occ_mehendi.jpg",
  },
  {
    id: "sangeet",
    title: "Sangeet",
    subtitle: "Glam & Stylish",
    image: "/images/editorial/occ_sangeet.jpg",
  },
  {
    id: "wedding",
    title: "Wedding",
    subtitle: "Timeless & Royal",
    image: "/images/editorial/occ_wedding.jpg",
  },
  {
    id: "reception",
    title: "Reception",
    subtitle: "Elegant & Modern",
    image: "/images/editorial/occ_reception.jpg",
  },
  {
    id: "guest",
    title: "Guest Looks",
    subtitle: "Make an Impression",
    image: "/images/editorial/occ_guest.jpg",
  },
];

export function OccasionsGallery() {
  return (
    <section id="occasions" className="py-20 lg:py-28 bg-muted/40 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-2">
              Explore Styles
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Every Occasion. <span className="font-editorial-italic font-normal text-primary">Every You.</span>
            </h2>
          </div>

          <Link
            href="/studio"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>View All Outfits</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 6 Tall Portrait Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {OCCASIONS.map((occ) => (
            <Link
              key={occ.id}
              href="/studio"
              className="group flex flex-col rounded-3xl overflow-hidden bg-surface border border-border/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={occ.image}
                  alt={`${occ.title} Indian wedding outfit look`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Meta */}
              <div className="p-4 flex items-center justify-between gap-2">
                <div className="text-left">
                  <h3 className="font-display font-bold text-foreground text-base group-hover:text-primary transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {occ.subtitle}
                  </p>
                </div>
                <span className="w-7 h-7 rounded-full border border-border/80 bg-muted/50 text-foreground flex items-center justify-center text-xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
