import { describe, expect, it } from "vitest";
import { jsonToCsv } from "./logic";

describe("jsonToCsv", () => {
  it("converts object arrays and flattens nested values", () => expect(jsonToCsv('[{"name":"Ada","meta":{"active":true}}]')).toEqual({ ok: true, output: "name,meta.active\nAda,true" }));
  it("escapes CSV cells", () => expect(jsonToCsv('[{"note":"one, two"}]')).toEqual({ ok: true, output: 'note\n"one, two"' }));
  it("guards against formula injection in leading =, +, -, @", () => {
    expect(jsonToCsv('[{"note":"=SUM(A1:A9)"}]')).toEqual({ ok: true, output: "note\n'=SUM(A1:A9)" });
    expect(jsonToCsv('[{"note":"+1+1"}]')).toEqual({ ok: true, output: "note\n'+1+1" });
    expect(jsonToCsv('[{"note":"@SUM(A1)"}]')).toEqual({ ok: true, output: "note\n'@SUM(A1)" });
    expect(jsonToCsv('[{"note":"-1"}]')).toEqual({ ok: true, output: "note\n'-1" });
  });
  it("rejects non-array input", () => expect(jsonToCsv("{}").ok).toBe(false));
});
