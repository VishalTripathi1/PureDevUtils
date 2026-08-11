export type DiffKind = "added" | "removed" | "changed";
export type DiffEntry = { path: string; kind: DiffKind; left?: unknown; right?: unknown };
export type DiffResult = { ok: true; entries: DiffEntry[] } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function walk(left: unknown, right: unknown, path: string, entries: DiffEntry[]) {
  if (Object.is(left, right)) return;
  if (Array.isArray(left) && Array.isArray(right)) {
    const length = Math.max(left.length, right.length);
    for (let index = 0; index < length; index += 1) walk(left[index], right[index], `${path}[${index}]`, entries);
    return;
  }
  if (isRecord(left) && isRecord(right)) {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    for (const key of [...keys].sort()) {
      const nextPath = path ? `${path}.${key}` : key;
      if (!(key in left)) entries.push({ path: nextPath, kind: "added", right: right[key] });
      else if (!(key in right)) entries.push({ path: nextPath, kind: "removed", left: left[key] });
      else walk(left[key], right[key], nextPath, entries);
    }
    return;
  }
  if (left === undefined) entries.push({ path, kind: "added", right });
  else if (right === undefined) entries.push({ path, kind: "removed", left });
  else entries.push({ path, kind: "changed", left, right });
}

export function diffJson(leftInput: string, rightInput: string): DiffResult {
  if (!leftInput.trim() || !rightInput.trim()) return { ok: false, error: "Paste JSON into both inputs to compare them." };
  try {
    const entries: DiffEntry[] = [];
    walk(JSON.parse(leftInput), JSON.parse(rightInput), "root", entries);
    return { ok: true, entries };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? `Cannot compare invalid JSON: ${error.message}` : "Cannot compare invalid JSON." };
  }
}

export function displayValue(value: unknown) {
  return JSON.stringify(value);
}
