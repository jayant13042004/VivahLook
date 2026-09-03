import type { ProfileId, ProjectConfig } from "./types.ts";

export type ProfileDefaults = Pick<
  ProjectConfig,
  | "auth"
  | "supabase"
  | "mongodb"
  | "payments"
  | "blog"
  | "analytics"
  | "email"
  | "admin"
  | "seoProfile"
>;

export const profileDefaults: Record<ProfileId, ProfileDefaults> = {
  saas: {
    auth: { email: true, google: true, github: false },
    supabase: true,
    mongodb: false,
    payments: { stripe: false, razorpay: false },
    blog: false,
    analytics: true,
    email: true,
    admin: true,
    seoProfile: false,
  },
  "micro-niche": {
    auth: { email: false, google: false, github: false },
    supabase: false,
    mongodb: false,
    payments: { stripe: false, razorpay: false },
    blog: true,
    analytics: true,
    email: false,
    admin: false,
    seoProfile: true,
  },
  "ai-web-app": {
    auth: { email: true, google: true, github: false },
    supabase: true,
    mongodb: false,
    payments: { stripe: false, razorpay: false },
    blog: false,
    analytics: true,
    email: true,
    admin: false,
    seoProfile: false,
  },
};

export const profileLabels: Record<ProfileId, string> = {
  saas: "SaaS",
  "micro-niche": "Micro-niche / SEO website",
  "ai-web-app": "AI Web App",
};
