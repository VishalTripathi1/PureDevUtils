import { describe, expect, it } from "vitest";
import { getSitemapXml, getRobotsTxt, buildToolUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { tools } from "@/tools/registry";

describe("SEO helpers", () => {
  it("builds tool URLs with the production origin", () => {
    expect(buildToolUrl("json-formatter")).toBe("https://puredevutils.com/tools/json-formatter");
  });

  it("returns valid sitemap XML containing tool URLs", () => {
    const xml = getSitemapXml();
    expect(xml).toContain("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
    expect(xml).toContain(siteConfig.url);
    expect(tools.slice(0, 3).every((tool) => xml.includes(buildToolUrl(tool.slug)))).toBe(true);
  });

  it("returns robots.txt with a sitemap reference", () => {
    const robots = getRobotsTxt();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://puredevutils.com/sitemap.xml");
  });
});
