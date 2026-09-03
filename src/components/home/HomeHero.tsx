import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeContent } from "@/content/pages";

/** Landing hero — brand-first, one headline, one supporting line, CTAs. */
export function HomeHero() {
  const { hero } = homeContent;

  return (
    <section className="relative overflow-hidden site-atmosphere">
      <div
        className="pointer-events-none absolute inset-0 site-grid opacity-60"
        aria-hidden="true"
      />
      <Section className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="animate-fade-up font-display text-sm font-semibold tracking-[0.18em] text-primary uppercase">
            {hero.brand}
          </p>
          <h1 className="animate-fade-up animation-delay-100 mt-5 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="animate-fade-up animation-delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {hero.supporting}
          </p>
          <div className="animate-fade-up animation-delay-300 mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Section>
    </section>
  );
}
