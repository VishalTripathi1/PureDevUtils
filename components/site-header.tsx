"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { ScrollLink } from "./scroll-link";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell nav">
        <BrandMark />
        <nav aria-label="Primary">
          <ScrollLink targetId="json-tools">All tools</ScrollLink>
          <Link href="/tutorials">Tutorials</Link>
          <Link href="/privacy" aria-current={pathname === "/privacy" ? "page" : undefined}>
            Privacy
          </Link>
        </nav>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "◐" : "☼"}
        </button>
      </div>
    </header>
  );
}
