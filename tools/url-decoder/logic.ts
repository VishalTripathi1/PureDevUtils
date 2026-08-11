export type UrlResult = { ok: true; output: string } | { ok: false; error: string };
export function decodeUrl(input: string): UrlResult {
  if (!input.trim()) return { ok: false, error: "Paste URL-encoded text to decode it." };
  try { return { ok: true, output: decodeURIComponent(input) }; } catch { return { ok: false, error: "This contains an invalid percent-encoded sequence." }; }
}
