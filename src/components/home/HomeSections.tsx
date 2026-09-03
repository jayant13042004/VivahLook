import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeContent } from "@/content/pages";

export function HomeFeatures() {
  const { features } = homeContent;

  return (
    <Section>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {features.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {features.supporting}
        </p>
      </div>

      <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {features.items.map((item, index) => (
          <li key={item.title} className="border-t border-border pt-6">
            <p className="text-sm font-medium text-primary">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function HomeCta() {
  const { cta } = homeContent;

  return (
    <Section className="pb-24">
      <div className="rounded-lg border border-border bg-surface px-6 py-10 sm:px-10 sm:py-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            {cta.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {cta.supporting}
          </p>
          <Button href={cta.button.href} className="mt-8">
            {cta.button.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
