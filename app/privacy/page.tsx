import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/seo";

const title = "Privacy Policy";
const description =
  "How PureDevUtils handles your data: every tool runs entirely in your browser, your input is never uploaded, and only anonymous analytics are collected.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/privacy") },
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: buildAbsoluteUrl("/privacy"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${siteConfig.name}`,
    description,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="shell tool-page">
        <div className="breadcrumbs">
          <Link href="/">{siteConfig.name}</Link>
          <span>/</span>
          <span>Privacy</span>
        </div>

        <header className="tool-hero">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>
          <p>
            PureDevUtils is built so that your data never has to leave your
            device. This page explains exactly what that means in practice.
          </p>
        </header>

        <section className="tool-content" aria-labelledby="what-we-dont-collect">
          <h2 id="what-we-dont-collect">What we don&apos;t collect</h2>
          <p>
            Every tool on this site — JSON formatting, validation, Base64
            encoding, JWT decoding, CSV conversion, and the rest — runs
            entirely in your browser using JavaScript. The text, files, or
            tokens you paste into a tool are processed locally on your device
            and are never sent to our servers, stored, or logged. We have no
            way to see what you type into any tool.
          </p>
        </section>

        <section className="tool-content" aria-labelledby="what-we-do-collect">
          <h2 id="what-we-do-collect">What we do collect</h2>
          <p>
            We use Google Analytics to understand aggregate traffic, such as
            which tools are popular and roughly where visitors come from.
            This is standard, anonymized web analytics — it does not capture
            anything you type into a tool, and it is not tied to your
            identity. You can block this with a browser extension or
            tracking-protection setting, and every tool will continue to work
            normally.
          </p>
        </section>

        <section className="tool-content" aria-labelledby="cookies">
          <h2 id="cookies">Cookies</h2>
          <p>
            Google Analytics may set cookies in your browser to distinguish
            unique visits. We do not set any first-party cookies of our own,
            and no cookie is used to store or transmit the content of your
            input.
          </p>
        </section>

        <section className="tool-content" aria-labelledby="third-parties">
          <h2 id="third-parties">Third parties</h2>
          <p>
            The only third-party service used on this site is Google
            Analytics. We do not sell, share, or otherwise transmit your tool
            input to any third party, because it never leaves your browser in
            the first place.
          </p>
        </section>

        <section className="tool-content" aria-labelledby="changes">
          <h2 id="changes">Changes to this policy</h2>
          <p>
            If our data practices change, this page will be updated to
            reflect that. Since PureDevUtils has no accounts and no way to
            contact individual users, we recommend checking back here
            periodically if this matters to you.
          </p>
        </section>

        <section className="tool-content" aria-labelledby="contact">
          <h2 id="contact">Questions</h2>
          <p>
            If you have questions about how this site handles data, you can
            verify the behavior yourself: every tool runs client-side, and
            the source is auditable. Nothing described above requires you to
            take our word for it.
          </p>
        </section>
      </main>
    </>
  );
}
