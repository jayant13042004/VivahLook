import { copyFile, writeFile } from "../fs.ts";
import { hasPayments, type ProjectConfig } from "../types.ts";

export function writePaymentSources(
  kitRoot: string,
  outDir: string,
  config: ProjectConfig,
) {
  if (!hasPayments(config)) return;

  if (config.payments.stripe && config.payments.razorpay) {
    copyFile(kitRoot, outDir, "src/config/payments.ts");
    copyFile(kitRoot, outDir, "src/lib/payments/env.ts");
    copyFile(kitRoot, outDir, "src/app/billing/actions.ts");
    copyFile(kitRoot, outDir, "src/components/payments/CheckoutButton.tsx");
    copyFile(kitRoot, outDir, "src/components/payments/PricingCards.tsx");
    copyFile(kitRoot, outDir, "src/app/billing/page.tsx");
    return;
  }

  writePaymentsConfig(outDir, config);
  writePaymentsEnv(outDir, config);
  writeBillingActions(outDir, config);
  writeCheckoutButton(outDir, config);
  writePricingCards(outDir, config);
  writeBillingPage(outDir, config);
}

function writePaymentsConfig(outDir: string, config: ProjectConfig) {
  const stripe = config.payments.stripe;
  const providers = [
    stripe ? '"stripe"' : null,
    config.payments.razorpay ? '"razorpay"' : null,
  ].filter(Boolean);

  const productFields = stripe
    ? `      stripe: {
        amount: 2900,
        currency: "usd",
        priceId: process.env.STRIPE_PRICE_STARTER,
      },`
    : `      razorpay: {
        amount: 290000,
        currency: "inr",
      },`;

  const proFields = stripe
    ? `      stripe: {
        amount: 1900,
        currency: "usd",
        priceId: process.env.STRIPE_PRICE_PRO,
      },`
    : `      razorpay: {
        amount: 149900,
        currency: "inr",
        planId: process.env.RAZORPAY_PLAN_PRO,
      },`;

  const defaultProvider = stripe ? "stripe" : "razorpay";

  writeFile(
    outDir,
    "src/config/payments.ts",
    `export const paymentProviders = [${providers.join(", ")}] as const;
export type PaymentProviderId = (typeof paymentProviders)[number];
export type PaymentKind = "one_time" | "subscription";

export type PaymentProduct = {
  id: string;
  name: string;
  description: string;
  kind: PaymentKind;
  interval?: "month" | "year";
  ${stripe ? "stripe" : "razorpay"}: {
    amount: number;
    currency: string;
    ${stripe ? "priceId?: string" : "planId?: string"};
  };
};

export const paymentsConfig = {
  successPath: "/billing?checkout=success",
  cancelPath: "/billing?checkout=canceled",
  products: [
    {
      id: "starter",
      name: "Starter",
      description: "One-time purchase — good for launching a single product.",
      kind: "one_time",
${productFields}
    },
    {
      id: "pro",
      name: "Pro",
      description: "Monthly subscription for ongoing product access.",
      kind: "subscription",
      interval: "month",
${proFields}
    },
  ] satisfies PaymentProduct[],
};

export function getPaymentProduct(productId: string) {
  return paymentsConfig.products.find((product) => product.id === productId);
}

export function isPaymentProvider(value: string): value is PaymentProviderId {
  return paymentProviders.includes(value as PaymentProviderId);
}

export function getDefaultPaymentProvider(): PaymentProviderId {
  const value = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER;
  if (value && isPaymentProvider(value)) return value;
  return "${defaultProvider}";
}
`,
  );
}

function writePaymentsEnv(outDir: string, config: ProjectConfig) {
  if (config.payments.stripe) {
    writeFile(
      outDir,
      "src/lib/payments/env.ts",
      `function isPlaceholder(value: string | undefined, placeholders: string[]) {
  if (!value) return false;
  return placeholders.some((item) => value.includes(item) || value === item);
}

export function isStripeConfigured() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return false;
  return !isPlaceholder(key, ["sk_test_your", "your-stripe"]);
}

export function isPaymentsConfigured() {
  return isStripeConfigured();
}

export function isStripeWebhookConfigured() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  return Boolean(secret) && !isPlaceholder(secret, ["whsec_your", "your-stripe-webhook"]);
}

export function getStripeSecretKey() {
  if (!isStripeConfigured()) {
    throw new Error("Stripe is not configured. See .env.example.");
  }
  return process.env.STRIPE_SECRET_KEY as string;
}

export function getStripeWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is missing.");
  }
  return secret;
}
`,
    );
    return;
  }

  writeFile(
    outDir,
    "src/lib/payments/env.ts",
    `function isPlaceholder(value: string | undefined, placeholders: string[]) {
  if (!value) return false;
  return placeholders.some((item) => value.includes(item) || value === item);
}

export function isRazorpayConfigured() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return false;
  return (
    !isPlaceholder(keyId, ["rzp_test_your", "your-razorpay"]) &&
    !isPlaceholder(secret, ["your-razorpay-secret"])
  );
}

export function isPaymentsConfigured() {
  return isRazorpayConfigured();
}

export function isRazorpayWebhookConfigured() {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  return Boolean(secret) && !isPlaceholder(secret, ["your-razorpay-webhook"]);
}

export function getRazorpayKeys() {
  if (!isRazorpayConfigured()) {
    throw new Error("Razorpay is not configured. See .env.example.");
  }
  return {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    secret: process.env.RAZORPAY_KEY_SECRET as string,
  };
}

export function getRazorpayWebhookSecret() {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is missing.");
  }
  return secret;
}
`,
  );
}

function writeBillingActions(outDir: string, config: ProjectConfig) {
  if (config.payments.stripe) {
    writeFile(
      outDir,
      "src/app/billing/actions.ts",
      `"use server";

import { redirect } from "next/navigation";
import {
  getPaymentProduct,
  type PaymentProduct,
} from "@/config/payments";
import { requireUser } from "@/lib/auth/session";
import { isStripeConfigured } from "@/lib/payments/env";
import { getStripeCustomerId } from "@/lib/payments/repository";
import { createStripeCheckout, createStripePortal } from "@/lib/payments/stripe";
import { isServiceRoleConfigured } from "@/lib/supabase/service";

export type CheckoutActionResult =
  | { error: string }
  | { type: "redirect"; url: string };

export async function startCheckout(
  productId: string,
): Promise<CheckoutActionResult> {
  if (!isServiceRoleConfigured()) {
    return {
      error: "Add SUPABASE_SERVICE_ROLE_KEY to write payment records.",
    };
  }

  const user = await requireUser();
  const product = getPaymentProduct(productId);
  if (!product) {
    return { error: "Unknown product." };
  }

  if (!isStripeConfigured()) {
    return { error: "Stripe is not configured." };
  }

  try {
    const { url } = await createStripeCheckout({
      userId: user.id,
      email: user.email ?? "",
      product: product as PaymentProduct,
    });
    return { type: "redirect", url };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Checkout failed.",
    };
  }
}

export async function openStripePortal() {
  const user = await requireUser();
  if (!isStripeConfigured()) {
    redirect("/billing");
  }
  const customerId = await getStripeCustomerId(user.id);
  if (!customerId) {
    redirect("/billing");
  }
  const url = await createStripePortal(customerId);
  redirect(url);
}
`,
    );
    return;
  }

  writeFile(
    outDir,
    "src/app/billing/actions.ts",
    `"use server";

import { getPaymentProduct, type PaymentProduct } from "@/config/payments";
import { requireUser } from "@/lib/auth/session";
import { isRazorpayConfigured } from "@/lib/payments/env";
import { createRazorpayCheckout } from "@/lib/payments/razorpay";
import { isServiceRoleConfigured } from "@/lib/supabase/service";
import type { RazorpayCheckoutPayload } from "@/lib/payments/razorpay";

export type CheckoutActionResult =
  | { error: string }
  | { type: "razorpay"; checkout: RazorpayCheckoutPayload };

export async function startCheckout(
  productId: string,
): Promise<CheckoutActionResult> {
  if (!isServiceRoleConfigured()) {
    return {
      error: "Add SUPABASE_SERVICE_ROLE_KEY to write payment records.",
    };
  }

  const user = await requireUser();
  const product = getPaymentProduct(productId);
  if (!product) {
    return { error: "Unknown product." };
  }

  if (!isRazorpayConfigured()) {
    return { error: "Razorpay is not configured." };
  }

  try {
    const checkout = await createRazorpayCheckout({
      userId: user.id,
      email: user.email ?? "",
      product: product as PaymentProduct,
    });
    return { type: "razorpay", checkout };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Checkout failed.",
    };
  }
}
`,
  );
}

function writeCheckoutButton(outDir: string, config: ProjectConfig) {
  if (config.payments.stripe) {
    writeFile(
      outDir,
      "src/components/payments/CheckoutButton.tsx",
      `"use client";

import { useState } from "react";
import { startCheckout } from "@/app/billing/actions";
import { Button } from "@/components/ui/Button";

type CheckoutButtonProps = {
  productId: string;
  label: string;
  disabled?: boolean;
};

export function CheckoutButton({ productId, label, disabled }: CheckoutButtonProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    setPending(true);
    try {
      const result = await startCheckout(productId);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      window.location.assign(result.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={onClick} disabled={disabled || pending} className="w-full">
        {pending ? "Starting checkout…" : label}
      </Button>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
`,
    );
    return;
  }

  writeFile(
    outDir,
    "src/components/payments/CheckoutButton.tsx",
    `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startCheckout } from "@/app/billing/actions";
import { Button } from "@/components/ui/Button";
import type { RazorpayCheckoutPayload } from "@/lib/payments/razorpay";

type CheckoutButtonProps = {
  productId: string;
  label: string;
  disabled?: boolean;
};

export function CheckoutButton({ productId, label, disabled }: CheckoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    setPending(true);
    try {
      const result = await startCheckout(productId);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      await openRazorpay(result.checkout, () => {
        router.push("/billing?checkout=success");
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={onClick} disabled={disabled || pending} className="w-full">
        {pending ? "Starting checkout…" : label}
      </Button>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

async function loadRazorpayScript() {
  if (window.Razorpay) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
    document.body.appendChild(script);
  });
}

async function openRazorpay(
  checkout: RazorpayCheckoutPayload,
  onSuccess: () => void,
) {
  await loadRazorpayScript();
  const RazorpayCheckout = window.Razorpay;
  if (!RazorpayCheckout) {
    throw new Error("Razorpay checkout is unavailable.");
  }

  await new Promise<void>((resolve, reject) => {
    const instance = new RazorpayCheckout({
      key: checkout.keyId,
      amount: checkout.amount,
      currency: checkout.currency,
      name: checkout.name,
      description: checkout.description,
      order_id: checkout.orderId,
      subscription_id: checkout.subscriptionId,
      handler: async (response) => {
        const verify = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            paymentRecordId: checkout.paymentRecordId,
          }),
        });
        if (!verify.ok) {
          reject(new Error("Payment verification failed."));
          return;
        }
        onSuccess();
        resolve();
      },
      modal: {
        ondismiss: () => resolve(),
      },
    });
    instance.open();
  });
}

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id?: string;
      subscription_id?: string;
      handler: (response: Record<string, string>) => void;
      modal?: { ondismiss: () => void };
    }) => { open: () => void };
  }
}
`,
  );
}

function writePricingCards(outDir: string, config: ProjectConfig) {
  if (config.payments.stripe) {
    writeFile(
      outDir,
      "src/components/payments/PricingCards.tsx",
      `import { CheckoutButton } from "@/components/payments/CheckoutButton";
import type { PaymentProduct } from "@/config/payments";
import { paymentsConfig } from "@/config/payments";
import { isStripeConfigured } from "@/lib/payments/env";
import { formatMoney } from "@/lib/payments/repository";

export function PricingCards() {
  const stripeOn = isStripeConfigured();

  return (
    <ul className="mt-10 grid gap-6 lg:grid-cols-2">
      {paymentsConfig.products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col rounded-lg border border-border bg-surface p-6"
        >
          <p className="text-sm font-medium text-primary">
            {product.kind === "subscription" ? "Subscription" : "One-time"}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
            {product.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-6 font-display text-3xl font-semibold text-foreground">
            {formatDisplayPrice(product)}
            {product.kind === "subscription" ? (
              <span className="ml-1 text-base font-medium text-muted-foreground">
                /{product.interval ?? "month"}
              </span>
            ) : null}
          </p>

          <div className="mt-8 space-y-3">
            {stripeOn ? (
              <CheckoutButton productId={product.id} label="Pay with Stripe" />
            ) : (
              <p className="text-sm text-muted-foreground">
                Add Stripe keys to enable checkout.
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatDisplayPrice(product: PaymentProduct) {
  return formatMoney(product.stripe.amount, product.stripe.currency);
}
`,
    );
    return;
  }

  writeFile(
    outDir,
    "src/components/payments/PricingCards.tsx",
    `import { CheckoutButton } from "@/components/payments/CheckoutButton";
import type { PaymentProduct } from "@/config/payments";
import { paymentsConfig } from "@/config/payments";
import { isRazorpayConfigured } from "@/lib/payments/env";
import { formatMoney } from "@/lib/payments/repository";

export function PricingCards() {
  const razorpayOn = isRazorpayConfigured();

  return (
    <ul className="mt-10 grid gap-6 lg:grid-cols-2">
      {paymentsConfig.products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col rounded-lg border border-border bg-surface p-6"
        >
          <p className="text-sm font-medium text-primary">
            {product.kind === "subscription" ? "Subscription" : "One-time"}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
            {product.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-6 font-display text-3xl font-semibold text-foreground">
            {formatDisplayPrice(product)}
            {product.kind === "subscription" ? (
              <span className="ml-1 text-base font-medium text-muted-foreground">
                /{product.interval ?? "month"}
              </span>
            ) : null}
          </p>

          <div className="mt-8 space-y-3">
            {razorpayOn ? (
              <CheckoutButton
                productId={product.id}
                label={
                  product.kind === "subscription" && !product.razorpay.planId
                    ? "Razorpay plan ID missing"
                    : "Pay with Razorpay"
                }
                disabled={
                  product.kind === "subscription" && !product.razorpay.planId
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Add Razorpay keys to enable checkout.
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatDisplayPrice(product: PaymentProduct) {
  return formatMoney(product.razorpay.amount, product.razorpay.currency);
}
`,
  );
}

function writeBillingPage(outDir: string, config: ProjectConfig) {
  const stripePortalImport = config.payments.stripe
    ? `import { openStripePortal } from "@/app/billing/actions";\n`
    : "";
  const stripeCustomerFetch = config.payments.stripe
    ? `    isServiceRoleConfigured() ? getStripeCustomerId(user.id) : Promise.resolve(null),`
    : `    Promise.resolve(null),`;
  const stripePortalUi = config.payments.stripe
    ? `
        {stripeCustomerId ? (
          <form action={openStripePortal} className="mt-4">
            <Button type="submit" variant="secondary" size="sm">
              {paymentsContent.billing.manageStripe}
            </Button>
          </form>
        ) : null}`
    : "";
  const pricing = config.payments.stripe && config.payments.razorpay
    ? `<PricingCards defaultProvider={getDefaultPaymentProvider()} />`
    : `<PricingCards />`;
  const defaultProviderImport =
    config.payments.stripe && config.payments.razorpay
      ? `import { getDefaultPaymentProvider } from "@/config/payments";\n`
      : "";

  writeFile(
    outDir,
    "src/app/billing/page.tsx",
    `import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { PricingCards } from "@/components/payments/PricingCards";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
${config.payments.stripe ? `import { Button } from "@/components/ui/Button";\n` : ""}${defaultProviderImport}import { paymentsContent } from "@/content/payments";
${config.admin ? `import { isAdminUser } from "@/lib/auth/admin";\n` : ""}import { requireProfile } from "@/lib/auth/session";
import { isPaymentsConfigured } from "@/lib/payments/env";
import {
  formatMoney,
  getMySubscription,
  ${config.payments.stripe ? "getStripeCustomerId," : ""}
  listMyPayments,
  statusLabel,
} from "@/lib/payments/repository";
import { isSupabaseConfigured } from "@/lib/supabase/env";
${config.payments.stripe ? `import { isServiceRoleConfigured } from "@/lib/supabase/service";\n` : ""}
import { buildMetadata } from "@/lib/seo";
${stripePortalImport}
export const metadata = buildMetadata({
  title: paymentsContent.billing.title,
  description: paymentsContent.billing.description,
  path: "/billing",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type BillingPageProps = {
  searchParams: Promise<{ checkout?: string }>;
};

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const { checkout } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <Section>
        <SetupRequired />
      </Section>
    );
  }

  const { user${config.admin ? ", profile" : ""} } = await requireProfile();
  ${config.admin ? "const showAdmin = isAdminUser({ email: user.email, role: profile.role });" : ""}
  const [payments, subscription${config.payments.stripe ? ", stripeCustomerId" : ""}] = await Promise.all([
    listMyPayments(user.id),
    getMySubscription(user.id),
${config.payments.stripe ? stripeCustomerFetch : ""}
  ]);

  const banner =
    checkout === "success"
      ? paymentsContent.billing.checkoutSuccess
      : checkout === "canceled"
        ? paymentsContent.billing.checkoutCanceled
        : null;

  return (
    <Section>
      <DashboardNav className="mb-8"${config.admin ? " showAdmin={showAdmin}" : ""} />
      <PageHeader
        title={paymentsContent.billing.title}
        description={paymentsContent.billing.description}
      />

      {banner ? (
        <p className="mt-6 rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
          {banner}
        </p>
      ) : null}

      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          {paymentsContent.billing.currentPlan}
        </h2>
        {subscription ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {subscription.product_id} · {statusLabel(subscription.status)}
            {subscription.current_period_end
              ? \` · renews \${new Date(subscription.current_period_end).toLocaleDateString()}\`
              : ""}
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            {paymentsContent.billing.noSubscription}
          </p>
        )}
${stripePortalUi}
      </div>

      {isPaymentsConfigured() ? (
        ${pricing}
      ) : (
        <p className="mt-10 rounded-lg border border-border bg-surface p-6 text-sm text-muted-foreground">
          {paymentsContent.billing.setupDescription}
        </p>
      )}

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {paymentsContent.billing.history}
        </h2>
        {payments.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {paymentsContent.billing.emptyHistory}
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {payment.product_id} · {payment.kind.replace("_", " ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.provider} · {new Date(payment.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-foreground">
                  {formatMoney(payment.amount, payment.currency)} · {statusLabel(payment.status)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
`,
  );
}
