import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import type {
  BillingSubscription,
  PaymentRecord,
  PaymentStatus,
} from "@/types/payments";

export async function insertPendingPayment(input: {
  userId: string;
  provider: PaymentRecord["provider"];
  kind: PaymentRecord["kind"];
  productId: string;
  amount: number;
  currency: string;
}) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("payments")
    .insert({
      user_id: input.userId,
      provider: input.provider,
      kind: input.kind,
      status: "pending",
      product_id: input.productId,
      amount: input.amount,
      currency: input.currency,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as PaymentRecord;
}

export async function updatePayment(
  paymentId: string,
  patch: Partial<
    Pick<
      PaymentRecord,
      | "status"
      | "provider_session_id"
      | "provider_payment_id"
      | "provider_subscription_id"
    >
  >,
) {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("payments")
    .update(patch)
    .eq("id", paymentId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updatePaymentByProviderId(input: {
  provider: PaymentRecord["provider"];
  providerPaymentId: string;
  status: PaymentStatus;
}) {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("payments")
    .update({
      status: input.status,
      provider_payment_id: input.providerPaymentId,
    })
    .eq("provider", input.provider)
    .eq("provider_payment_id", input.providerPaymentId);

  if (error) {
    console.error("updatePaymentByProviderId:", error.message);
  }
}

export async function findPaymentBySession(
  provider: PaymentRecord["provider"],
  sessionId: string,
) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("payments")
    .select("*")
    .eq("provider", provider)
    .eq("provider_session_id", sessionId)
    .maybeSingle();

  return data as PaymentRecord | null;
}

export async function upsertSubscription(input: {
  userId: string;
  provider: BillingSubscription["provider"];
  productId: string;
  status: PaymentStatus;
  providerSubscriptionId?: string | null;
  currentPeriodEnd?: string | null;
}) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("billing_subscriptions").upsert({
    user_id: input.userId,
    provider: input.provider,
    product_id: input.productId,
    status: input.status,
    provider_subscription_id: input.providerSubscriptionId ?? null,
    current_period_end: input.currentPeriodEnd ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function saveStripeCustomer(userId: string, customerId: string) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("billing_customers").upsert({
    user_id: userId,
    stripe_customer_id: customerId,
  });

  if (error) {
    console.error("saveStripeCustomer:", error.message);
  }
}

export async function getStripeCustomerId(userId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.stripe_customer_id ?? null;
}

export async function listMyPayments(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("listMyPayments:", error.message);
    return [];
  }

  return (data ?? []) as PaymentRecord[];
}

export async function getMySubscription(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("billing_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("getMySubscription:", error.message);
    return null;
  }

  return data as BillingSubscription | null;
}

export function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function statusLabel(status: PaymentStatus) {
  return status.replace("_", " ");
}
