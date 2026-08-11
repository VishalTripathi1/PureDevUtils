import { describe, expect, it } from "vitest";
import { formatJson } from "./logic";

describe("formatJson", () => {
  it("formats valid JSON with two-space indentation", () => {
    expect(formatJson('{"a":[1,true]}')).toEqual({ ok: true, output: '{\n  "a": [\n    1,\n    true\n  ]\n}' });
  });
  it("returns a helpful empty-input error", () => expect(formatJson("  ")).toEqual({ ok: false, error: "Paste JSON to format it." }));
  it("returns an error for invalid JSON", () => expect(formatJson('{"a":}').ok).toBe(false));
  it("handles a large JSON document", () => {
    const input = JSON.stringify(Array.from({ length: 10000 }, (_, id) => ({ id, active: id % 2 === 0 })));
    const result = formatJson(input);
    expect(result.ok).toBe(true);
    if (result.ok) expect(JSON.parse(result.output)).toHaveLength(10000);
  });
});
