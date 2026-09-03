import { NextResponse } from "next/server";
import {
  getRazorpayWebhookSecret,
  isRazorpayWebhookConfigured,
} from "@/lib/payments/env";
import {
  handleRazorpayEvent,
  verifyRazorpaySignature,
} from "@/lib/payments/razorpay-webhooks";
import { isServiceRoleConfigured } from "@/lib/supabase/service";

export async function POST(request: Request) {
  if (!isRazorpayWebhookConfigured() || !isServiceRoleConfigured()) {
    return NextResponse.json(
      { error: "Razorpay webhook or Supabase service role is not configured." },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  if (!verifyRazorpaySignature(body, signature, getRazorpayWebhookSecret())) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    const payload = JSON.parse(body) as Record<string, unknown>;
    await handleRazorpayEvent(payload);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook:", error);
    return NextResponse.json({ error: "Webhook failed." }, { status: 400 });
  }
}
