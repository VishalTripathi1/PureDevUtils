import { toolGuides } from "@/content/tool-guides";
import { tutorials } from "@/content/tutorials";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { ToolDefinition } from "@/tools/types";

export function ToolPage({ tool }: { tool: ToolDefinition }) {
  const guide = toolGuides[tool.slug];
  const tutorial = tutorials.find(item => item.slug === guide.tutorial);
  const ToolInterface = tool.Interface;
  return (
    <main id="main-content" className="shell tool-page">
      <div className="breadcrumbs">
        <Link href="/">{siteConfig.name}</Link>
        <span>/</span>
        <Link href="/#json-tools">Developer Tools</Link>
        <span>/</span>
        <span>{tool.name}</span>
      </div>
      <header className="tool-hero">
        <p className="eyebrow">{tool.category}</p>
        <h1>{tool.name}</h1>
        <p>{tool.description}</p>
      </header>
      <aside id="privacy" className="privacy-note">
        <span aria-hidden="true">⌁</span>Your data is processed locally in your
        browser and is not uploaded to our servers.
      </aside>
      <ToolInterface />
      <section className="tool-content" aria-labelledby="about-tool">
        <h2 id="about-tool">What is {tool.name}?</h2>
        <p>{tool.longDescription}</p>
      </section>
      <section className="tool-content" aria-labelledby="how-to-use">
        <h2 id="how-to-use">How to use {tool.name}</h2>
        <ol>
          {guide.steps.map(step => <li key={step}>{step}</li>)}
        </ol>
      </section>
      <section className="tool-content"><h2>Example</h2><pre>{guide.example}</pre></section>
      <section className="tool-content"><h2>Limitations and details</h2><p>{guide.limitations}</p></section>
      {tutorial && <section className="tool-content"><h2>Practical guide</h2><Link href={`/tutorials/${tutorial.slug}`}>{tutorial.title}</Link></section>}
      <section className="faq" aria-labelledby="faq">
        <h2 id="faq">Frequently asked questions</h2>
        {tool.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
      {tool.relatedTools.length > 0 && (
        <section className="related" aria-labelledby="related-tools">
          <h2 id="related-tools">Related tools</h2>
          <div>
            {tool.relatedTools.map((related) => (
              <Link href={`/tools/${related.slug}`} key={related.slug}>
                {related.name} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
