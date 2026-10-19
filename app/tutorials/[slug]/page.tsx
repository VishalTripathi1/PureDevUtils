import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { tutorials, tutorialReferences } from "@/content/tutorials";
import { buildAbsoluteUrl } from "@/lib/seo";
import { getTool } from "@/tools/registry";
type Props = { params: Promise<{slug: string}> };
export function generateStaticParams() { return tutorials.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const t = tutorials.find(item => item.slug === slug);
  if (!t) return {};
  return { title: t.title, description: t.description, alternates: { canonical: buildAbsoluteUrl(`/tutorials/${slug}`) }, openGraph: { title: t.title, description: t.description, url: buildAbsoluteUrl(`/tutorials/${slug}`), siteName: "PureDevUtils", type: "article" } };
}
export default async function TutorialPage({params}: Props) {
  const {slug} = await params; const t = tutorials.find(item => item.slug === slug); if (!t) notFound();
  return <><SiteHeader /><main id="main-content" className="shell tool-page tutorial"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/tutorials">Tutorials</Link></nav><h1>{t.title}</h1><p>{t.description}</p><p><Link className="primary-button" href={`/tools/${t.tool}`}>Open {getTool(t.tool)?.name}</Link></p>{t.sections.map(section => <section className="tool-content" key={section.title}><h2>{section.title}</h2><p>{section.text}</p>{section.code && <pre>{section.code}</pre>}</section>)}{t.tool === "url-encoder" && <p><Link href="/tools/url-decoder">Decode percent-encoded text with URL Decoder</Link></p>}<p><Link href={`/tools/${t.tool}`}>Try these examples in {getTool(t.tool)?.name}</Link></p><section className="tool-content"><h2>API references</h2><ul>{tutorialReferences[t.slug].map(ref => <li key={ref.url}><a href={ref.url}>{ref.title}</a></li>)}</ul></section><Link href="/tutorials">Browse all tutorials</Link></main></>;
}
