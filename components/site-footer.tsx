import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools } from "@/tools/registry";
import { ScrollLink } from "./scroll-link";
import { BrandMark } from "./brand-mark";

const categoryOrder = [
  "JSON",
  "JSON conversion",
  "Encoding",
  "Authentication",
  "Code generation",
  "Generators",
];

function groupedTools() {
  const groups = new Map<string, typeof tools>();
  for (const category of categoryOrder) groups.set(category, []);
  for (const tool of tools) {
    const list = groups.get(tool.category) ?? [];
    list.push(tool);
    groups.set(tool.category, list);
  }
  return Array.from(groups.entries()).filter(([, list]) => list.length > 0);
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p>
            Browser-based developer tools. Nothing you paste, upload, or
            generate ever leaves your device.
          </p>
          <ScrollLink targetId="json-tools" className="footer-cta">
            Browse all tools →
          </ScrollLink>
        </div>

        {groupedTools().map(([category, list]) => (
          <div className="footer-col" key={category}>
            <h3>{category}</h3>
            <ul>
              {list.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell footer-bottom">
        <span>
          © {year} {siteConfig.name}. Runs entirely in your browser.
        </span>
        <div className="footer-bottom-links">
          <ScrollLink targetId="json-tools">JSON tools</ScrollLink>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
