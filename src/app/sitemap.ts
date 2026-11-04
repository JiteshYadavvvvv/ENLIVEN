import type { MetadataRoute } from "next";

/**
 * Next.js App Router sitemap — served at /sitemap.xml
 * Update lastModified whenever content changes significantly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://enlivenn.tech/",
      lastModified: new Date("2026-11-04"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
