import type { MetadataRoute } from "next";
import { modulesConfig } from "@/config/modules";
import { getAllNavItems } from "@/config/navigation";
import { topicPages } from "@/content/topics";
import { tools } from "@/content/tools";
import { getBlogPosts } from "@/lib/blog/posts";
import { absoluteUrl } from "@/lib/seo";

/** Single sitemap builder — used by app/sitemap.ts. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const nav = Array.from(new Set(getAllNavItems().map((item) => item.href))).map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : 0.7,
    }),
  );

  const posts = modulesConfig.blog
    ? getBlogPosts().map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : [];

  if (!modulesConfig.seoProfile) {
    return [...nav, ...posts];
  }

  const toolUrls = [
    {
      url: absoluteUrl("/tools"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...tools.map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const topicUrls = [
    {
      url: absoluteUrl("/topics"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...topicPages.map((topic) => ({
      url: absoluteUrl(`/topics/${topic.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const merged = [...nav, ...posts, ...toolUrls, ...topicUrls];
  const byUrl = new Map<string, (typeof merged)[number]>();
  for (const entry of merged) {
    byUrl.set(entry.url, entry);
  }
  return [...byUrl.values()];
}
