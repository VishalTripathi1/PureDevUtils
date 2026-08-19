"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useTheme } from "./theme-provider";

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  function handleJsonToolsClick(e: React.MouseEvent) {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("json-tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      sessionStorage.setItem("scrollTarget", "json-tools");
      router.push("/");
    }
  }

  return <header className="site-header"><div className="shell nav"><Link href="/" className="brand"><span>&lt;/&gt;</span>{siteConfig.shortName}</Link><nav aria-label="Primary"><Link href="/#json-tools" onClick={handleJsonToolsClick}>JSON tools</Link><Link href="/privacy">Privacy</Link></nav><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>{theme === "light" ? "◐" : "☼"}</button></div></header>;
}
