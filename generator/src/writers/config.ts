import { writeFile } from "../fs.ts";
import { hasAuth, hasPayments, type ProjectConfig } from "../types.ts";

export function writeSiteConfig(outDir: string, config: ProjectConfig) {
  writeFile(
    outDir,
    "src/config/site.ts",
    `/**
 * Site configuration — branding, URLs, and shared copy.
 *
 * Edit this file first when starting a new project from this starter.
 */

export const siteConfig = {
  name: ${JSON.stringify(config.name)},
  shortName: ${JSON.stringify(shortName(config.name))},
  tagline: ${JSON.stringify(taglineFor(config))},
  description: ${JSON.stringify(descriptionFor(config))},
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
`,
  );
}

export function writeModulesConfig(outDir: string, config: ProjectConfig) {
  const database = config.mongodb ? "mongodb" : "supabase";
  writeFile(
    outDir,
    "src/config/modules.ts",
    `/**
 * Optional modules — turn features off to keep a project lean.
 * Env keys still required for analytics/email/Mongo; flags hide UI/routes.
 */

export const modulesConfig = {
  blog: ${config.blog},
  analytics: ${config.analytics},
  email: ${config.email},
  admin: ${config.admin},
  githubAuth: ${config.auth.github},
  seoProfile: ${config.seoProfile},
  database: ${JSON.stringify(database)} as "supabase" | "mongodb",
};

export function isModuleEnabled(
  name: Exclude<keyof typeof modulesConfig, "database">,
) {
  return Boolean(modulesConfig[name]);
}
`,
  );
}

export function writeNavigation(outDir: string, config: ProjectConfig) {
  const extra: string[] = [];
  if (config.blog) extra.push(`  items.splice(1, 0, { label: "Blog", href: "/blog" });`);
  if (config.seoProfile) {
    extra.push(`  items.push(
    { label: "Tools", href: "/tools" },
    { label: "Topics", href: "/topics" },
  );`);
  }

  writeFile(
    outDir,
    "src/config/navigation.ts",
    `/**
 * Navigation links — used by Navbar and Footer.
 * Keep labels short; add/remove routes here when adding pages.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Hide from primary navbar (still usable in footer / sitemap). */
  footerOnly?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy", footerOnly: true },
  { label: "Terms & Conditions", href: "/terms", footerOnly: true },
];

export function getMainNav(): NavItem[] {
  const items = [...mainNav];
${extra.join("\n")}
  return items;
}

export function getAllNavItems(): NavItem[] {
  return [...getMainNav(), ...legalNav];
}

export const allNavItems: NavItem[] = getAllNavItems();
`,
  );
}

export function writeSeoConfig(outDir: string, config: ProjectConfig) {
  const disallow = ["\"/api/\""];
  if (hasAuth(config)) {
    disallow.unshift(
      '"/dashboard"',
      '"/profile"',
      '"/login"',
      '"/signup"',
    );
  }
  if (hasPayments(config)) disallow.push('"/billing"');
  if (config.admin) disallow.push('"/admin"');

  writeFile(
    outDir,
    "src/config/seo.ts",
    `/**
 * SEO / robots settings.
 */

export const seoConfig = {
  disallow: [
    ${disallow.join(",\n    ")},
  ],
  defaultKeywords: [
    ${JSON.stringify(config.name)},
    "Next.js",
  ],
} as const;
`,
  );
}

export function writeAuthConfig(outDir: string, config: ProjectConfig) {
  if (!hasAuth(config)) return;
  const protectedRoutes = ['"/dashboard"', '"/profile"'];
  if (hasPayments(config)) protectedRoutes.push('"/billing"');
  if (config.admin) protectedRoutes.push('"/admin"');

  writeFile(
    outDir,
    "src/config/auth.ts",
    `/**
 * Auth configuration — redirects and route guards.
 * Provider setup is done in the Supabase dashboard.
 */

export const authConfig = {
  protectedRoutes: [${protectedRoutes.join(", ")}] as const,

  guestOnlyRoutes: ["/login", "/signup"] as const,

  redirects: {
    afterLogin: "/dashboard",
    afterLogout: "/",
    afterSignup: "/login?message=check-email",
  },
} as const;

export type ProtectedRoute = (typeof authConfig.protectedRoutes)[number];
`,
  );
}

function shortName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (name.length <= 18) return name;
  return parts[0] ?? name;
}

function taglineFor(config: ProjectConfig) {
  if (config.profile === "micro-niche") {
    return "Search-friendly pages, tools, and content — without rebuilding the foundation.";
  }
  if (config.profile === "ai-web-app") {
    return "A production-ready shell so you can focus on the AI feature.";
  }
  return "Ship the next idea without rebuilding the foundation.";
}

function descriptionFor(config: ProjectConfig) {
  return `${config.name} — a Next.js starter generated from LaunchKit with only the modules you selected.`;
}
