export type ConvertResult = { ok: true; output: string } | { ok: false; error: string };

function flatten(value: unknown, path = "", result: Record<string, string> = {}) {
  if (value === null || typeof value !== "object") { result[path] = value === null ? "" : String(value); return result; }
  if (Array.isArray(value)) { result[path] = JSON.stringify(value); return result; }
  for (const [key, item] of Object.entries(value)) flatten(item, path ? `${path}.${key}` : key, result);
  return result;
}

function escapeCsv(value: string) {
  // Guard against CSV/formula injection: if a cell value starts with =, +,
  // -, or @, spreadsheet apps (Excel, Google Sheets, LibreOffice) can
  // interpret it as a formula when the file is opened, which can run
  // arbitrary commands via DDE. Prefixing with a single quote forces the
  // cell to be read as plain text while keeping the visible value intact.
  const guarded = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\n\r]/.test(guarded) ? `"${guarded.replaceAll('"', '""')}"` : guarded;
}

export function jsonToCsv(input: string): ConvertResult {
  if (!input.trim()) return { ok: false, error: "Paste a JSON array to convert it." };
  try {
    const parsed: unknown = JSON.parse(input);
    if (!Array.isArray(parsed)) return { ok: false, error: "JSON → CSV requires a top-level array of objects." };
    if (!parsed.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) return { ok: false, error: "Each array item must be an object." };
    const rows = parsed.map((item) => flatten(item));
    const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
    if (columns.length === 0) return { ok: true, output: "" };
    return { ok: true, output: [columns.map(escapeCsv).join(","), ...rows.map((row) => columns.map((column) => escapeCsv(row[column] ?? "")).join(","))].join("\n") };
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Invalid JSON." }; }
}
