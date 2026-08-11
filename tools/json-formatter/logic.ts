export type FormatResult = { ok: true; output: string } | { ok: false; error: string };

export function formatJson(input: string, indentation = 2): FormatResult {
  if (!input.trim()) return { ok: false, error: "Paste JSON to format it." };
  try {
    return { ok: true, output: JSON.stringify(JSON.parse(input), null, indentation) };
  } catch (error) {
    const detail = error instanceof Error ? error.message.replace(/^Unexpected token /, "Unexpected character ") : "Invalid JSON.";
    return { ok: false, error: detail };
  }
}
