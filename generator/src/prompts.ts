import readline from "node:readline/promises";
import path from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { profileDefaults, profileLabels } from "./defaults.ts";
import { applyConstraints } from "./constraints.ts";
import { formatSummary } from "./summary.ts";
import {
  profiles,
  slugify,
  type ProfileId,
  type ProjectConfig,
} from "./types.ts";
import type { CliFlags } from "./args.ts";

export async function promptConfig(flags: CliFlags, cwd: string): Promise<ProjectConfig> {
  const rl = readline.createInterface({ input, output });
  try {
    const name =
      flags.name?.trim() ||
      (await ask(rl, "Project name", "My New Project"));
    const profile =
      flags.profile ??
      (await choose(rl, "Project profile", profiles, (id) => profileLabels[id]));

    const defaults = profileDefaults[profile];

    const authChoice =
      flags.auth ??
      (await ask(
        rl,
        "Auth providers (none | email,google,github)",
        authDefaultString(defaults.auth),
      ));
    const databaseChoice =
      flags.database ??
      (await ask(
        rl,
        "Database (none | supabase | mongodb | both)",
        defaults.supabase && defaults.mongodb
          ? "both"
          : defaults.mongodb
            ? "mongodb"
            : defaults.supabase
              ? "supabase"
              : "none",
      ));
    const paymentsChoice =
      flags.payments ??
      (await ask(rl, "Payments (none | stripe,razorpay)", paymentsDefaultString(defaults.payments)));

    const flagsChoice =
      flags.flags ??
      (await ask(
        rl,
        "Optional modules (none | blog,analytics,email,admin,seo)",
        optionalDefaultString(defaults),
      ));

    const slug = slugify(name);
    const outDir = path.resolve(
      flags.out ??
        (await ask(rl, "Output directory", path.join(cwd, slug))),
    );

    let config: ProjectConfig = applyConstraints({
      name,
      slug,
      outDir,
      profile,
      auth: parseListAuth(authChoice),
      ...parseListDatabase(databaseChoice),
      payments: parseListPayments(paymentsChoice),
      ...parseListOptional(flagsChoice, defaults),
      notes: [],
    });

    console.log(`\n${formatSummary(config)}\n`);
    const ok = await ask(rl, "Generate this project? (y/n)", "y");
    if (!["y", "yes"].includes(ok.toLowerCase())) {
      throw new Error("Cancelled.");
    }
    return config;
  } finally {
    rl.close();
  }
}

async function ask(rl: readline.Interface, label: string, fallback: string) {
  const answer = (await rl.question(`${label} [${fallback}]: `)).trim();
  return answer || fallback;
}

async function choose<T extends string>(
  rl: readline.Interface,
  label: string,
  options: readonly T[],
  render: (id: T) => string,
): Promise<T> {
  console.log(`\n${label}:`);
  options.forEach((id, index) => {
    console.log(`  ${index + 1}. ${render(id)}`);
  });
  const answer = (await rl.question("Choose number [1]: ")).trim();
  const index = answer ? Number(answer) - 1 : 0;
  const selected = options[index];
  if (!selected) throw new Error("Invalid choice.");
  return selected;
}

function authDefaultString(auth: ProjectConfig["auth"]) {
  const parts = [
    auth.email ? "email" : null,
    auth.google ? "google" : null,
    auth.github ? "github" : null,
  ].filter(Boolean);
  return parts.length ? parts.join(",") : "none";
}

function paymentsDefaultString(payments: ProjectConfig["payments"]) {
  const parts = [
    payments.stripe ? "stripe" : null,
    payments.razorpay ? "razorpay" : null,
  ].filter(Boolean);
  return parts.length ? parts.join(",") : "none";
}

function optionalDefaultString(defaults: (typeof profileDefaults)[ProfileId]) {
  const parts = [
    defaults.blog ? "blog" : null,
    defaults.analytics ? "analytics" : null,
    defaults.email ? "email" : null,
    defaults.admin ? "admin" : null,
    defaults.seoProfile ? "seo" : null,
  ].filter(Boolean);
  return parts.length ? parts.join(",") : "none";
}

function parseListAuth(value: string) {
  if (value === "none") return { email: false, google: false, github: false };
  const parts = value.split(",").map((item) => item.trim().toLowerCase());
  return {
    email: parts.includes("email"),
    google: parts.includes("google"),
    github: parts.includes("github"),
  };
}

function parseListDatabase(value: string) {
  if (value === "none") return { supabase: false, mongodb: false };
  if (value === "supabase") return { supabase: true, mongodb: false };
  if (value === "mongodb") return { supabase: false, mongodb: true };
  return { supabase: true, mongodb: true };
}

function parseListPayments(value: string) {
  if (value === "none") return { stripe: false, razorpay: false };
  const parts = value.split(",").map((item) => item.trim().toLowerCase());
  return {
    stripe: parts.includes("stripe"),
    razorpay: parts.includes("razorpay"),
  };
}

function parseListOptional(value: string, defaults: (typeof profileDefaults)[ProfileId]) {
  if (value === "default") {
    return {
      blog: defaults.blog,
      analytics: defaults.analytics,
      email: defaults.email,
      admin: defaults.admin,
      seoProfile: defaults.seoProfile,
    };
  }
  if (value === "none") {
    return {
      blog: false,
      analytics: false,
      email: false,
      admin: false,
      seoProfile: false,
    };
  }
  const parts = value.split(",").map((item) => item.trim().toLowerCase());
  return {
    blog: parts.includes("blog"),
    analytics: parts.includes("analytics"),
    email: parts.includes("email"),
    admin: parts.includes("admin"),
    seoProfile: parts.includes("seo") || parts.includes("seo-profile"),
  };
}
