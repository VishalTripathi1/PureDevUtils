import { describe, expect, it } from "vitest";
import { generateUuid } from "./logic";
describe("generateUuid", () => { it("creates an RFC 4122 version 4 UUID", () => expect(generateUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)); });
import { vi } from "vitest";
import { generateUuids, validateQuantity, serializeUuids } from "./logic";
it("validates bulk quantities before generation", () => {
  for (const value of ["", " ", "0", "-1", "1.5", "1e2", "1001", "NaN"]) expect(() => validateQuantity(value)).toThrow();
  expect(validateQuantity("1000")).toBe(1000);
  const values = generateUuids(100);
  expect(values).toHaveLength(100);
  expect(new Set(values).size).toBe(100);
  expect(values.every(v => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))).toBe(true);
});
it("fails without secure randomness and serializes exports", () => {
  vi.stubGlobal("crypto",{});
  try { expect(() => generateUuids(1)).toThrow(/Secure/); } finally { vi.unstubAllGlobals(); }
  expect(serializeUuids(["a","b"],"csv")).toBe("uuid\r\na\r\nb\r\n");
  expect(serializeUuids(["a","b"],"txt")).toBe("a\nb");
});
