import Stripe from "stripe";
import { siteConfig } from "@/config/site";
import { paymentsConfig, type PaymentProduct } from "@/config/payments";
import { getStripeSecretKey } from "@/lib/payments/env";
import {
  insertPendingPayment,
  updatePayment,
} from "@/lib/payments/repository";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey());
  }
  return stripeClient;
}

export async function createStripeCheckout(input: {
  userId: string;
  email: string;
  product: PaymentProduct;
}) {
  const stripe = getStripe();
  const { product, userId, email } = input;
  const payment = await insertPendingPayment({
    userId,
    provider: "stripe",
    kind: product.kind,
    productId: product.id,
    amount: product.stripe.amount,
    currency: product.stripe.currency,
  });

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = product.stripe
    .priceId
    ? { price: product.stripe.priceId, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: product.stripe.currency,
          product_data: { name: product.name },
          unit_amount: product.stripe.amount,
          ...(product.kind === "subscription"
            ? { recurring: { interval: product.interval ?? "month" } }
            : {}),
        },
      };

  const session = await stripe.checkout.sessions.create({
    mode: product.kind === "subscription" ? "subscription" : "payment",
    customer_email: email,
    client_reference_id: userId,
    line_items: [lineItem],
    success_url: new URL(paymentsConfig.successPath, siteConfig.url).toString(),
    cancel_url: new URL(paymentsConfig.cancelPath, siteConfig.url).toString(),
    metadata: {
      user_id: userId,
      product_id: product.id,
      payment_record_id: payment.id,
      kind: product.kind,
    },
    subscription_data:
      product.kind === "subscription"
        ? {
            metadata: {
              user_id: userId,
              product_id: product.id,
              payment_record_id: payment.id,
            },
          }
        : undefined,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  await updatePayment(payment.id, { provider_session_id: session.id });

  return { url: session.url };
}

export async function createStripePortal(customerId: string) {
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: new URL("/billing", siteConfig.url).toString(),
  });
  return session.url;
}
