import { describe, expect, it } from "vitest";
import { decodeJwt } from "./logic";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiQWRhIn0.signature";
describe("decodeJwt", () => { it("decodes header and payload", () => expect(decodeJwt(token)).toEqual({ ok: true, header: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}', payload: '{\n  "sub": "123",\n  "name": "Ada"\n}' })); it("requires three sections", () => expect(decodeJwt("a.b").ok).toBe(false)); });
