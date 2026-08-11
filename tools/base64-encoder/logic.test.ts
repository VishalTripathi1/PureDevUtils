import { describe, expect, it } from "vitest";
import { encodeBase64 } from "./logic";
describe("encodeBase64", () => { it("encodes Unicode text", () => expect(encodeBase64("Hello, 🌍")).toEqual({ ok: true, output: "SGVsbG8sIPCfjI0=" })); });
