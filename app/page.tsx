import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { tools } from "@/tools/registry";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="shell home">
        <p className="eyebrow">Developer utilities, made local</p>
        <h1>Focused tools for everyday development work.</h1>
        <p className="lede">Run useful transformations directly in your browser. Your input stays on your device.</p>
        <section aria-labelledby="json-tools">
          <div className="section-heading"><h2 id="json-tools">JSON tools</h2><span>{tools.length} available</span></div>
          <div className="tool-grid">
            {tools.map((tool) => (
              <Link className="tool-card" href={`/tools/${tool.slug}`} key={tool.slug}>
                <span className="tool-icon">{tool.icon}</span>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="card-link">Open tool <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
