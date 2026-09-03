import path from "node:path";
import { parseArgs } from "node:util";
import { profileDefaults } from "./defaults.ts";
import { applyConstraints } from "./constraints.ts";
import {
  profiles,
  slugify,
  type ProfileId,
  type ProjectConfig,
} from "./types.ts";

export type CliFlags = {
  name?: string;
  profile?: ProfileId;
  auth?: string;
  database?: string;
  payments?: string;
  flags?: string;
  out?: string;
  yes: boolean;
};

export function parseCli(argv: string[]): CliFlags {
  const { values } = parseArgs({
    args: argv,
    options: {
      name: { type: "string" },
      profile: { type: "string" },
      auth: { type: "string" },
      database: { type: "string" },
      payments: { type: "string" },
      flags: { type: "string" },
      out: { type: "string" },
      yes: { type: "boolean", short: "y", default: false },
    },
    allowPositionals: false,
  });

  const profile = values.profile as string | undefined;
  if (profile && !profiles.includes(profile as ProfileId)) {
    throw new Error(`Unknown profile: ${profile}. Use ${profiles.join(", ")}`);
  }

  return {
    name: values.name,
    profile: profile as ProfileId | undefined,
    auth: values.auth,
    database: values.database,
    payments: values.payments,
    flags: values.flags,
    out: values.out,
    yes: Boolean(values.yes),
  };
}

export function configFromFlags(flags: CliFlags, cwd: string): ProjectConfig {
  if (!flags.name || !flags.profile) {
    throw new Error("Non-interactive mode requires --name and --profile.");
  }

  const defaults = profileDefaults[flags.profile];
  const slug = slugify(flags.name);
  let config: ProjectConfig = {
    name: flags.name,
    slug,
    outDir: path.resolve(flags.out ?? path.join(cwd, slug)),
    profile: flags.profile,
    ...defaults,
    notes: [],
  };

  if (flags.auth !== undefined) {
    config.auth = parseAuth(flags.auth);
  }
  if (flags.database !== undefined) {
    const db = parseDatabase(flags.database);
    config.supabase = db.supabase;
    config.mongodb = db.mongodb;
  }
  if (flags.payments !== undefined) {
    config.payments = parsePayments(flags.payments);
  }
  if (flags.flags !== undefined) {
    const set = parseOptionalFlags(flags.flags);
    config.blog = set.blog;
    config.analytics = set.analytics;
    config.email = set.email;
    config.admin = set.admin;
    config.seoProfile = set.seoProfile;
  }

  return applyConstraints(config);
}

function parseAuth(value: string) {
  if (value === "none" || value === "") {
    return { email: false, google: false, github: false };
  }
  const parts = value.split(",").map((item) => item.trim().toLowerCase());
  return {
    email: parts.includes("email"),
    google: parts.includes("google"),
    github: parts.includes("github"),
  };
}

function parseDatabase(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "none") return { supabase: false, mongodb: false };
  if (normalized === "supabase") return { supabase: true, mongodb: false };
  if (normalized === "mongodb") return { supabase: false, mongodb: true };
  if (normalized === "both" || normalized === "supabase+mongodb") {
    return { supabase: true, mongodb: true };
  }
  throw new Error("Database must be none, supabase, mongodb, or both.");
}

function parsePayments(value: string) {
  if (value === "none" || value === "") {
    return { stripe: false, razorpay: false };
  }
  const parts = value.split(",").map((item) => item.trim().toLowerCase());
  return {
    stripe: parts.includes("stripe"),
    razorpay: parts.includes("razorpay"),
  };
}

function parseOptionalFlags(value: string) {
  const empty = {
    blog: false,
    analytics: false,
    email: false,
    admin: false,
    seoProfile: false,
  };
  if (value === "none" || value === "") return empty;
  const parts = value.split(",").map((item) => item.trim().toLowerCase());
  return {
    blog: parts.includes("blog"),
    analytics: parts.includes("analytics"),
    email: parts.includes("email"),
    admin: parts.includes("admin"),
    seoProfile: parts.includes("seo") || parts.includes("seo-profile"),
  };
}
