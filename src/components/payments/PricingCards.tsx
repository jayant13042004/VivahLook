import { CheckoutButton } from "@/components/payments/CheckoutButton";
import type { PaymentProduct, PaymentProviderId } from "@/config/payments";
import { paymentsConfig } from "@/config/payments";
import {
  isRazorpayConfigured,
  isStripeConfigured,
} from "@/lib/payments/env";
import { formatMoney } from "@/lib/payments/repository";

type PricingCardsProps = {
  defaultProvider: PaymentProviderId;
};

export function PricingCards({ defaultProvider }: PricingCardsProps) {
  const stripeOn = isStripeConfigured();
  const razorpayOn = isRazorpayConfigured();

  return (
    <ul className="mt-10 grid gap-6 lg:grid-cols-2">
      {paymentsConfig.products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col rounded-lg border border-border bg-surface p-6"
        >
          <p className="text-sm font-medium text-primary">
            {product.kind === "subscription" ? "Subscription" : "One-time"}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
            {product.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-6 font-display text-3xl font-semibold text-foreground">
            {formatDisplayPrice(product, defaultProvider)}
            {product.kind === "subscription" ? (
              <span className="ml-1 text-base font-medium text-muted-foreground">
                /{product.interval ?? "month"}
              </span>
            ) : null}
          </p>

          <div className="mt-8 space-y-3">
            {stripeOn ? (
              <CheckoutButton
                productId={product.id}
                provider="stripe"
                label="Pay with Stripe"
              />
            ) : null}
            {razorpayOn ? (
              <CheckoutButton
                productId={product.id}
                provider="razorpay"
                label={
                  product.kind === "subscription" && !product.razorpay.planId
                    ? "Razorpay plan ID missing"
                    : "Pay with Razorpay"
                }
                disabled={
                  product.kind === "subscription" && !product.razorpay.planId
                }
              />
            ) : null}
            {!stripeOn && !razorpayOn ? (
              <p className="text-sm text-muted-foreground">
                Add Stripe or Razorpay keys to enable checkout.
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatDisplayPrice(product: PaymentProduct, provider: PaymentProviderId) {
  const offer = provider === "razorpay" ? product.razorpay : product.stripe;
  return formatMoney(offer.amount, offer.currency);
}
