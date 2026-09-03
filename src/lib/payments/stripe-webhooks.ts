import type Stripe from "stripe";
import {
  findPaymentBySession,
  saveStripeCustomer,
  updatePayment,
  updatePaymentByProviderId,
  upsertSubscription,
} from "@/lib/payments/repository";
import type { PaymentStatus } from "@/types/payments";

function mapStripeSubscriptionStatus(status: string): PaymentStatus {
  if (status === "active" || status === "trialing") return "active";
  if (status === "past_due" || status === "unpaid") return "past_due";
  if (status === "canceled" || status === "incomplete_expired") return "canceled";
  return "pending";
}

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

export async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = asRecord(event.data.object);
      const metadata = asRecord(session.metadata);
      const paymentId = asString(metadata.payment_record_id);
      const userId =
        asString(metadata.user_id) ?? asString(session.client_reference_id);
      const productId = asString(metadata.product_id) ?? "unknown";
      const sessionId = asString(session.id);
      const mode = asString(session.mode);
      const customerId = asString(session.customer);
      const paymentIntent = asString(session.payment_intent);
      const subscriptionId = asString(session.subscription);

      if (paymentId) {
        await updatePayment(paymentId, {
          status: mode === "subscription" ? "active" : "completed",
          provider_session_id: sessionId,
          provider_payment_id: paymentIntent ?? sessionId,
          provider_subscription_id: subscriptionId,
        });
      } else if (sessionId) {
        const existing = await findPaymentBySession("stripe", sessionId);
        if (existing) {
          await updatePayment(existing.id, {
            status: mode === "subscription" ? "active" : "completed",
          });
        }
      }

      if (userId && customerId) {
        await saveStripeCustomer(userId, customerId);
      }

      if (mode === "subscription" && userId) {
        await upsertSubscription({
          userId,
          provider: "stripe",
          productId,
          status: "active",
          providerSubscriptionId: subscriptionId,
        });
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = asRecord(event.data.object);
      const metadata = asRecord(subscription.metadata);
      const userId = asString(metadata.user_id);
      if (!userId) break;

      const periodEnd =
        typeof subscription.current_period_end === "number"
          ? subscription.current_period_end
          : null;

      await upsertSubscription({
        userId,
        provider: "stripe",
        productId: asString(metadata.product_id) ?? "pro",
        status: mapStripeSubscriptionStatus(asString(subscription.status) ?? ""),
        providerSubscriptionId: asString(subscription.id),
        currentPeriodEnd: periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : null,
      });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = asRecord(event.data.object);
      const metadata = asRecord(invoice.metadata);
      const userId = asString(metadata.user_id);
      if (!userId) break;

      await upsertSubscription({
        userId,
        provider: "stripe",
        productId: asString(metadata.product_id) ?? "pro",
        status: "past_due",
        providerSubscriptionId: asString(invoice.subscription),
      });
      break;
    }
    case "charge.refunded": {
      const charge = asRecord(event.data.object);
      const paymentIntent = asString(charge.payment_intent);
      if (!paymentIntent) break;
      await updatePaymentByProviderId({
        provider: "stripe",
        providerPaymentId: paymentIntent,
        status: "refunded",
      });
      break;
    }
    default:
      break;
  }
}
