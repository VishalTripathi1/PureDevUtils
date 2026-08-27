import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ToolPage } from "@/components/tool-page";
import { getTool, tools } from "@/tools/registry";
import {
  buildToolUrl,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getSoftwareApplicationJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  const url = buildToolUrl(tool.slug);
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolRoute({ params }: PageProps) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const faqJsonLd = getFaqJsonLd(tool);
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json">
        {JSON.stringify(getBreadcrumbJsonLd(tool))}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(getSoftwareApplicationJsonLd(tool))}
      </script>
      {faqJsonLd && (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      )}
      <ToolPage tool={tool} />
    </>
  );
}
