import { CheckoutButton } from "@/components/payments/CheckoutButton";
import { paymentsConfig, formatINR } from "@/config/payments";
import { isRazorpayConfigured } from "@/lib/payments/env";

export function PricingCards() {
  const razorpayOn = isRazorpayConfigured();

  return (
    <ul className="mt-10 grid gap-6 md:grid-cols-3">
      {paymentsConfig.products.map((product, idx) => (
        <li
          key={product.id}
          className={`flex flex-col justify-between rounded-2xl border p-6 bg-surface ${
            idx === 1
              ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
              : "border-border"
          }`}
        >
          <div>
            {idx === 1 && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                Most Popular
              </span>
            )}
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {product.looks} Looks Pack
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-foreground">
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-6 font-display text-3xl font-bold text-foreground">
              {formatINR(product.razorpay.amount)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ₹{(product.razorpay.amount / 100 / product.looks).toFixed(0)} per look
            </p>
          </div>

          <div className="mt-8">
            {razorpayOn ? (
              <CheckoutButton
                productId={product.id}
                label={`Get ${product.name}`}
              />
            ) : (
              <p className="text-xs text-center text-muted-foreground py-2 border border-dashed border-border rounded-xl">
                Razorpay keys needed in .env.local
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
