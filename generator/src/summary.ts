import { profileLabels } from "./defaults.ts";
import { hasAuth, hasPayments, type ProjectConfig } from "./types.ts";

export function formatSummary(config: ProjectConfig) {
  const auth = hasAuth(config)
    ? [
        config.auth.email && "email",
        config.auth.google && "Google",
        config.auth.github && "GitHub",
      ]
        .filter(Boolean)
        .join(", ")
    : "none";
  const db =
    config.supabase && config.mongodb
      ? "Supabase + MongoDB"
      : config.mongodb
        ? "MongoDB"
        : config.supabase
          ? "Supabase"
          : "none";
  const payments = hasPayments(config)
    ? [
        config.payments.stripe && "Stripe",
        config.payments.razorpay && "Razorpay",
      ]
        .filter(Boolean)
        .join(", ")
    : "none";

  const lines = [
    `Name:        ${config.name}`,
    `Folder:      ${config.outDir}`,
    `Profile:     ${profileLabels[config.profile]}`,
    `Auth:        ${auth}`,
    `Database:    ${db}`,
    `Payments:    ${payments}`,
    `Blog:        ${yn(config.blog)}`,
    `Analytics:   ${yn(config.analytics)}`,
    `Email:       ${yn(config.email)}`,
    `Admin:       ${yn(config.admin)}`,
    `SEO profile: ${yn(config.seoProfile)}`,
  ];
  if (config.notes.length) {
    lines.push("", "Notes:");
    for (const note of config.notes) lines.push(`- ${note}`);
  }
  return lines.join("\n");
}

function yn(value: boolean) {
  return value ? "yes" : "no";
}
