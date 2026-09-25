import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brand Identity & Logo Variations — VivahLook",
  description: "Explore the 4 luxury brand logo concepts for VivahLook.",
};

const LOGO_VARIATIONS = [
  {
    id: 1,
    name: "Variation 1: The Royal Heritage Jharokha",
    theme: "Regal Heritage & Palace Architecture",
    description:
      "A sculpted monogram where the imperial letter 'V' integrates with a traditional Rajasthani palace archway (Jharokha) with delicate gold filigree, embossed in metallic antique gold over deep ceremonial burgundy.",
    image: "/images/brand/logo_variation_1_heritage_arch.jpg",
    palette: ["#8B1A2B", "#D4AF37", "#FAF7F2"],
    bestFor: "Luxury brand mark, mobile app icon, premium watermark",
  },
  {
    id: 2,
    name: "Variation 2: The Sacred Ribbon Knot (Gathbandhan)",
    theme: "Modern Sculptural Couture",
    description:
      "Two flowing, intertwining royal silk ribbons — one crimson bridal silk and one champagne gold groom brocade — weaving together to form a sculptural letter 'V' on warm royal ivory.",
    image: "/images/brand/logo_variation_2_sacred_ribbon.jpg",
    palette: ["#FAF7F2", "#9E1B32", "#D4AF37"],
    bestFor: "Clean modern website header, favicon, high-fashion boutique feel",
  },
  {
    id: 3,
    name: "Variation 3: The High-Couture Editorial Jewel Wordmark",
    theme: "Vogue / Sabyasachi Editorial Prestige",
    description:
      "High-fashion serif typography with an heirloom Polki diamond & Kundan teardrop jewel drop suspended inside the initial 'V', rendered in champagne gold foil on matte obsidian velvet.",
    image: "/images/brand/logo_variation_3_editorial_jewel.jpg",
    palette: ["#0C090A", "#D4AF37", "#FAF7F2"],
    bestFor: "Primary website navbar, luxury lookbook covers, watermarks",
  },
  {
    id: 4,
    name: "Variation 4: The Royal Peafowl & Lotus Imperial Crest",
    theme: "Imperial Heritage Seal & Royal Warrant",
    description:
      "A circular royal coat of arms featuring twin peacocks (Mayura) with ornate plumage flanking a blooming golden lotus and the central 'V' monogram, stamped in 24K gold on deep wine leather.",
    image: "/images/brand/logo_variation_4_lotus_crest.jpg",
    palette: ["#4A0E17", "#D4AF37", "#FAF7F2"],
    bestFor: "Brand seal, certificate of styling, social display picture",
  },
];

export default function LogoShowcasePage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-4 transition-colors font-semibold"
          >
            ← Back to VivahLook
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Brand Identity Suite
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            VivahLook Logo <span className="font-editorial-italic font-normal text-primary">Concepts</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Review the 4 custom-crafted visual directions for the brand. Choose your preferred identity to finalize for the website and app.
          </p>
        </div>

        {/* 4 Grid Variations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {LOGO_VARIATIONS.map((logo) => (
            <div
              key={logo.id}
              className="flex flex-col rounded-3xl bg-surface border-2 border-border/80 overflow-hidden shadow-xl hover:border-primary/60 transition-all group"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full bg-black/5 overflow-hidden">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/70 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm">
                  Option #{logo.id}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    {logo.theme}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-foreground mt-1 mb-3">
                    {logo.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {logo.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Palette</span>
                    <div className="flex gap-1.5">
                      {logo.palette.map((color, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground">
                    <strong className="text-foreground">Best Application:</strong> {logo.bestFor}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Selection Instruction */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-surface border border-border/80 max-w-2xl mx-auto shadow-sm">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Ready to Choose?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tell me which option you prefer (Option 1, 2, 3, or 4), or if you’d like to blend elements (e.g., Option 3’s typography with Option 1’s arch). I will implement the scalable vector SVG into the header and favicon!
          </p>
        </div>
      </div>
    </div>
  );
}
