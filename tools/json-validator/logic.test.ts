import { describe, expect, it } from "vitest";
import { validateJson } from "./logic";

describe("validateJson", () => {
  it("accepts valid JSON", () => expect(validateJson('{"valid":true}')).toEqual({ valid: true }));
  it("rejects empty input", () => expect(validateJson(" ")).toEqual({ valid: false, error: "Paste JSON to validate it." }));
  it("rejects invalid JSON", () => expect(validateJson('{"valid":}').valid).toBe(false));
});
