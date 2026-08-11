export type UrlResult = { ok: true; output: string } | { ok: false; error: string };
export function encodeUrl(input: string): UrlResult { return { ok: true, output: encodeURIComponent(input) }; }
