import type { MetadataRoute } from "next";

/**
 * Next.js App Router robots — served at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://enlivenn.tech/sitemap.xml",
    host: "https://enlivenn.tech",
  };
}
