"use client";

import { useEffect } from "react";

// Companion to the header's "JSON tools" link. When that link is clicked
// from a page other than the homepage, we can't smooth-scroll immediately
// because the target section doesn't exist yet — so we stash the target id
// in sessionStorage, navigate to "/", and this component (mounted on the
// homepage) picks it up and scrolls once the page is ready. The URL never
// gains a #hash at any point in the flow.
export function ScrollTargetHandler() {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");
    const el = document.getElementById(target);
    if (el) {
      // Let the page finish its initial layout pass before scrolling.
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);
  return null;
}
