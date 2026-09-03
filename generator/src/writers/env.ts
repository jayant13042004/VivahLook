import { hasAuth, hasPayments, type ProjectConfig } from "../types.ts";
import { writeFile } from "../fs.ts";

export function writeEnvExample(outDir: string, config: ProjectConfig) {
  const lines = [
    "# Public site URL used for canonical links, sitemap, and Open Graph.",
    "NEXT_PUBLIC_SITE_URL=http://localhost:3000",
    "",
  ];

  if (config.supabase) {
    lines.push(
      "# Supabase — Project Settings → API",
      "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key",
    );
    if (hasPayments(config) || config.admin) {
      lines.push(
        "# Server-only — never expose in the browser",
        "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key",
      );
    }
    lines.push("");
  }

  if (hasPayments(config)) {
    const defaultProvider = config.payments.stripe ? "stripe" : "razorpay";
    lines.push(`NEXT_PUBLIC_PAYMENT_PROVIDER=${defaultProvider}`, "");
    if (config.payments.stripe) {
      lines.push(
        "# Stripe",
        "STRIPE_SECRET_KEY=sk_test_your-stripe-secret",
        "STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook",
        "# STRIPE_PRICE_STARTER=price_...",
        "# STRIPE_PRICE_PRO=price_...",
        "",
      );
    }
    if (config.payments.razorpay) {
      lines.push(
        "# Razorpay",
        "NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your-key",
        "RAZORPAY_KEY_SECRET=your-razorpay-secret",
        "RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook",
        "# RAZORPAY_PLAN_PRO=plan_...",
        "",
      );
    }
  }

  if (config.analytics) {
    lines.push(
      "# Analytics (optional)",
      "# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com",
      "# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX",
      "",
    );
  }

  if (config.email) {
    lines.push(
      "# Email (Resend) — contact form",
      "# RESEND_API_KEY=re_your-resend-key",
      "# EMAIL_FROM=App <hello@your-domain.com>",
      "# EMAIL_TO=hello@example.com",
      "",
    );
  }

  if (config.admin) {
    lines.push("# Admin — comma-separated emails (or set profiles.role = admin)", "# ADMIN_EMAILS=you@example.com", "");
  }

  if (config.mongodb) {
    lines.push(
      "# Optional extra database (auth stays on Supabase when auth is enabled)",
      "# MONGODB_URI=mongodb+srv://...",
      "# MONGODB_DB_NAME=app",
      "",
    );
  }

  if (hasAuth(config) && config.auth.github) {
    lines.push("# Enable GitHub in Supabase Auth providers (same callback as Google).", "");
  }

  writeFile(outDir, ".env.example", lines.join("\n").trimEnd() + "\n");
}
