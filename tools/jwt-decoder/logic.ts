export type JwtResult = { ok: true; header: string; payload: string } | { ok: false; error: string };

function decodeSegment(segment: string) {
  const normalized = segment.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(segment.length / 4) * 4, "=");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return JSON.stringify(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)), null, 2);
}

export function decodeJwt(input: string): JwtResult {
  const parts = input.trim().split(".");
  if (parts.length !== 3 || parts.some((part) => !part)) return { ok: false, error: "A JWT must contain header, payload, and signature sections separated by two dots." };
  try { return { ok: true, header: decodeSegment(parts[0]), payload: decodeSegment(parts[1]) }; }
  catch { return { ok: false, error: "The JWT header or payload is not valid Base64URL JSON." }; }
}
