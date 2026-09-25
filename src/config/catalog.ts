/**
 * VivahLook — Curated Outfit & Template Catalog.
 *
 * Central data-driven catalog for all wedding outfit templates.
 * Designed so that new outfits, visual assets, affiliate links, and
 * product recommendations can be added/edited without modifying UI code.
 */

export type OutfitGender = "women" | "men" | "unisex";

export type OutfitStyle =
  | "royal"
  | "modern"
  | "traditional"
  | "minimal"
  | "luxury"
  | "pastel";

export type ShoppableProductRef = {
  id: string;
  name: string;
  category: "outfit" | "jewelry" | "footwear" | "headwear" | "accessories";
  retailer?: string;
  priceEstimateINR?: number;
  url?: string;
  affiliateUrl?: string;
  affiliateNetwork?: string;
  available: boolean;
};

export type OutfitTemplate = {
  id: string;
  name: string;
  occasionId: "haldi" | "mehendi" | "sangeet" | "wedding" | "reception" | "guest";
  gender: OutfitGender;
  category: string;
  description: string;
  style: OutfitStyle;
  colors: string[]; // Primary color swatches (Hex or CSS strings)
  image: string; // Placeholder or final curated visual asset path
  thumbnail?: string;
  tags: string[];
  productLinks?: ShoppableProductRef[];
  affiliateInfo?: {
    merchant?: string;
    network?: string;
    commissionRate?: string;
  };
  status: "available" | "coming_soon" | "archived";
};

export const outfitCatalog: OutfitTemplate[] = [
  // ==========================================
  // 1. HALDI CEREMONY
  // ==========================================
  {
    id: "haldi-sunshine-lehenga",
    name: "Sunshine Yellow Gotapatti Lehenga",
    occasionId: "haldi",
    gender: "women",
    category: "lehenga",
    description: "Vibrant yellow raw silk lehenga with delicate gotapatti borders, floral motifs, and a breezy organza dupatta.",
    style: "traditional",
    colors: ["#F4C430", "#FFD700", "#FFF8DC"],
    image: "/images/editorial/occ_haldi.jpg",
    tags: ["gotapatti", "raw silk", "bright yellow", "haldi", "traditional"],
    status: "available",
  },
  {
    id: "haldi-floral-anarkali",
    name: "Marigold Floral Printed Anarkali",
    occasionId: "haldi",
    gender: "women",
    category: "anarkali",
    description: "Flowing floor-length floral printed georgette Anarkali in soft mustard and marigold hues with mirrorwork neckline.",
    style: "pastel",
    colors: ["#FFA500", "#FFD700", "#FAF0E6"],
    image: "/images/editorial/occ_haldi.jpg",
    tags: ["floral", "georgette", "anarkali", "mirrorwork", "day ceremony"],
    status: "available",
  },
  {
    id: "haldi-mustard-chanderi-saree",
    name: "Mustard Chanderi Silk Saree",
    occasionId: "haldi",
    gender: "women",
    category: "saree",
    description: "Lightweight mustard Chanderi saree featuring golden zari bootis and an unlined contrasting blouse.",
    style: "minimal",
    colors: ["#E1AD01", "#DAA520", "#F5F5DC"],
    image: "/images/editorial/occ_haldi.jpg",
    tags: ["chanderi", "saree", "zari booti", "lightweight"],
    status: "available",
  },
  {
    id: "haldi-chanderi-kurta-men",
    name: "Marigold Silk Chanderi Kurta",
    occasionId: "haldi",
    gender: "men",
    category: "kurta-pajama",
    description: "Lustrous marigold yellow silk Chanderi kurta with subtle tonal embroidery on placket and collar, paired with ivory churidar.",
    style: "traditional",
    colors: ["#F4C430", "#FFFDD0"],
    image: "/images/editorial/occ_haldi.jpg",
    tags: ["kurta", "chanderi silk", "marigold", "haldi groom"],
    status: "available",
  },
  {
    id: "haldi-nehru-jacket-set",
    name: "Floral Embroidered Nehru Jacket Set",
    occasionId: "haldi",
    gender: "men",
    category: "kurta-pajama",
    description: "Raw silk Nehru waistcoat with delicate botanic threadwork over a soft pastel butter kurta pajama.",
    style: "modern",
    colors: ["#FFE4B5", "#F0E68C", "#FFF8DC"],
    image: "/images/editorial/occ_haldi.jpg",
    tags: ["nehru jacket", "waistcoat", "festive", "botanical"],
    status: "available",
  },
  {
    id: "haldi-dhoti-kurta-men",
    name: "Traditional Golden Border Dhoti Kurta",
    occasionId: "haldi",
    gender: "men",
    category: "dhoti-kurta",
    description: "Classic turmeric silk kurta paired with authentic pre-pleated gold-bordered dhoti for the auspicious Haldi ritual.",
    style: "traditional",
    colors: ["#FFD700", "#FAFAD2"],
    image: "/images/editorial/occ_haldi.jpg",
    tags: ["dhoti kurta", "auspicious", "heritage", "kandangi"],
    status: "available",
  },

  // ==========================================
  // 2. MEHENDI CELEBRATION
  // ==========================================
  {
    id: "mehendi-emerald-sharara",
    name: "Emerald Green Mirrorwork Sharara",
    occasionId: "mehendi",
    gender: "women",
    category: "sharara",
    description: "Rich bottle green flared sharara set with hand-placed abla mirrorwork and scallop border dupatta.",
    style: "luxury",
    colors: ["#2E8B57", "#006400", "#D4AF37"],
    image: "/images/editorial/occ_mehendi.jpg",
    tags: ["sharara", "mirrorwork", "emerald", "mehendi night"],
    status: "available",
  },
  {
    id: "mehendi-sage-lehenga",
    name: "Sage Green Botanical Georgette Lehenga",
    occasionId: "mehendi",
    gender: "women",
    category: "lehenga",
    description: "Ethereal sage green lehenga adorned with pastel thread embroidery, foil mirrors, and a lightweight breezy silhouette.",
    style: "pastel",
    colors: ["#9CAF88", "#78866B", "#F5FFFA"],
    image: "/images/editorial/occ_mehendi.jpg",
    tags: ["sage green", "pastel lehenga", "garden mehendi", "delicate"],
    status: "available",
  },
  {
    id: "mehendi-indo-western-drape",
    name: "Contemporary Olive Indo-Western Drape",
    occasionId: "mehendi",
    gender: "women",
    category: "indo-western-w",
    description: "Modern pre-draped concept saree with structured embroidered cape blouse for effortless movement.",
    style: "modern",
    colors: ["#556B2F", "#6B8E23", "#F0FFF0"],
    image: "/images/editorial/occ_mehendi.jpg",
    tags: ["pre-draped", "indo western", "cape blouse", "modern bride"],
    status: "available",
  },
  {
    id: "mehendi-asymmetrical-kurta-men",
    name: "Olive Asymmetrical Angrakha Kurta",
    occasionId: "mehendi",
    gender: "men",
    category: "kurta-pajama",
    description: "Contemporary cross-over Angrakha cut kurta in olive silk with antique brass button accents.",
    style: "modern",
    colors: ["#556B2F", "#8FBC8F"],
    image: "/images/editorial/occ_mehendi.jpg",
    tags: ["angrakha", "asymmetric", "olive", "contemporary"],
    status: "available",
  },
  {
    id: "mehendi-sage-bandhgala-men",
    name: "Sage Embroidered Silk Bandhgala",
    occasionId: "mehendi",
    gender: "men",
    category: "bandhgala",
    description: "Structured Nehru bandhgala in soft sage green with subtle leaf threadwork over tailored tapered trousers.",
    style: "luxury",
    colors: ["#8FBC8F", "#2F4F4F"],
    image: "/images/editorial/occ_mehendi.jpg",
    tags: ["bandhgala", "tailored", "sage green", "mehendi groom"],
    status: "available",
  },

  // ==========================================
  // 3. SANGEET & DANCE NIGHT
  // ==========================================
  {
    id: "sangeet-midnight-mirror-lehenga",
    name: "Midnight Blue Starlight Mirror Lehenga",
    occasionId: "sangeet",
    gender: "women",
    category: "lehenga",
    description: "Glamorous midnight blue raw silk lehenga laden with dense geometric mirrorwork that catches stage and dance lighting.",
    style: "luxury",
    colors: ["#191970", "#000080", "#C0C0C0"],
    image: "/images/editorial/occ_sangeet.jpg",
    tags: ["mirrorwork", "midnight blue", "glamorous", "sangeet dance"],
    status: "available",
  },
  {
    id: "sangeet-plum-shimmer-saree",
    name: "Plum Wine Metallic Shimmer Saree",
    occasionId: "sangeet",
    gender: "women",
    category: "saree",
    description: "Fluid metallic plum georgette saree with micro-sequin border, designed for high-glam evening celebrations.",
    style: "modern",
    colors: ["#4A0E4E", "#800080", "#E6E6FA"],
    image: "/images/editorial/occ_sangeet.jpg",
    tags: ["shimmer", "metallic", "sequin", "wine plum", "glam"],
    status: "available",
  },
  {
    id: "sangeet-black-velvet-bandhgala",
    name: "Jet Black Royal Velvet Bandhgala",
    occasionId: "sangeet",
    gender: "men",
    category: "bandhgala",
    description: "Crisply structured Jodhpuri bandhgala in plush black velvet with tonal embroidered monogram crest and silver buttons.",
    style: "royal",
    colors: ["#0B0B0B", "#1C1C1C", "#C0C0C0"],
    image: "/images/editorial/occ_sangeet.jpg",
    tags: ["velvet", "bandhgala", "jodhpuri", "royal black", "cocktail"],
    status: "available",
  },
  {
    id: "sangeet-navy-indowestern-men",
    name: "Navy Cutaway Indo-Western Jacket",
    occasionId: "sangeet",
    gender: "men",
    category: "indo-western-m",
    description: "Sculpted asymmetric overlapping jacket with tonal sequin embroidery over slim trousers, built for dancing.",
    style: "modern",
    colors: ["#000080", "#4169E1"],
    image: "/images/editorial/occ_sangeet.jpg",
    tags: ["indo-western", "cutaway", "navy", "cocktail sangeet"],
    status: "available",
  },

  // ==========================================
  // 4. THE WEDDING CEREMONY (PHERAS)
  // ==========================================
  {
    id: "wedding-crimson-zardozi-lehenga",
    name: "Crimson Red Heritage Zardozi Lehenga",
    occasionId: "wedding",
    gender: "women",
    category: "lehenga",
    description: "The timeless imperial crimson velvet lehenga with handcrafted antique gold zardozi, dabka, and pearl embroidery.",
    style: "royal",
    colors: ["#8B0000", "#DC143C", "#DAA520"],
    image: "/images/editorial/occ_wedding.jpg",
    tags: ["bridal", "crimson red", "zardozi", "royal heritage", "sabyasachi aesthetic"],
    status: "available",
  },
  {
    id: "wedding-vermilion-banarasi-saree",
    name: "Vermilion Pure Katan Banarasi Silk Saree",
    occasionId: "wedding",
    gender: "women",
    category: "saree",
    description: "Authentic handwoven red Banarasi silk saree with kadhwa jangla zari weave, rich pallu, and auspicious temple border.",
    style: "traditional",
    colors: ["#B22222", "#FFD700"],
    image: "/images/editorial/occ_wedding.jpg",
    tags: ["banarasi", "katan silk", "kadwa zari", "sacred bride"],
    status: "available",
  },
  {
    id: "wedding-rosegold-pastel-lehenga",
    name: "Dusty Rose Gold Organza Bridal Lehenga",
    occasionId: "wedding",
    gender: "women",
    category: "lehenga",
    description: "Contemporary pastel bridal lehenga with soft blush pink organza layers, champagne gold crystals, and pearl tassels.",
    style: "pastel",
    colors: ["#D8BFD8", "#F4C2C2", "#FDF5E6"],
    image: "/images/editorial/occ_wedding.jpg",
    tags: ["pastel bride", "rose gold", "organza", "crystal work"],
    status: "available",
  },
  {
    id: "wedding-ivory-royal-sherwani",
    name: "Ivory & Antique Gold Royal Sherwani",
    occasionId: "wedding",
    gender: "men",
    category: "sherwani",
    description: "Regal ivory raw silk sherwani featuring intricate all-over Kashmiri threadwork, paired with chanderi safa and churidar.",
    style: "royal",
    colors: ["#FFFFF0", "#DAA520", "#FFF8DC"],
    image: "/images/editorial/occ_wedding.jpg",
    tags: ["groom", "ivory sherwani", "raw silk", "kashmiri thread", "safa"],
    status: "available",
  },
  {
    id: "wedding-velvet-achkan-men",
    name: "Deep Crimson Heritage Velvet Achkan",
    occasionId: "wedding",
    gender: "men",
    category: "sherwani",
    description: "Opulent crimson velvet royal achkan with golden embroidered cuffs and collar, accessorized with polki pearl brooch.",
    style: "luxury",
    colors: ["#800000", "#DAA520"],
    image: "/images/editorial/occ_wedding.jpg",
    tags: ["achkan", "velvet", "crimson", "royal groom", "brooch"],
    status: "available",
  },
  {
    id: "wedding-jodhpur-silk-sherwani",
    name: "Antique Gold Silk Brocade Sherwani",
    occasionId: "wedding",
    gender: "men",
    category: "sherwani",
    description: "Woven Varanasi brocade sherwani with structured shoulders, jeweled buttons, and an antique gold doshala drape.",
    style: "traditional",
    colors: ["#CFB53B", "#FAF0E6"],
    image: "/images/editorial/occ_wedding.jpg",
    tags: ["brocade", "doshala", "antique gold", "regal"],
    status: "available",
  },

  // ==========================================
  // 5. GRAND RECEPTION
  // ==========================================
  {
    id: "reception-champagne-crystal-saree",
    name: "Champagne Gold Crystal Cocktail Saree",
    occasionId: "reception",
    gender: "women",
    category: "saree",
    description: "Floor-sweeping champagne gold tulle saree hand-embellished with Swarovski crystals, beads, and an unlined corset blouse.",
    style: "luxury",
    colors: ["#F7E7CE", "#F5DEB3", "#FFF8DC"],
    image: "/images/editorial/occ_reception.jpg",
    tags: ["champagne gold", "crystal", "cocktail saree", "reception glamour"],
    status: "available",
  },
  {
    id: "reception-emerald-trail-gown-lehenga",
    name: "Emerald Green Trail Gown-Lehenga",
    occasionId: "reception",
    gender: "women",
    category: "lehenga",
    description: "Couture fusion lehenga-gown in deep emerald velvet with sweeping royal train and architectural sweetheart bodice.",
    style: "modern",
    colors: ["#004D40", "#002B20"],
    image: "/images/editorial/occ_reception.jpg",
    tags: ["trail gown", "fusion lehenga", "emerald velvet", "black tie"],
    status: "available",
  },
  {
    id: "reception-black-tie-tuxedo",
    name: "Midnight Black Shawl Lapel Tuxedo",
    occasionId: "reception",
    gender: "men",
    category: "bandhgala",
    description: "Tailored Italian wool tuxedo with satin shawl lapel, silk bow tie, pleated tuxedo shirt, and patent leather dress shoes.",
    style: "modern",
    colors: ["#0A0A0A", "#FFFFFF"],
    image: "/images/editorial/occ_reception.jpg",
    tags: ["tuxedo", "black tie", "shawl lapel", "reception groom", "formal"],
    status: "available",
  },
  {
    id: "reception-charcoal-indowestern",
    name: "Charcoal Structured Indo-Western Suit",
    occasionId: "reception",
    gender: "men",
    category: "indo-western-m",
    description: "Sleek charcoal grey structured crossover suit with subtle tonal embroidery on shoulder and minimalist cuffs.",
    style: "minimal",
    colors: ["#36454F", "#708090"],
    image: "/images/editorial/occ_reception.jpg",
    tags: ["charcoal", "indo western", "crossover", "minimalist luxury"],
    status: "available",
  },

  // ==========================================
  // 6. WEDDING GUEST
  // ==========================================
  {
    id: "guest-pastel-printed-saree",
    name: "Dusty Peach Organza Saree",
    occasionId: "guest",
    gender: "women",
    category: "saree",
    description: "Light-as-air dusty peach organza saree with hand-painted botanicals, scalloped border, and raw silk blouse.",
    style: "pastel",
    colors: ["#FFDAB9", "#FFE4E1"],
    image: "/images/editorial/occ_guest.jpg",
    tags: ["guest", "organza", "hand painted", "peach", "day wedding"],
    status: "available",
  },
  {
    id: "guest-georgette-sharara",
    name: "Blush Pink Embroidered Sharara",
    occasionId: "guest",
    gender: "women",
    category: "sharara",
    description: "Effortless blush pink short kurti with flared tiered sharara and delicate sequin border dupatta.",
    style: "minimal",
    colors: ["#FFC0CB", "#FFF0F5"],
    image: "/images/editorial/occ_guest.jpg",
    tags: ["sharara", "blush pink", "wedding guest", "comfortable"],
    status: "available",
  },
  {
    id: "guest-tussar-kurta-men",
    name: "Cream Tussar Silk Kurta Pajama",
    occasionId: "guest",
    gender: "men",
    category: "kurta-pajama",
    description: "Natural textured cream Tussar silk kurta with subtle kantha stitch detail, paired with tailored cotton pajama.",
    style: "minimal",
    colors: ["#FFFDD0", "#FAF0E6"],
    image: "/images/editorial/occ_guest.jpg",
    tags: ["tussar silk", "kurta", "wedding guest", "refined minimal"],
    status: "available",
  },
  {
    id: "guest-powder-blue-nehru-jacket",
    name: "Powder Blue Silk Nehru Jacket Set",
    occasionId: "guest",
    gender: "men",
    category: "kurta-pajama",
    description: "Powder blue raw silk waistcoat worn over crisp white linen kurta and trousers for daytime and garden nuptials.",
    style: "pastel",
    colors: ["#B0E0E6", "#F0F8FF"],
    image: "/images/editorial/occ_guest.jpg",
    tags: ["powder blue", "nehru jacket", "guest men", "smart ethnic"],
    status: "available",
  },
];

// ==========================================
// Catalog Query & Filter Helpers
// ==========================================

export function getOutfitsByOccasion(
  occasionId: string,
  gender?: OutfitGender,
): OutfitTemplate[] {
  return outfitCatalog.filter(
    (item) =>
      item.occasionId === occasionId &&
      (gender ? item.gender === gender || item.gender === "unisex" : true) &&
      item.status !== "archived",
  );
}

export function getOutfitTemplateById(id: string): OutfitTemplate | undefined {
  return outfitCatalog.find((item) => item.id === id);
}

export function getAllOutfitTemplates(): OutfitTemplate[] {
  return outfitCatalog.filter((item) => item.status !== "archived");
}

export function getOutfitsByStyle(style: OutfitStyle): OutfitTemplate[] {
  return outfitCatalog.filter((item) => item.style === style);
}
