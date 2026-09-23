/**
 * Site configuration — Vaaraa luxury Indian wedding fashion visualization.
 */

export const siteConfig = {
  name: "Vaaraa",
  shortName: "Vaaraa",
  tagline: "See Your Wedding Look",
  description:
    "Upload your photo and preview stunning Indian wedding outfits before you buy. Experience royal sherwanis, bridal lehengas, silk sarees, and couture with AI-powered visualization.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  creator: "Vaaraa",
  contactEmail: "concierge@vaaraa.com",
  copyrightYear: new Date().getFullYear(),

  social: [
    { label: "Instagram", href: "https://instagram.com/vaaraaofficial" },
    { label: "Pinterest", href: "https://pinterest.com/vaaraaofficial" },
  ] as const,

  ogImage: "/images/editorial/media_1790118434652.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
