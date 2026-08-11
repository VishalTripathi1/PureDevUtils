import { describe, expect, it } from "vitest";
import { csvToJson, parseCsv } from "./logic";

describe("csvToJson", () => {
  it("converts CSV rows to JSON objects", () => expect(csvToJson("name,age\nAda,36")).toEqual({ ok: true, output: '[\n  {\n    "name": "Ada",\n    "age": "36"\n  }\n]' }));
  it("parses quoted commas and quotes", () => expect(parseCsv('note\n"Hello, ""Ada"""')).toEqual([["note"], ['Hello, "Ada"']]));
  it("rejects duplicate headers", () => expect(csvToJson("name,name\nAda,Lovelace").ok).toBe(false));
});
