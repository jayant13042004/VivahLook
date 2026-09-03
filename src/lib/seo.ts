import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  keywords?: string[];
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

/** Build consistent page metadata from site config + page overrides. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
  keywords,
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} · ${siteConfig.shortName}`
    : `${siteConfig.name} · ${siteConfig.tagline}`;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description,
    keywords: keywords?.length ? keywords : undefined,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: ogType,
      images: siteConfig.ogImage
        ? [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }]
        : undefined,
      ...(ogType === "article"
        ? {
            ...(publishedTime
              ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
              : {}),
            ...(authors?.length ? { authors } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    creator: siteConfig.creator,
  };
}
