export type Base64Result = { ok: true; output: string } | { ok: false; error: string };

export function decodeBase64(input: string): Base64Result {
  if (!input.trim()) return { ok: false, error: "Paste Base64 text to decode it." };
  try {
    const binary = atob(input.trim());
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return { ok: true, output: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch { return { ok: false, error: "This is not valid UTF-8 Base64 text." }; }
}
