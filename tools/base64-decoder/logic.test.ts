import { describe, expect, it } from "vitest";
import { decodeBase64 } from "./logic";
describe("decodeBase64", () => { it("decodes Unicode text", () => expect(decodeBase64("SGVsbG8sIPCfjI0=")).toEqual({ ok: true, output: "Hello, 🌍" })); it("rejects invalid input", () => expect(decodeBase64("not base64!").ok).toBe(false)); });
