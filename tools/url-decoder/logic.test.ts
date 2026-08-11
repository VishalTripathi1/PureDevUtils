import { describe, expect, it } from "vitest";
import { decodeUrl } from "./logic";
describe("decodeUrl", () => { it("decodes URL components", () => expect(decodeUrl("hello%20world%3F")).toEqual({ ok: true, output: "hello world?" })); it("rejects malformed escapes", () => expect(decodeUrl("%ZZ").ok).toBe(false)); });
