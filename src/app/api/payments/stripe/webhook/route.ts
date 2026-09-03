import { NextResponse } from "next/server";
import {
  getStripe,
} from "@/lib/payments/stripe";
import {
  getStripeWebhookSecret,
  isStripeWebhookConfigured,
} from "@/lib/payments/env";
import { handleStripeEvent } from "@/lib/payments/stripe-webhooks";
import { isServiceRoleConfigured } from "@/lib/supabase/service";

export async function POST(request: Request) {
  if (!isStripeWebhookConfigured() || !isServiceRoleConfigured()) {
    return NextResponse.json(
      { error: "Stripe webhook or Supabase service role is not configured." },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret(),
    );
    await handleStripeEvent(event);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook:", error);
    return NextResponse.json({ error: "Invalid webhook." }, { status: 400 });
  }
}
