export type Base64Result = { ok: true; output: string } | { ok: false; error: string };

export function encodeBase64(input: string): Base64Result {
  try {
    const bytes = new TextEncoder().encode(input);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { ok: true, output: btoa(binary) };
  } catch { return { ok: false, error: "Unable to encode this input as Base64." }; }
}
