function isPlaceholder(value: string | undefined, placeholders: string[]) {
  if (!value) return false;
  return placeholders.some((item) => value.includes(item) || value === item);
}

export function isStripeConfigured() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return false;
  return !isPlaceholder(key, ["sk_test_your", "your-stripe"]);
}

export function isRazorpayConfigured() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return false;
  return (
    !isPlaceholder(keyId, ["rzp_test_your", "your-razorpay"]) &&
    !isPlaceholder(secret, ["your-razorpay-secret"])
  );
}

export function isPaymentsConfigured() {
  return isStripeConfigured() || isRazorpayConfigured();
}

export function isStripeWebhookConfigured() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  return Boolean(secret) && !isPlaceholder(secret, ["whsec_your", "your-stripe-webhook"]);
}

export function isRazorpayWebhookConfigured() {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  return Boolean(secret) && !isPlaceholder(secret, ["your-razorpay-webhook"]);
}

export function getStripeSecretKey() {
  if (!isStripeConfigured()) {
    throw new Error("Stripe is not configured. See .env.example.");
  }
  return process.env.STRIPE_SECRET_KEY as string;
}

export function getStripeWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is missing.");
  }
  return secret;
}

export function getRazorpayKeys() {
  if (!isRazorpayConfigured()) {
    throw new Error("Razorpay is not configured. See .env.example.");
  }
  return {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    secret: process.env.RAZORPAY_KEY_SECRET as string,
  };
}

export function getRazorpayWebhookSecret() {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is missing.");
  }
  return secret;
}
