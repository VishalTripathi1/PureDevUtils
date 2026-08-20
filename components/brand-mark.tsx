import Link from "next/link";
import { siteConfig } from "@/config/site";

// A bold "P" monogram — single, unambiguous letterform (same treatment as
// GitHub/Vercel-style single-letter marks), avoids the readability issues
// of packing multiple symbol characters into a small badge.
export function BrandMark() {
  return (
    <Link href="/" className="brand">
      <span className="brand-badge" aria-hidden="true">
        P
      </span>
      {siteConfig.shortName}
    </Link>
  );
}
