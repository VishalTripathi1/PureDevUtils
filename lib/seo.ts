import { tools } from "@/tools/registry";
import { siteConfig } from "@/config/site";
import type { ToolDefinition } from "@/tools/types";

export function buildAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function buildToolUrl(slug: string) {
  return buildAbsoluteUrl(`/tools/${slug}`);
}

export function getSitemapUrls() {
  return [siteConfig.url, ...tools.map((tool) => buildToolUrl(tool.slug))];
}

export function getSitemapXml() {
  const urls = getSitemapUrls();
  const entries = urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

export function getRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${buildAbsoluteUrl("/sitemap.xml")}`;
}

export function getHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function getBreadcrumbJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Developer Tools",
        item: buildAbsoluteUrl("/#json-tools"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: buildToolUrl(tool.slug),
      },
    ],
  };
}
