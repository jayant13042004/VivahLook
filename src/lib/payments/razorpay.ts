import Razorpay from "razorpay";
import type { PaymentProduct } from "@/config/payments";
import { getRazorpayKeys } from "@/lib/payments/env";
import {
  insertPendingPayment,
  updatePayment,
} from "@/lib/payments/repository";

let razorpayClient: Razorpay | null = null;

function getRazorpay() {
  if (!razorpayClient) {
    const { keyId, secret } = getRazorpayKeys();
    razorpayClient = new Razorpay({ key_id: keyId, key_secret: secret });
  }
  return razorpayClient;
}

export type RazorpayCheckoutPayload = {
  keyId: string;
  orderId?: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  paymentRecordId: string;
};

export async function createRazorpayCheckout(input: {
  userId: string;
  email: string;
  product: PaymentProduct;
}): Promise<RazorpayCheckoutPayload> {
  const { keyId } = getRazorpayKeys();
  const razorpay = getRazorpay();
  const { product, userId, email } = input;

  const payment = await insertPendingPayment({
    userId,
    provider: "razorpay",
    kind: product.kind,
    productId: product.id,
    amount: product.razorpay.amount,
    currency: product.razorpay.currency,
  });

  const notes = {
    user_id: userId,
    product_id: product.id,
    payment_record_id: payment.id,
    email,
  };

  if (product.kind === "subscription") {
    const planId = product.razorpay.planId;
    if (!planId) {
      throw new Error(
        "Razorpay subscriptions need RAZORPAY_PLAN_PRO (or the product planId) from the Razorpay dashboard.",
      );
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
      notes,
    });

    await updatePayment(payment.id, {
      provider_subscription_id: subscription.id,
    });

    return {
      keyId,
      subscriptionId: subscription.id,
      amount: product.razorpay.amount,
      currency: product.razorpay.currency.toUpperCase(),
      name: product.name,
      description: product.description,
      paymentRecordId: payment.id,
    };
  }

  const order = await razorpay.orders.create({
    amount: product.razorpay.amount,
    currency: product.razorpay.currency.toUpperCase(),
    receipt: payment.id.replace(/-/g, "").slice(0, 40),
    notes,
  });

  await updatePayment(payment.id, { provider_session_id: order.id });

  return {
    keyId,
    orderId: order.id,
    amount: product.razorpay.amount,
    currency: product.razorpay.currency.toUpperCase(),
    name: product.name,
    description: product.description,
    paymentRecordId: payment.id,
  };
}
