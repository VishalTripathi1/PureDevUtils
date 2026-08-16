import type { MetadataRoute } from "next";
import { getSitemapUrls } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapUrls().map((url) => ({
    url,
  }));
}