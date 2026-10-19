export type UrlMode = "component" | "url";
export type UrlResult = { ok: true; output: string } | { ok: false; error: string };
export function encodeUrl(input: string, mode: UrlMode = "component"): UrlResult {
  try { return { ok: true, output: mode === "url" ? encodeURI(input) : encodeURIComponent(input) }; }
  catch { return { ok: false, error: "Input contains an unpaired Unicode surrogate. Replace the invalid character and try again." }; }
}
