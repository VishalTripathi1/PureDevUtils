import Link from "next/link";
import { siteConfig } from "@/config/site";
export function BrandMark() {
  return <Link href="/" className="brand"><span className="brand-badge" aria-hidden="true"><svg viewBox="0 0 32 32"><rect x="1" y="1" width="30" height="30" rx="8" fill="#123b43" stroke="#62ddcd" strokeWidth="2"/><path d="m12 9-6 7 6 7m8-14 6 7-6 7" fill="none" stroke="#f5fffc" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="m18 9-4 14" stroke="#62ddcd" strokeWidth="2" strokeLinecap="round"/></svg></span>{siteConfig.shortName}</Link>;
}
