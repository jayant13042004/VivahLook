import type { MetadataRoute } from "next";
import { getAllNavItems } from "@/config/navigation";
import { absoluteUrl } from "@/lib/seo";

/** Single sitemap builder — used by app/sitemap.ts. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...getAllNavItems().map((item) => item.href),
    "/studio",
  ];

  return Array.from(new Set(routes)).map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : path === "/studio" ? 0.9 : 0.7,
  }));
}
