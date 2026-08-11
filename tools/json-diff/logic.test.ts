import { describe, expect, it } from "vitest";
import { diffJson } from "./logic";

describe("diffJson", () => {
  it("reports added, removed, and changed object values", () => {
    expect(diffJson('{"a":1,"old":true}', '{"a":2,"new":true}')).toEqual({ ok: true, entries: [
      { path: "root.a", kind: "changed", left: 1, right: 2 },
      { path: "root.new", kind: "added", right: true },
      { path: "root.old", kind: "removed", left: true },
    ] });
  });
  it("compares arrays by index", () => expect(diffJson('[1,2]', '[1,3]').ok && (diffJson('[1,2]', '[1,3]') as { entries: { path: string }[] }).entries[0].path).toBe("root[1]"));
  it("requires both documents", () => expect(diffJson("{}", "").ok).toBe(false));
  it("rejects invalid JSON", () => expect(diffJson("{", "{}").ok).toBe(false));
});
