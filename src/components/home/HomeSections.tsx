import Link from "next/link";
import { homeContent } from "@/content/pages";
import { occasions, outfits } from "@/config/wedding";
import { formatINR, paymentsConfig } from "@/config/payments";
import { faqContent } from "@/content/pages";

export function HomeSections() {
  const { features, cta } = homeContent;

  return (
    <>
      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              {features.title}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              {features.supporting}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.items.map((item, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-display font-bold text-lg mb-4">
                  {i + 1}
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 sm:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Every Wedding Occasion
            </h2>
            <p className="mt-3 text-muted-foreground">
              From Haldi to Reception — see your look for every ceremony.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((occ) => (
              <div
                key={occ.id}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{occ.emoji}</span>
                <span className="font-medium text-foreground text-sm">{occ.label}</span>
                <span className="text-xs text-muted-foreground">{occ.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outfit Showcase */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Stunning Outfit Collection
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sherwanis, lehengas, sarees, bandhgalas, and more.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {outfits.slice(0, 10).map((outfit) => (
              <div
                key={outfit.id}
                className="flex flex-col items-start gap-1.5 p-4 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-xs text-primary/80 font-medium uppercase tracking-wide">
                  {outfit.gender === "women" ? "Women" : "Men"}
                </span>
                <span className="font-medium text-foreground text-sm">{outfit.label}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {outfit.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Simple, Affordable Pricing
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start free. Upgrade when you love it.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Free tier */}
            <div className="flex flex-col p-6 rounded-2xl border border-border bg-surface">
              <h3 className="font-display font-semibold text-foreground text-lg">Free</h3>
              <p className="text-3xl font-bold text-foreground mt-2">
                ₹0
              </p>
              <p className="text-sm text-muted-foreground mt-1">2 wedding looks</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground flex-1">
                <li>✓ 2 free generations</li>
                <li>✓ All occasions & outfits</li>
                <li>✓ Download with watermark</li>
              </ul>
              <Link
                href="/studio"
                className="mt-6 w-full py-3 text-center border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors text-sm"
              >
                Try Free
              </Link>
            </div>
            {/* Paid tiers */}
            {paymentsConfig.products.map((product, i) => (
              <div
                key={product.id}
                className={`flex flex-col p-6 rounded-2xl border bg-surface ${
                  i === 1 ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                }`}
              >
                {i === 1 && (
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Most Popular</span>
                )}
                <h3 className="font-display font-semibold text-foreground text-lg">{product.name}</h3>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {formatINR(product.razorpay.amount)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{product.looks} wedding looks</p>
                <p className="text-xs text-muted-foreground mt-2">{product.description}</p>
                <div className="flex-1" />
                <Link
                  href="/studio"
                  className={`mt-6 w-full py-3 text-center font-medium rounded-xl text-sm transition-opacity ${
                    i === 1
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              {faqContent.title}
            </h2>
          </div>
          <div className="space-y-4">
            {faqContent.items.map((item, i) => (
              <details key={i} className="group rounded-2xl border border-border bg-surface">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-foreground text-sm pr-4">{item.question}</span>
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            {cta.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            {cta.supporting}
          </p>
          <Link
            href={cta.button.href}
            className="inline-flex items-center justify-center mt-8 px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {cta.button.label}
          </Link>
        </div>
      </section>
    </>
  );
}
