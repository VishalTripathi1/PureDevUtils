import { tutorials } from "@/content/tutorials";
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
  return [siteConfig.url, buildAbsoluteUrl("/privacy"), buildAbsoluteUrl("/tutorials"), ...tools.map((tool) => buildToolUrl(tool.slug)), ...tutorials.map(t => buildAbsoluteUrl(`/tutorials/${t.slug}`))];
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
    description: siteConfig.description,

  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: buildAbsoluteUrl("/brand.svg"),
  };
}

export function getFaqJsonLd(tool: ToolDefinition) {
  if (tool.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getSoftwareApplicationJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: buildToolUrl(tool.slug),
    description: tool.metaDescription,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (runs in browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
