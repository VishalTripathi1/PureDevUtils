export type ConvertResult = { ok: true; output: string } | { ok: false; error: string };

export function parseCsv(input: string): string[][] {
  const rows: string[][] = [[]]; let value = ""; let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted && character === '"' && input[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { rows.at(-1)?.push(value); value = ""; }
    else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && input[index + 1] === "\n") index += 1;
      rows.at(-1)?.push(value); rows.push([]); value = "";
    } else value += character;
  }
  if (quoted) throw new Error("CSV has an unclosed quoted value.");
  rows.at(-1)?.push(value);
  return rows.filter((row) => row.length > 1 || row[0] !== "");
}

export function csvToJson(input: string): ConvertResult {
  if (!input.trim()) return { ok: false, error: "Paste CSV to convert it." };
  try {
    const [headers, ...data] = parseCsv(input);
    if (!headers?.length || headers.some((header) => !header.trim())) return { ok: false, error: "The CSV header row must contain a name for every column." };
    if (new Set(headers).size !== headers.length) return { ok: false, error: "CSV header names must be unique." };
    return { ok: true, output: JSON.stringify(data.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""]))), null, 2) };
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Invalid CSV." }; }
}
