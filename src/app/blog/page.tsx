import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { modulesConfig } from "@/config/modules";
import { getBlogPosts } from "@/lib/blog/posts";
import { buildMetadata } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/seo/schema";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notes from Personal Launch Engine.",
  path: "/blog",
});

export default function BlogIndexPage() {
  if (!modulesConfig.blog) notFound();
  const posts = getBlogPosts();

  return (
    <Section>
      <JsonLd
        data={collectionPageSchema({
          name: "Blog",
          description: "Notes from Personal Launch Engine.",
          path: "/blog",
        })}
      />
      <PageHeader
        title="Blog"
        description="Short posts you can replace or extend. Files live in src/content/blog."
      />
      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">No published posts yet.</p>
      ) : (
        <ul className="mt-12 max-w-2xl space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <h2 className="mt-2 font-display text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted-foreground">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
