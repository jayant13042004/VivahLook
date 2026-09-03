import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: aboutContent.title,
  description: aboutContent.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section>
      <PageHeader
        title={aboutContent.title}
        description={aboutContent.intro}
      />

      <div className="mt-14 grid gap-10 max-w-3xl">
        {aboutContent.sections.map((section) => (
          <article key={section.title} className="border-t border-border pt-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
