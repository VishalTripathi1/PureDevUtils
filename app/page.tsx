import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { tools } from "@/tools/registry";
import { siteConfig } from "@/config/site";
import { getHomeStructuredData } from "@/lib/seo";

export const metadata = {
  title: "Free Developer Tools & Utilities | PureDevUtils",
  description:
    "PureDevUtils offers browser-based developer utilities for JSON, encoding, decoding, and conversion tasks that run privately in your browser.",
  openGraph: {
    title: "Free Developer Tools & Utilities | PureDevUtils",
    description:
      "PureDevUtils offers browser-based developer utilities for JSON, encoding, decoding, and conversion tasks that run privately in your browser.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json">{JSON.stringify(getHomeStructuredData())}</script>
      <main className="shell home">
        <p className="eyebrow">Developer utilities, made local</p>
        <h1>Developer Tools & Utilities</h1>
        <p className="lede">
          PureDevUtils is a collection of browser-based developer tools for formatting, validating,
          encoding, decoding, and converting data without uploading your input.
        </p>
        <section className="intro-copy">
          <h2>Developer utilities for JSON, JWT, URL, Base64, UUID, CSV, and more</h2>
          <p>
            Use the tools directly in your browser for fast, private results. Every tool is built to keep
            your data on your device and reduce unnecessary network exposure.
          </p>
        </section>
        <section aria-labelledby="json-tools">
          <div className="section-heading">
            <h2 id="json-tools">Popular developer tools</h2>
            <span>{tools.length} available</span>
          </div>
          <div className="tool-grid">
            {tools.map((tool) => (
              <Link className="tool-card" href={`/tools/${tool.slug}`} key={tool.slug}>
                <span className="tool-icon">{tool.icon}</span>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="card-link">{tool.name} tool <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
