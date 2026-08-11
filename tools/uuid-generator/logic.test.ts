import { describe, expect, it } from "vitest";
import { generateUuid } from "./logic";
describe("generateUuid", () => { it("creates an RFC 4122 version 4 UUID", () => expect(generateUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)); });
