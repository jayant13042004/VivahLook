import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { modulesConfig } from "@/config/modules";
import { topicPages } from "@/content/topics";
import { buildMetadata } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Topics",
  description: "Programmatic landing pages generated from a content list.",
  path: "/topics",
});

export default function TopicsIndexPage() {
  if (!modulesConfig.seoProfile) notFound();

  return (
    <Section>
      <JsonLd
        data={collectionPageSchema({
          name: "Topics",
          description: "Programmatic landing pages generated from a content list.",
          path: "/topics",
        })}
      />
      <PageHeader
        title="Topics"
        description="Add an object in src/content/topics.ts to create a new indexed page. No extra route files required."
      />
      <ul className="mt-12 max-w-2xl space-y-8">
        {topicPages.map((topic) => (
          <li key={topic.slug} className="border-t border-border pt-8">
            <h2 className="font-display text-xl font-semibold">
              <Link href={`/topics/${topic.slug}`} className="hover:underline">
                {topic.title}
              </Link>
            </h2>
            <p className="mt-2 text-muted-foreground">{topic.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
