import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { modulesConfig } from "@/config/modules";
import { siteConfig } from "@/config/site";
import { getBlogPost, getBlogPosts } from "@/lib/blog/posts";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/seo/schema";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  if (!modulesConfig.blog) return [];
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return buildMetadata({ title: "Post not found", path: "/blog", noIndex: true });
  }
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.date || undefined,
    keywords: post.keywords,
    authors: [siteConfig.creator],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!modulesConfig.blog) notFound();
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <Section>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          date: post.date,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <p className="text-sm text-muted-foreground">{post.date}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{post.description}</p>
      <Prose className="mt-10">
        <MarkdownBody markdown={post.content} />
      </Prose>
    </Section>
  );
}
