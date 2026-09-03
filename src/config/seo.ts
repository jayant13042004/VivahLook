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
    "website starter",
    "Next.js",
    "LaunchKit",
    "Personal Launch Engine",
  ],
} as const;
