/**
 * Payments configuration — products, default provider, display amounts.
 *
 * Edit products here. Put Stripe Price IDs / Razorpay Plan IDs in env when you have them.
 * One-time Stripe/Razorpay checkouts work from amount + currency alone.
 * Razorpay subscriptions require RAZORPAY_PLAN_* in env (created in the Razorpay dashboard).
 */

export const paymentProviders = ["stripe", "razorpay"] as const;
export type PaymentProviderId = (typeof paymentProviders)[number];
export type PaymentKind = "one_time" | "subscription";

export type PaymentProduct = {
  id: string;
  name: string;
  description: string;
  kind: PaymentKind;
  interval?: "month" | "year";
  stripe: {
    amount: number;
    currency: string;
    priceId?: string;
  };
  razorpay: {
    amount: number;
    currency: string;
    planId?: string;
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
      stripe: {
        amount: 2900,
        currency: "usd",
        priceId: process.env.STRIPE_PRICE_STARTER,
      },
      razorpay: {
        amount: 290000,
        currency: "inr",
      },
    },
    {
      id: "pro",
      name: "Pro",
      description: "Monthly subscription for ongoing product access.",
      kind: "subscription",
      interval: "month",
      stripe: {
        amount: 1900,
        currency: "usd",
        priceId: process.env.STRIPE_PRICE_PRO,
      },
      razorpay: {
        amount: 149900,
        currency: "inr",
        planId: process.env.RAZORPAY_PLAN_PRO,
      },
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
  return "stripe";
}
