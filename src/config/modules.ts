/**
 * Optional modules — VivahLook configuration.
 * Blog, tools, and topics are disabled; analytics and admin enabled.
 */

export const modulesConfig = {
  blog: false,
  analytics: true,
  email: true,
  admin: true,
  githubAuth: false,
  seoProfile: false,
  database: "supabase" as "supabase" | "mongodb",
};

export function isModuleEnabled(
  name: Exclude<keyof typeof modulesConfig, "database">,
) {
  return Boolean(modulesConfig[name]);
}
