import { describe, expect, it } from "vitest";
import { minifyJson } from "./logic";

describe("minifyJson", () => {
  it("removes insignificant whitespace", () => expect(minifyJson('{\n  "name": "Ada"\n}')).toEqual({ ok: true, output: '{"name":"Ada"}' }));
  it("rejects empty input", () => expect(minifyJson(" ")).toEqual({ ok: false, error: "Paste JSON to minify it." }));
  it("rejects invalid JSON", () => expect(minifyJson("{name: 'Ada'}").ok).toBe(false));
});
