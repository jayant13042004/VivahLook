import { FaqList } from "@/components/content/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { faqContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: faqContent.title,
  description: faqContent.description,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <Section>
      <JsonLd data={faqPageSchema(faqContent.items)} />
      <PageHeader
        title={faqContent.title}
        description={faqContent.description}
      />
      <div className="mt-12 max-w-3xl">
        <FaqList items={faqContent.items} />
      </div>
    </Section>
  );
}
