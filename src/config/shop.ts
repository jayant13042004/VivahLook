/**
 * VivahLook — Shop The Look & Affiliate Commerce Architecture.
 *
 * Provides a scalable data model for matching generated wedding looks with
 * shoppable attire, accessories, footwear, and jewelry across Indian marketplaces
 * (Amazon, Myntra, Ajio, Nykaa Fashion, and designer brand stores).
 */

export type RetailerId =
  | "amazon_in"
  | "myntra"
  | "ajio"
  | "nykaa_fashion"
  | "tata_cliq_luxury"
  | "brand_direct";

export type ProductCategory =
  | "outfit"
  | "sherwani"
  | "lehenga"
  | "saree"
  | "kurta"
  | "jewelry"
  | "necklace"
  | "earrings"
  | "maang_tikka"
  | "footwear"
  | "mojari"
  | "jutti"
  | "heels"
  | "headwear"
  | "safa"
  | "turban"
  | "accessories"
  | "brooch"
  | "dupatta"
  | "doshala"
  | "pocket_square";

export type ShoppableProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  priceINR: number;
  originalPriceINR?: number;
  retailer: {
    id: RetailerId;
    name: string;
    logo?: string;
  };
  image: string;
  url: string; // Destination URL (or placeholder when pending merchant link)
  affiliateUrl?: string; // Appended with affiliate associate tag when active
  affiliateNetwork?: "amazon_associates" | "cuelinks" | "admitad" | "direct";
  trackingMetadata?: {
    campaign?: string;
    sku?: string;
    subId?: string;
  };
  availability: "in_stock" | "low_stock" | "out_of_stock" | "pre_order";
  lastUpdated: string; // ISO 8601
};

export type OutfitLookbookBundle = {
  outfitId: string;
  title: string;
  occasionId: string;
  gender: "women" | "men";
  products: ShoppableProduct[];
};

/**
 * Curated product registry mapping outfit styles to complementary wardrobe items.
 * Clean architectural placeholders ready for live affiliate links.
 */
export const curatedShoppingRegistry: Record<string, ShoppableProduct[]> = {
  // Wedding Groom — Royal Sherwani Look
  sherwani: [
    {
      id: "prod-sherwani-raw-silk",
      name: "Handcrafted Ivory Raw Silk Sherwani Set",
      category: "sherwani",
      priceINR: 14999,
      originalPriceINR: 18999,
      retailer: { id: "brand_direct", name: "Heritage Bridal Atelier" },
      image: "/images/editorial/occ_wedding.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-safa-chanderi",
      name: "Varanasi Chanderi Silk Safa with Zari Palla",
      category: "safa",
      priceINR: 1899,
      retailer: { id: "myntra", name: "Myntra Wedding Store" },
      image: "/images/editorial/hero_couple.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-brooch-kundan",
      name: "Kundan & Emerald Royal Kalgi Brooch",
      category: "brooch",
      priceINR: 1299,
      retailer: { id: "amazon_in", name: "Amazon Fashion" },
      image: "/images/editorial/occ_reception.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-mojari-velvet",
      name: "Gold Embroidered Velvet Groom Mojaris",
      category: "mojari",
      priceINR: 2499,
      retailer: { id: "ajio", name: "AJIO Luxe" },
      image: "/images/editorial/occ_wedding.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
  ],

  // Wedding Bride — Royal Lehenga Look
  lehenga: [
    {
      id: "prod-lehenga-crimson-zardozi",
      name: "Crimson Velvet Zardozi Bridal Lehenga",
      category: "lehenga",
      priceINR: 42999,
      originalPriceINR: 54999,
      retailer: { id: "brand_direct", name: "Varanasi Couture House" },
      image: "/images/editorial/after_bride.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-jewelry-polki-set",
      name: "22K Gold Plated Heirloom Polki Choker & Jhumkas",
      category: "jewelry",
      priceINR: 6499,
      retailer: { id: "nykaa_fashion", name: "Nykaa Fashion Luxe" },
      image: "/images/editorial/before_girl.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-matha-patti-pearl",
      name: "Antique Gold Temple Kundan Matha Patti",
      category: "maang_tikka",
      priceINR: 1899,
      retailer: { id: "amazon_in", name: "Amazon Fashion" },
      image: "/images/editorial/after_bride.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-bridal-jutti-zari",
      name: "Hand-Embroidered Zari Bridal Juttis",
      category: "jutti",
      priceINR: 2199,
      retailer: { id: "myntra", name: "Myntra" },
      image: "/images/editorial/occ_wedding.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
  ],

  // Classic Saree Look
  saree: [
    {
      id: "prod-saree-banarasi-katan",
      name: "Pure Katan Silk Kadhwa Banarasi Saree",
      category: "saree",
      priceINR: 18999,
      retailer: { id: "tata_cliq_luxury", name: "Tata CLiQ Luxury" },
      image: "/images/editorial/occ_wedding.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-temple-necklace-gold",
      name: "South Temple Nakshi Coin Choker Set",
      category: "jewelry",
      priceINR: 4499,
      retailer: { id: "amazon_in", name: "Amazon Fashion" },
      image: "/images/editorial/occ_guest.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
  ],

  // Bandhgala & Tuxedo
  bandhgala: [
    {
      id: "prod-bandhgala-jodhpuri",
      name: "Italian Wool Structured Jodhpuri Bandhgala",
      category: "outfit",
      priceINR: 11999,
      retailer: { id: "ajio", name: "AJIO Luxe" },
      image: "/images/editorial/occ_sangeet.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
    {
      id: "prod-pocket-square-silk",
      name: "Varanasi Mulberry Silk Printed Pocket Square",
      category: "pocket_square",
      priceINR: 699,
      retailer: { id: "amazon_in", name: "Amazon Fashion" },
      image: "/images/editorial/occ_reception.jpg",
      url: "#",
      availability: "in_stock",
      lastUpdated: "2026-09-24T00:00:00Z",
    },
  ],
};

/**
 * Helper to fetch products for an outfit ID or fallback category.
 */
export function getProductsForOutfit(outfitId: string): ShoppableProduct[] {
  // 1. Direct match on outfitId
  if (curatedShoppingRegistry[outfitId]) {
    return curatedShoppingRegistry[outfitId];
  }

  // 2. Substring category fallback (e.g. "wedding-crimson-zardozi-lehenga" -> "lehenga")
  for (const [key, products] of Object.entries(curatedShoppingRegistry)) {
    if (outfitId.toLowerCase().includes(key)) {
      return products;
    }
  }

  // 3. General wedding fallback
  return curatedShoppingRegistry["sherwani"] || [];
}
