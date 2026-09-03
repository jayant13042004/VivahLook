/**
 * Site configuration — branding, URLs, and shared copy.
 *
 * Edit this file first when starting a new project from this starter.
 */

export const siteConfig = {
  name: "Personal Launch Engine",
  shortName: "LaunchKit",
  tagline: "Ship the next idea without rebuilding the foundation.",
  description:
    "A reusable AI-first website starter with a clean design system, theming, SEO basics, and production-ready pages.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  creator: "Isagi",
  contactEmail: "hello@example.com",
  copyrightYear: new Date().getFullYear(),

  /** Social / external links shown in the footer. Leave empty arrays if unused. */
  social: [
    { label: "GitHub", href: "https://github.com" },
    { label: "X", href: "https://x.com" },
  ] as const,

  /** Default Open Graph image path under /public (optional). */
  ogImage: "/og.svg",
} as const;

export type SiteConfig = typeof siteConfig;
