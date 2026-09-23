/**
 * SEO / micro-niche settings.
 * Used by sitemap, robots, and JSON-LD. Toggle the feature set via modulesConfig.seoProfile.
 */

export const seoConfig = {
  /** Paths search engines should not index (all project types). */
  disallow: [
    "/dashboard",
    "/profile",
    "/billing",
    "/admin",
    "/login",
    "/signup",
    "/api/",
  ],
  defaultKeywords: [
    "wedding look",
    "Indian wedding outfit",
    "sherwani",
    "lehenga",
    "saree",
    "wedding fashion",
    "AI wedding",
    "wedding visualization",
    "VivahLook",
    "Indian wedding",
    "bridal look",
    "groom look",
    "virtual wedding try on",
    "haldi outfit preview",
    "sangeet attire",
    "mehendi dress ideas",
    "reception bridal look",
    "AI ethnic wear",
    "Indian groom fashion",
  ],
  siteCategory: "Fashion & Lifestyle",
} as const;
