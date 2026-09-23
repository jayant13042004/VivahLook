export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "canceled"
  | "refunded"
  | "active"
  | "past_due";

export type PaymentKind = "one_time" | "subscription";
export type PaymentProviderId = "razorpay";

export type PaymentRecord = {
  id: string;
  user_id: string;
  provider: PaymentProviderId;
  kind: PaymentKind;
  status: PaymentStatus;
  product_id: string;
  amount: number;
  currency: string;
  provider_session_id: string | null;
  provider_payment_id: string | null;
  provider_subscription_id: string | null;
  created_at: string;
  updated_at: string;
};

export type BillingSubscription = {
  user_id: string;
  provider: PaymentProviderId;
  product_id: string;
  status: PaymentStatus;
  provider_subscription_id: string | null;
  current_period_end: string | null;
  updated_at: string;
};

export type BillingCustomer = {
  user_id: string;
  razorpay_customer_id: string | null;
};
