import { describe, expect, it } from "vitest";
import { encodeUrl } from "./logic";
describe("encodeUrl", () => { it("percent-encodes URL components", () => expect(encodeUrl("hello world?x=1&y=2")).toEqual({ ok: true, output: "hello%20world%3Fx%3D1%26y%3D2" })); });
