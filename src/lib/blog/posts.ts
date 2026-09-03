import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  keywords?: string[];
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parsePost(filename: string): BlogPost | null {
  if (!filename.endsWith(".md")) return null;
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const parsed = matter(raw);
  const title = String(parsed.data.title ?? slug);
  const description = String(parsed.data.description ?? "");
  const date = formatDate(parsed.data.date);
  const published = parsed.data.published !== false;
  const keywords = parseKeywords(parsed.data.keywords);

  return {
    slug,
    title,
    description,
    date,
    published,
    keywords,
    content: parsed.content.trim(),
  };
}

function formatDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

function parseKeywords(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const list = value.map(String).filter(Boolean);
    return list.length ? list : undefined;
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return undefined;
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .map(parsePost)
    .filter((post): post is BlogPost => Boolean(post && post.published))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | null {
  return getBlogPosts().find((post) => post.slug === slug) ?? null;
}
