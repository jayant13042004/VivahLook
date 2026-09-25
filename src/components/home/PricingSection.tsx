import Link from "next/link";
import { paymentsConfig, formatINR } from "@/config/payments";
import { usageConfig } from "@/config/wedding";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-2">
            Simple & Transparent
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Bespoke Look <span className="font-editorial-italic font-normal text-primary">Packs</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Begin with {usageConfig.freeGenerationLimit} complimentary look. Upgrade anytime with secure UPI, Cards, and NetBanking via Razorpay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {/* Free Tier */}
          <div className="flex flex-col p-6 rounded-3xl bg-surface border border-border/80 shadow-sm justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Complimentary
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                Trial
              </h3>
              <p className="font-display text-4xl font-bold text-foreground mt-4">
                ₹0
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {usageConfig.freeGenerationLimit} Free wedding look
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> {usageConfig.freeGenerationLimit} instant trial generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> All ceremonies & outfits
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Standard quality download
                </li>
              </ul>
            </div>

            <Link
              href="/studio"
              className="mt-8 w-full py-3 text-center border border-border text-foreground font-semibold rounded-full hover:bg-muted/70 transition-colors text-xs uppercase tracking-wider"
            >
              Try Free Now
            </Link>
          </div>

          {/* Paid Tiers from paymentsConfig */}
          {paymentsConfig.products.map((product, idx) => {
            const isFeatured = idx === 1;
            return (
              <div
                key={product.id}
                className={`relative flex flex-col p-6 rounded-3xl bg-surface justify-between transition-all ${
                  isFeatured
                    ? "border-2 border-primary shadow-xl ring-2 ring-primary/20 md:-translate-y-2"
                    : "border border-border/80 shadow-sm"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {product.looks} Looks
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                    {product.name}
                  </h3>
                  <p className="font-display text-4xl font-bold text-foreground mt-4">
                    {formatINR(product.razorpay.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{(product.razorpay.amount / 100 / product.looks).toFixed(0)} per look
                  </p>

                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    {product.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span> {product.looks} High-Def looks
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span> Unwatermarked download
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span> Instant WhatsApp sharing
                    </li>
                    {idx === 2 && (
                      <li className="flex items-center gap-2 font-medium text-foreground">
                        <span className="text-accent font-bold">★</span> Ultra-HD Bridal Resolution
                      </li>
                    )}
                  </ul>
                </div>

                <Link
                  href="/studio"
                  className={`mt-8 w-full py-3 text-center font-semibold rounded-full text-xs uppercase tracking-wider transition-all ${
                    isFeatured
                      ? "bg-primary text-primary-foreground hover:opacity-95 shadow-md"
                      : "border border-border text-foreground hover:bg-muted/70"
                  }`}
                >
                  Choose Pack
                </Link>
              </div>
            );
          })}
        </div>

        {/* Payment Security Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span>🔒 Secured by Razorpay</span>
            <span>·</span>
            <span>UPI (GPay, PhonePe, Paytm), NetBanking & Cards</span>
          </p>
        </div>
      </div>
    </section>
  );
}
