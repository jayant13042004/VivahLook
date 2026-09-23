"use server";

import {
  getPaymentProduct,
  type PaymentProduct,
} from "@/config/payments";
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
      error: "Payment service is temporarily unavailable. Please try again later.",
    };
  }

  const user = await requireUser();
  const product = getPaymentProduct(productId);
  if (!product) {
    return { error: "Unknown product." };
  }

  try {
    if (!isRazorpayConfigured()) {
      return { error: "Payment gateway is not configured. Please contact support." };
    }

    const checkout = await createRazorpayCheckout({
      userId: user.id,
      email: user.email ?? "",
      product: product as PaymentProduct,
    });
    return { type: "razorpay", checkout };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Checkout failed. Please try again.",
    };
  }
}
