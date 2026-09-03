import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/session";
import { getRazorpayKeys, isRazorpayConfigured } from "@/lib/payments/env";
import { verifyRazorpayPaymentSignature } from "@/lib/payments/razorpay-webhooks";
import { updatePayment } from "@/lib/payments/repository";
import { isServiceRoleConfigured } from "@/lib/supabase/service";

export async function POST(request: Request) {
  if (!isRazorpayConfigured() || !isServiceRoleConfigured()) {
    return NextResponse.json({ error: "Razorpay is not configured." }, { status: 500 });
  }

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    razorpay_subscription_id?: string;
    paymentRecordId?: string;
  };

  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;
  const orderId = body.razorpay_order_id;
  const paymentRecordId = body.paymentRecordId;

  if (!paymentId || !signature || !paymentRecordId) {
    return NextResponse.json({ error: "Missing payment fields." }, { status: 400 });
  }

  const { secret } = getRazorpayKeys();
  const signedPayload = orderId ?? body.razorpay_subscription_id;
  if (!signedPayload) {
    return NextResponse.json({ error: "Missing order or subscription id." }, { status: 400 });
  }

  const valid = verifyRazorpayPaymentSignature({
    orderId: signedPayload,
    paymentId,
    signature,
    secret,
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  await updatePayment(paymentRecordId, {
    status: "completed",
    provider_payment_id: paymentId,
    provider_session_id: orderId ?? null,
    provider_subscription_id: body.razorpay_subscription_id ?? null,
  });

  return NextResponse.json({ ok: true });
}
