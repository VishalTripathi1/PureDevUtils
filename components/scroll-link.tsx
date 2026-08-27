"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

// A link that scrolls to an in-page section instead of navigating with a
// URL hash. If we're already on "/", it scrolls immediately. If we're on
// another page (a tool page, /privacy), it stashes the target and does a
// real navigation to "/", where ScrollTargetHandler picks it up and
// finishes the scroll. The address bar never shows a #hash either way.
export function ScrollLink({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      sessionStorage.setItem("scrollTarget", targetId);
      router.push("/");
    }
  }

  return (
    <Link href={`/#${targetId}`} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
