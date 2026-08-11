export type MinifyResult = { ok: true; output: string } | { ok: false; error: string };

export function minifyJson(input: string): MinifyResult {
  if (!input.trim()) return { ok: false, error: "Paste JSON to minify it." };
  try {
    return { ok: true, output: JSON.stringify(JSON.parse(input)) };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Invalid JSON." };
  }
}
