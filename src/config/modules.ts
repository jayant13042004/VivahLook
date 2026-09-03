/**
 * Optional modules — turn features off to keep a project lean.
 * Env keys still required for analytics/email/Mongo; flags hide UI/routes.
 */

export const modulesConfig = {
  /** File-based blog at /blog */
  blog: true,
  /** Plausible / GA snippet in the root layout */
  analytics: true,
  /** Resend for the contact form (falls back to local-only if no API key) */
  email: true,
  /** /admin user list (requires auth + admin role or ADMIN_EMAILS) */
  admin: true,
  /** Extra OAuth providers (Google stays in Phase 2) */
  githubAuth: true,
  /**
   * Micro-niche SEO: JSON-LD, tools, programmatic topic pages, richer sitemap.
   * Leave false on pure SaaS apps that only need Phase 1 metadata.
   */
  seoProfile: true,
  /**
   * App data store. Auth/payments stay on Supabase.
   * `mongodb` is an optional extra store — install `mongodb` and set MONGODB_URI.
   */
  database: "supabase" as "supabase" | "mongodb",
};

export function isModuleEnabled(
  name: Exclude<keyof typeof modulesConfig, "database">,
) {
  return Boolean(modulesConfig[name]);
}
