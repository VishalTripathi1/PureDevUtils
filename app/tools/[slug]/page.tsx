import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ToolPage } from "@/components/tool-page";
import { getTool, tools } from "@/tools/registry";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  const url = `/tools/${tool.slug}`;
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: tool.metaTitle, description: tool.metaDescription, url, type: "website" },
  };
}

export default async function ToolRoute({ params }: PageProps) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  return <><SiteHeader /><ToolPage tool={tool} /></>;
}
