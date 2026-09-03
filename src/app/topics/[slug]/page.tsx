import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/content/FaqList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { modulesConfig } from "@/config/modules";
import { getTopic, topicPages } from "@/content/topics";
import { buildMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/seo/schema";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  if (!modulesConfig.seoProfile) return [];
  return topicPages.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic || !modulesConfig.seoProfile) {
    return buildMetadata({ title: "Topic not found", path: "/topics", noIndex: true });
  }
  return buildMetadata({
    title: topic.title,
    description: topic.description,
    path: `/topics/${topic.slug}`,
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  if (!modulesConfig.seoProfile) notFound();
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const path = `/topics/${topic.slug}`;

  return (
    <Section>
      {topic.faqs?.length ? <JsonLd data={faqPageSchema(topic.faqs)} /> : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Topics", path: "/topics" },
          { name: topic.title, path },
        ]}
      />
      <PageHeader title={topic.title} description={topic.description} />
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {topic.intro}
      </p>
      <div className="mt-14 grid max-w-3xl gap-10">
        {topic.sections.map((section) => (
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
      {topic.faqs?.length ? (
        <div className="mt-14 max-w-3xl">
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground">FAQ</h2>
          <FaqList items={topic.faqs} />
        </div>
      ) : null}
    </Section>
  );
}
