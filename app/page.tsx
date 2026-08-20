import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ScrollTargetHandler } from "@/components/scroll-target-handler";
import { tools } from "@/tools/registry";
import { siteConfig } from "@/config/site";
import { getHomeStructuredData, getOrganizationJsonLd } from "@/lib/seo";

const homeTitle = "Free Developer Tools & Utilities | PureDevUtils";
const homeDescription =
  "Free browser-based developer tools for JSON, JWT, Base64, URL, UUID, and CSV — format, validate, encode, decode, and convert data privately, with nothing uploaded.";

export const metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <ScrollTargetHandler />
      <script type="application/ld+json">{JSON.stringify(getHomeStructuredData())}</script>
      <script type="application/ld+json">{JSON.stringify(getOrganizationJsonLd())}</script>

      <main id="main-content" className="shell home home-hero">
        {/* HERO */}
        <div className="hero-card" role="region" aria-label="Hero">
          <div>
            <p className="eyebrow">Developer utilities, made local</p>

            <h1 className="hero-title">Developer Tools & Utilities</h1>

            <p className="lede hero-lede">
              PureDevUtils is a collection of browser-based developer tools for
              formatting, validating, encoding, decoding, and converting data — all
              without uploading your input.
            </p>

            <div className="hero-cta-row">
              <div className="hero-stat">
                <div className="hero-stat-top">PRIVATE BY DEFAULT</div>
                <div className="hero-stat-bottom">Your input stays on your device.</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-top">BUILT FOR DEV WORKFLOWS</div>
                <div className="hero-stat-bottom">JSON • JWT • URL • Base64 • UUID • CSV.</div>
              </div>
            </div>
          </div>

          <div className="hero-terminal" aria-hidden="true">
            <div className="hero-terminal-bar">
              <span className="hero-terminal-dot" />
              <span className="hero-terminal-dot" />
              <span className="hero-terminal-dot" />
              <span className="hero-terminal-label">json-formatter — local</span>
            </div>
            <div className="hero-terminal-body">
              <div className="comment">{"// paste JSON, nothing leaves the tab"}</div>
              <div><span className="prompt">$</span> paste {"{"}&quot;user&quot;:&quot;alice&quot;,&quot;id&quot;:9241{"}"}</div>
              <div className="out">{"{"}</div>
              <div className="out">&nbsp;&nbsp;&quot;user&quot;: &quot;alice&quot;,</div>
              <div className="out">&nbsp;&nbsp;&quot;id&quot;: 9241</div>
              <div className="out">{"}"}</div>
              <div className="comment">
                {"// formatted in 3ms · 0 bytes uploaded"}
                <span className="hero-terminal-cursor" />
              </div>
            </div>
          </div>
        </div>

        {/* INTRO COPY */}
        <section className="intro-copy modern-intro" aria-label="Intro">
          <h2>Developer utilities for JSON, JWT, URL, Base64, UUID, CSV, and more</h2>
          <p>
            Use the tools directly in your browser for fast, private results. Every tool
            is designed to keep your data local and reduce unnecessary network exposure.
          </p>
        </section>

        {/* TOOLS GRID */}
        <section id="json-tools" aria-labelledby="popular-tools" className="tools-section">
          <div className="section-heading tools-heading">
            <h2 id="popular-tools">Popular developer tools</h2>
            <span>{tools.length} available</span>
          </div>

          <div className="tool-grid tool-grid-modern">
            {tools.map((tool) => (
              <Link
                className="tool-card tool-card-modern"
                href={`/tools/${tool.slug}`}
                key={tool.slug}
              >
                <div className="tool-card-top">
                  <span className="tool-icon" aria-hidden="true">
                    {tool.icon}
                  </span>
                  <span className="tool-pill">Open</span>
                </div>

                <h3>{tool.name}</h3>
                <span className="tool-path" aria-hidden="true">
                  ~/tools/{tool.slug}
                </span>
                <p>{tool.description}</p>

                <span className="card-link">
                  {tool.name} tool <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}