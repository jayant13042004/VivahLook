/**
 * Site configuration — VivahLook Indian wedding fashion & virtual styling.
 */

export const siteConfig = {
  name: "VivahLook",
  shortName: "VivahLook",
  tagline: "See Yourself in Your Perfect Wedding Look",
  description:
    "AI-powered Indian wedding fashion and virtual styling. Upload your photo and preview royal sherwanis, bridal lehengas, silk sarees, and reception couture before you buy.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  creator: "VivahLook",
  contactEmail: "hello@vivahlook.com",
  copyrightYear: new Date().getFullYear(),

  social: [
    { label: "Instagram", href: "https://instagram.com/vivahlook" },
    { label: "Pinterest", href: "https://pinterest.com/vivahlook" },
  ] as const,

  ogImage: "/images/editorial/media_1790118434652.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
