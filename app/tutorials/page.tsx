import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { tutorials } from "@/content/tutorials";
import { buildAbsoluteUrl } from "@/lib/seo";
export const metadata = { title: "Developer Tool Tutorials", description: "Practical guides to bulk UUID generation, nested JSON-to-Java models, and URL encoding with local browser tools.", alternates: { canonical: buildAbsoluteUrl("/tutorials") } };
export default function TutorialsPage() {
  return <><SiteHeader /><main id="main-content" className="shell tool-page"><h1>Developer tool tutorials</h1><p>Working examples, expected output, and limits to check before using the result.</p>{tutorials.map(t => <section className="tool-content" key={t.slug}><h2><Link href={`/tutorials/${t.slug}`}>{t.title}</Link></h2><p>{t.description}</p></section>)}</main></>;
}
