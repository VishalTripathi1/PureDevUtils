import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ScrollLink } from "@/components/scroll-link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Find the developer tool you're looking for on PureDevUtils.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="shell tool-page">
        <div className="breadcrumbs">
          <Link href="/">{siteConfig.name}</Link>
          <span>/</span>
          <span>404</span>
        </div>

        <header className="tool-hero">
          <p className="eyebrow">Error 404</p>
          <h1>This page doesn&apos;t exist</h1>
          <p>
            The URL might be mistyped, or the tool may have moved. Head back
            to the homepage or jump straight to the full list of tools.
          </p>
        </header>

        <div className="button-row">
          <Link href="/" className="primary-button">
            Go home
          </Link>
          <ScrollLink targetId="json-tools" className="primary-button">
            Browse tools
          </ScrollLink>
        </div>
      </main>
    </>
  );
}
