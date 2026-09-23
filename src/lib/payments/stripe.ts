import Stripe from "stripe";
import { siteConfig } from "@/config/site";
import { getStripeSecretKey } from "@/lib/payments/env";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey());
  }
  return stripeClient;
}

/**
 * VivahLook uses Razorpay exclusively for the Indian market.
 * Stripe checkout is disabled.
 */
export async function createStripeCheckout(_input: {
  userId: string;
  email: string;
  product: unknown;
}): Promise<{ url: string }> {
  throw new Error(
    "Stripe is not supported. VivahLook uses Razorpay for payment processing.",
  );
}

export async function createStripePortal(customerId: string) {
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: new URL("/billing", siteConfig.url).toString(),
  });
  return session.url;
}
