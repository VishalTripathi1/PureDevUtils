import { describe, expect, it } from "vitest";
import { jsonToYaml } from "./logic";

describe("jsonToYaml", () => {
  it("converts nested JSON", () => expect(jsonToYaml('{"name":"Ada","tags":["math",true]}')).toEqual({ ok: true, output: 'name: "Ada"\ntags:\n  - "math"\n  - true' }));
  it("rejects empty input", () => expect(jsonToYaml(" ").ok).toBe(false));
  it("quotes unsafe keys", () => expect(jsonToYaml('{"a key":1}')).toEqual({ ok: true, output: '"a key": 1' }));
});
