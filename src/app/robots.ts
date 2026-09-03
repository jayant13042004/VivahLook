import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...seoConfig.disallow],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
