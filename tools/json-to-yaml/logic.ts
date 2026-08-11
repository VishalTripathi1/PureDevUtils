export type ConvertResult = { ok: true; output: string } | { ok: false; error: string };

function scalar(value: string | number | boolean | null) {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}

function toYaml(value: unknown, depth = 0): string {
  const indent = "  ".repeat(depth);
  if (value === null || typeof value !== "object") return scalar(value as string | number | boolean | null);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value.map((item) => {
      if (item !== null && typeof item === "object") return `${indent}-\n${toYaml(item, depth + 1)}`;
      return `${indent}- ${toYaml(item, depth + 1)}`;
    }).join("\n");
  }
  const entries = Object.entries(value);
  if (entries.length === 0) return "{}";
  return entries.map(([key, item]) => {
    const safeKey = /^[A-Za-z_][\w-]*$/.test(key) ? key : JSON.stringify(key);
    if (item !== null && typeof item === "object") return `${indent}${safeKey}:\n${toYaml(item, depth + 1)}`;
    return `${indent}${safeKey}: ${toYaml(item, depth + 1)}`;
  }).join("\n");
}

export function jsonToYaml(input: string): ConvertResult {
  if (!input.trim()) return { ok: false, error: "Paste JSON to convert it." };
  try { return { ok: true, output: toYaml(JSON.parse(input)) }; } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Invalid JSON." }; }
}
