import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
};

/** Shared layout for Privacy / Terms style pages. */
export function LegalPage({
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <Section>
      <PageHeader title={title} description={description} />
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>
      <Prose className="mt-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </Prose>
    </Section>
  );
}
