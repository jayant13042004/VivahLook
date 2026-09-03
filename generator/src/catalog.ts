import type { ProjectConfig } from "./types.ts";
import { hasAuth, hasPayments } from "./types.ts";

/** Always copied from LaunchKit. Coupling files (layout, nav, package.json) are written, not copied. */
export const coreFiles = [
  "tsconfig.json",
  "eslint.config.mjs",
  "postcss.config.mjs",
  ".gitignore",
  "public/og.svg",
  "AGENTS.md",
  "src/app/globals.css",
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/error.tsx",
  "src/app/loading.tsx",
  "src/app/not-found.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/config/theme.ts",
  "src/lib/seo.ts",
  "src/lib/seo/schema.ts",
  "src/lib/utils.ts",
  "src/components/ui/Button.tsx",
  "src/components/ui/Input.tsx",
  "src/components/ui/Label.tsx",
  "src/components/ui/Container.tsx",
  "src/components/ui/Section.tsx",
  "src/components/ui/PageHeader.tsx",
  "src/components/ui/LoadingState.tsx",
  "src/components/ui/ErrorState.tsx",
  "src/components/ui/Prose.tsx",
  "src/components/ui/ThemeToggle.tsx",
  "src/components/layout/SiteShell.tsx",
  "src/components/layout/Footer.tsx",
  "src/components/theme/ThemeStyle.tsx",
  "src/components/home/HomeHero.tsx",
  "src/components/home/HomeSections.tsx",
  "src/components/content/ContactForm.tsx",
  "src/components/content/FaqList.tsx",
  "src/components/content/LegalPage.tsx",
  "src/components/seo/JsonLd.tsx",
  "src/providers/ThemeProvider.tsx",
] as const;

export const supabaseFiles = [
  "src/lib/supabase/client.ts",
  "src/lib/supabase/server.ts",
  "src/lib/supabase/env.ts",
  "src/lib/supabase/service.ts",
] as const;

export const authFiles = [
  "src/content/auth.ts",
  "src/lib/auth/paths.ts",
  "src/lib/supabase/middleware.ts",
  "src/types/database.ts",
  "src/app/auth/callback/route.ts",
  "src/app/login/page.tsx",
  "src/app/signup/page.tsx",
  "src/components/auth/SetupRequired.tsx",
  "src/components/auth/SignOutButton.tsx",
  "src/components/profile/ProfileForm.tsx",
  "supabase/migrations/001_profiles.sql",
] as const;

export const paymentSharedFiles = [
  "src/content/payments.ts",
  "src/lib/payments/repository.ts",
  "src/types/payments.ts",
  "supabase/migrations/002_payments.sql",
] as const;

export const stripeFiles = [
  "src/lib/payments/stripe.ts",
  "src/lib/payments/stripe-webhooks.ts",
  "src/app/api/payments/stripe/webhook/route.ts",
] as const;

export const razorpayFiles = [
  "src/lib/payments/razorpay.ts",
  "src/lib/payments/razorpay-webhooks.ts",
  "src/app/api/payments/razorpay/webhook/route.ts",
  "src/app/api/payments/razorpay/verify/route.ts",
] as const;

export const blogFiles = [
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]/page.tsx",
  "src/lib/blog/posts.ts",
  "src/components/blog/MarkdownBody.tsx",
  "src/content/blog/reusable-starter.md",
  "src/content/blog/optional-modules.md",
] as const;

export const analyticsFiles = [
  "src/components/analytics/Analytics.tsx",
  "src/lib/analytics/env.ts",
] as const;

export const emailFiles = ["src/lib/email/send.ts"] as const;

export const adminFiles = [
  "src/app/admin/page.tsx",
  "src/lib/auth/admin.ts",
  "supabase/migrations/003_admin.sql",
] as const;

export const mongoFiles = ["src/lib/db/mongodb.ts"] as const;

export const seoProfileFiles = [
  "src/app/tools/page.tsx",
  "src/app/tools/[slug]/page.tsx",
  "src/app/topics/page.tsx",
  "src/app/topics/[slug]/page.tsx",
  "src/content/tools.ts",
  "src/content/topics.ts",
  "src/components/tools/ToolLayout.tsx",
  "src/components/tools/WordCounter.tsx",
  "src/components/tools/MetaDescriptionChecker.tsx",
] as const;

export const breadcrumbFile = "src/components/seo/Breadcrumbs.tsx";

export type NpmDepSet = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export const alwaysDeps: NpmDepSet = {
  dependencies: {
    clsx: "^2.1.1",
    next: "16.3.4",
    "next-themes": "^0.4.6",
    react: "19.2.8",
    "react-dom": "19.2.8",
    "tailwind-merge": "^3.6.0",
  },
  devDependencies: {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    eslint: "^9",
    "eslint-config-next": "16.3.4",
    tailwindcss: "^4",
    typescript: "^5",
  },
};

/** Extra npm packages keyed by module. Add new modules here. */
export function extraDependencies(config: ProjectConfig): Record<string, string> {
  const deps: Record<string, string> = {};
  if (config.supabase) {
    deps["@supabase/ssr"] = "^0.12.5";
    deps["@supabase/supabase-js"] = "^2.113.0";
  }
  if (config.mongodb) deps.mongodb = "^7.6.0";
  if (config.payments.stripe) deps.stripe = "^22.6.1";
  if (config.payments.razorpay) deps.razorpay = "^2.9.8";
  if (config.blog) {
    deps["gray-matter"] = "^4.0.3";
    deps["react-markdown"] = "^10.1.0";
  }
  if (config.email) deps.resend = "^6.25.0";
  return deps;
}

export function filesForConfig(config: ProjectConfig): string[] {
  const files = [...coreFiles];
  if (config.supabase) files.push(...supabaseFiles);
  if (hasAuth(config)) files.push(...authFiles);
  if (hasPayments(config)) files.push(...paymentSharedFiles);
  if (config.payments.stripe) files.push(...stripeFiles);
  if (config.payments.razorpay) files.push(...razorpayFiles);
  if (config.blog) files.push(...blogFiles);
  if (config.analytics) files.push(...analyticsFiles);
  if (config.email) files.push(...emailFiles);
  if (config.admin) files.push(...adminFiles);
  if (config.mongodb) files.push(...mongoFiles);
  if (config.seoProfile) files.push(...seoProfileFiles);
  if (config.blog || config.seoProfile) files.push(breadcrumbFile);
  return files;
}
