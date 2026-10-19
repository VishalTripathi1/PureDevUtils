import type { MetadataRoute } from "next";
import { getSitemapUrls } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  // All listed pages were revised with this release. Update only for substantive edits.
  return getSitemapUrls().map(url => ({ url, lastModified: "2026-10-19" }));
}
