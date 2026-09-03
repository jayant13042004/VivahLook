import { createHmac, timingSafeEqual } from "crypto";
import {
  updatePayment,
  updatePaymentByProviderId,
  upsertSubscription,
} from "@/lib/payments/repository";

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

export function verifyRazorpaySignature(body: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export function verifyRazorpayPaymentSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
  secret: string;
}) {
  const expected = createHmac("sha256", input.secret)
    .update(`${input.orderId}|${input.paymentId}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(input.signature);
  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function handleRazorpayEvent(payload: Record<string, unknown>) {
  const event = asString(payload.event);
  const payloadInner = asRecord(payload.payload);

  if (event === "payment.captured" || event === "payment.failed") {
    const entity = asRecord(asRecord(payloadInner.payment).entity);
    const notes = asRecord(entity.notes);
    const paymentRecordId = asString(notes.payment_record_id);
    const paymentId = asString(entity.id);
    const status = event === "payment.captured" ? "completed" : "failed";

    if (paymentRecordId && paymentId) {
      await updatePayment(paymentRecordId, {
        status,
        provider_payment_id: paymentId,
      });
    } else if (paymentId) {
      await updatePaymentByProviderId({
        provider: "razorpay",
        providerPaymentId: paymentId,
        status,
      });
    }
    return;
  }

  if (
    event === "subscription.activated" ||
    event === "subscription.charged" ||
    event === "subscription.cancelled" ||
    event === "subscription.pending"
  ) {
    const entity = asRecord(asRecord(payloadInner.subscription).entity);
    const notes = asRecord(entity.notes);
    const userId = asString(notes.user_id);
    if (!userId) return;

    const status =
      event === "subscription.cancelled"
        ? "canceled"
        : event === "subscription.pending"
          ? "pending"
          : "active";

    await upsertSubscription({
      userId,
      provider: "razorpay",
      productId: asString(notes.product_id) ?? "pro",
      status,
      providerSubscriptionId: asString(entity.id),
    });

    const paymentRecordId = asString(notes.payment_record_id);
    if (paymentRecordId) {
      await updatePayment(paymentRecordId, {
        status,
        provider_subscription_id: asString(entity.id),
      });
    }
  }
}
