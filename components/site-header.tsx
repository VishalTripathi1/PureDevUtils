"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useTheme } from "./theme-provider";

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  return <header className="site-header"><div className="shell nav"><Link href="/" className="brand"><span>&lt;/&gt;</span>{siteConfig.shortName}</Link><nav aria-label="Primary"><Link href="/#json-tools">JSON tools</Link><a href="#privacy">Privacy</a></nav><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>{theme === "light" ? "◐" : "☼"}</button></div></header>;
}
