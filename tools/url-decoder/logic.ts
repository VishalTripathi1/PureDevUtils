import type { UrlMode, UrlResult } from "../url-encoder/logic";
export function decodeUrl(input: string, mode: UrlMode = "component"): UrlResult {
  if (!input.trim()) return { ok: false, error: "Paste URL-encoded text to decode it." };
  try { return { ok: true, output: mode === "url" ? decodeURI(input) : decodeURIComponent(input) }; }
  catch { return { ok: false, error: "Invalid percent encoding or UTF-8 sequence. Each % needs two hex digits and bytes must form valid UTF-8." }; }
}
