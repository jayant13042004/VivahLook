/**
 * VivahLook — Wedding configuration.
 * Central source of truth for occasions, outfits, styles, and usage limits.
 * Architecture designed for easy additions without touching components.
 */

export type Gender = "women" | "men";

export type Occasion = {
  id: string;
  label: string;
  subtitle: string;
  emoji: string;
  colors: string[];
};

export type Outfit = {
  id: string;
  label: string;
  gender: Gender;
  description: string;
};

export type Style = {
  id: string;
  label: string;
  description: string;
};

export const occasions: Occasion[] = [
  {
    id: "haldi",
    label: "Haldi",
    subtitle: "Turmeric ceremony",
    emoji: "🌼",
    colors: ["#F4C430", "#FFD700", "#FFA500"],
  },
  {
    id: "mehendi",
    label: "Mehendi",
    subtitle: "Henna celebration",
    emoji: "🌿",
    colors: ["#2E8B57", "#228B22", "#6B8E23"],
  },
  {
    id: "sangeet",
    label: "Sangeet",
    subtitle: "Dance & music night",
    emoji: "🎶",
    colors: ["#4A1A6B", "#8B008B", "#C71585"],
  },
  {
    id: "wedding",
    label: "Wedding",
    subtitle: "The main ceremony",
    emoji: "💍",
    colors: ["#8B1A2B", "#B22222", "#DC143C"],
  },
  {
    id: "reception",
    label: "Reception",
    subtitle: "Grand celebration",
    emoji: "✨",
    colors: ["#1B365D", "#2F4F4F", "#4682B4"],
  },
  {
    id: "guest",
    label: "Wedding Guest",
    subtitle: "Attending as guest",
    emoji: "🎉",
    colors: ["#B8860B", "#DAA520", "#CD853F"],
  },
];

export const outfits: Outfit[] = [
  // Women
  {
    id: "lehenga",
    label: "Lehenga",
    gender: "women",
    description: "Embroidered bridal lehenga with dupatta",
  },
  {
    id: "saree",
    label: "Saree",
    gender: "women",
    description: "Elegant silk or georgette saree",
  },
  {
    id: "anarkali",
    label: "Anarkali",
    gender: "women",
    description: "Floor-length Anarkali suit",
  },
  {
    id: "sharara",
    label: "Sharara",
    gender: "women",
    description: "Flared sharara set with embroidery",
  },
  {
    id: "indo-western-w",
    label: "Indo-Western",
    gender: "women",
    description: "Contemporary fusion outfit",
  },
  // Men
  {
    id: "sherwani",
    label: "Sherwani",
    gender: "men",
    description: "Royal embroidered sherwani",
  },
  {
    id: "kurta-pajama",
    label: "Kurta Pajama",
    gender: "men",
    description: "Classic kurta with churidar or pajama",
  },
  {
    id: "bandhgala",
    label: "Bandhgala",
    gender: "men",
    description: "Structured Jodhpuri bandhgala suit",
  },
  {
    id: "indo-western-m",
    label: "Indo-Western",
    gender: "men",
    description: "Modern fusion jacket and trousers",
  },
  {
    id: "dhoti-kurta",
    label: "Dhoti Kurta",
    gender: "men",
    description: "Traditional dhoti with silk kurta",
  },
];

export const styles: Style[] = [
  { id: "royal", label: "Royal", description: "Regal heritage aesthetic" },
  { id: "modern", label: "Modern", description: "Contemporary and sleek" },
  {
    id: "traditional",
    label: "Traditional",
    description: "Timeless classic elegance",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Clean and understated beauty",
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Opulent and richly detailed",
  },
  {
    id: "pastel",
    label: "Pastel",
    description: "Soft and ethereal tones",
  },
];

export function getOutfitsByGender(gender: Gender): Outfit[] {
  return outfits.filter((o) => o.gender === gender);
}

export function getOccasionById(id: string): Occasion | undefined {
  return occasions.find((o) => o.id === id);
}

export function getOutfitById(id: string): Outfit | undefined {
  return outfits.find((o) => o.id === id);
}

export function getStyleById(id: string): Style | undefined {
  return styles.find((s) => s.id === id);
}

// Re-export full outfit catalog
export { outfitCatalog, getOutfitsByOccasion, getOutfitTemplateById } from "@/config/catalog";
export type { OutfitTemplate } from "@/config/catalog";

/** Centralized Usage & Tier Limits */
export const usageConfig = {
  /** Free generations per visitor (Initial experiment: 1 free look to showcase magic while preventing API abuse) */
  freeGenerationLimit: 1,
  /** Max file upload size in bytes (10MB) */
  maxUploadSizeBytes: 10 * 1024 * 1024,
  /** Supported image MIME types */
  supportedMimeTypes: ["image/jpeg", "image/png", "image/webp"] as string[],
  /** Watermark text on free generations */
  watermarkText: "Created with VivahLook",
  /** Whether to show watermark on free images */
  watermarkEnabled: true,
} as const;
