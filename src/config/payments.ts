/**
 * Payments configuration — VivahLook, Razorpay-only, INR pricing.
 *
 * Products are credit-pack based. Users buy look packs.
 * Razorpay is the exclusive payment gateway for the Indian market.
 * Architecture supports adding another gateway later if needed.
 */

export const paymentProviders = ["razorpay"] as const;
export type PaymentProviderId = (typeof paymentProviders)[number];
export type PaymentKind = "one_time" | "subscription";

export type PaymentProduct = {
  id: string;
  name: string;
  description: string;
  kind: PaymentKind;
  interval?: "month" | "year";
  /** Number of looks/credits this pack grants */
  looks: number;
  razorpay: {
    amount: number; // in paise
    currency: string;
    planId?: string;
  };
};

export const paymentsConfig = {
  successPath: "/billing?checkout=success",
  cancelPath: "/billing?checkout=canceled",
  products: [
    {
      id: "starter_pack",
      name: "Starter Pack",
      description: "5 wedding looks to try your favorite ceremonies",
      kind: "one_time",
      looks: 5,
      razorpay: {
        amount: 9900, // ₹99
        currency: "inr",
      },
    },
    {
      id: "wedding_pack",
      name: "Wedding Wardrobe Pack",
      description: "15 looks — complete wardrobe coverage from Haldi to Reception",
      kind: "one_time",
      looks: 15,
      razorpay: {
        amount: 19900, // ₹199
        currency: "inr",
      },
    },
    {
      id: "royal_hd",
      name: "Royal Couture HD Pack",
      description: "30 HD looks + unwatermarked high-res downloads + priority styling",
      kind: "one_time",
      looks: 30,
      razorpay: {
        amount: 29900, // ₹299
        currency: "inr",
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
  return "razorpay";
}

/** Format amount in paise to INR display string */
export function formatINR(amountPaise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountPaise / 100);
}
