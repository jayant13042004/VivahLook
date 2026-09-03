"use server";

import { redirect } from "next/navigation";
import {
  getDefaultPaymentProvider,
  getPaymentProduct,
  isPaymentProvider,
  type PaymentProduct,
  type PaymentProviderId,
} from "@/config/payments";
import { requireUser } from "@/lib/auth/session";
import {
  isRazorpayConfigured,
  isStripeConfigured,
} from "@/lib/payments/env";
import { createRazorpayCheckout } from "@/lib/payments/razorpay";
import {
  getStripeCustomerId,
} from "@/lib/payments/repository";
import { createStripeCheckout, createStripePortal } from "@/lib/payments/stripe";
import { isServiceRoleConfigured } from "@/lib/supabase/service";
import type { RazorpayCheckoutPayload } from "@/lib/payments/razorpay";

export type CheckoutActionResult =
  | { error: string }
  | { type: "redirect"; url: string }
  | { type: "razorpay"; checkout: RazorpayCheckoutPayload };

export async function startCheckout(
  productId: string,
  providerInput?: string,
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

  let provider: PaymentProviderId = getDefaultPaymentProvider();
  if (providerInput && isPaymentProvider(providerInput)) {
    provider = providerInput;
  }

  try {
    if (provider === "stripe") {
      if (!isStripeConfigured()) {
        return { error: "Stripe is not configured." };
      }
      const { url } = await createStripeCheckout({
        userId: user.id,
        email: user.email ?? "",
        product: product as PaymentProduct,
      });
      return { type: "redirect", url };
    }

    if (!isRazorpayConfigured()) {
      return { error: "Razorpay is not configured." };
    }

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
