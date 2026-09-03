export const profiles = ["saas", "micro-niche", "ai-web-app"] as const;
export type ProfileId = (typeof profiles)[number];

export type AuthSelection = {
  email: boolean;
  google: boolean;
  github: boolean;
};

export type PaymentsSelection = {
  stripe: boolean;
  razorpay: boolean;
};

export type ProjectConfig = {
  name: string;
  slug: string;
  outDir: string;
  profile: ProfileId;
  auth: AuthSelection;
  supabase: boolean;
  mongodb: boolean;
  payments: PaymentsSelection;
  blog: boolean;
  analytics: boolean;
  email: boolean;
  admin: boolean;
  seoProfile: boolean;
  notes: string[];
};

export function hasAuth(config: ProjectConfig) {
  return config.auth.email || config.auth.google || config.auth.github;
}

export function hasOAuth(config: ProjectConfig) {
  return config.auth.google || config.auth.github;
}

export function hasPayments(config: ProjectConfig) {
  return config.payments.stripe || config.payments.razorpay;
}

export function slugify(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "new-project";
}
