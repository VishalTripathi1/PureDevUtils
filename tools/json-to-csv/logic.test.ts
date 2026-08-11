import { describe, expect, it } from "vitest";
import { jsonToCsv } from "./logic";

describe("jsonToCsv", () => {
  it("converts object arrays and flattens nested values", () => expect(jsonToCsv('[{"name":"Ada","meta":{"active":true}}]')).toEqual({ ok: true, output: "name,meta.active\nAda,true" }));
  it("escapes CSV cells", () => expect(jsonToCsv('[{"note":"one, two"}]')).toEqual({ ok: true, output: 'note\n"one, two"' }));
  it("rejects non-array input", () => expect(jsonToCsv("{}").ok).toBe(false));
});
