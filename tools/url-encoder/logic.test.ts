import { describe, expect, it } from "vitest";
import { encodeUrl } from "./logic";
describe("encodeUrl", () => { it("percent-encodes URL components", () => expect(encodeUrl("hello world?x=1&y=2")).toEqual({ ok: true, output: "hello%20world%3Fx%3D1%26y%3D2" })); });
import { decodeUrl } from "../url-decoder/logic";
it("distinguishes URL modes, Unicode and form conventions", () => {
  expect(encodeUrl("hello world & team")).toEqual({ok:true,output:"hello%20world%20%26%20team"});
  expect(encodeUrl("https://example.com/?q=a b&x=1","url")).toEqual({ok:true,output:"https://example.com/?q=a%20b&x=1"});
  expect(encodeUrl("café 😀")).toEqual({ok:true,output:"caf%C3%A9%20%F0%9F%98%80"});
  expect(encodeUrl("%20")).toEqual({ok:true,output:"%2520"});
  expect(encodeUrl("\ud800").ok).toBe(false);
  expect(decodeUrl("a+b")).toEqual({ok:true,output:"a+b"});
  expect(decodeUrl("%2F%20","url")).toEqual({ok:true,output:"%2F "});
  expect(decodeUrl("%2F%20")).toEqual({ok:true,output:"/ "});
  for (const text of ["%","%GG","%E0%A4","%FF"]) expect(decodeUrl(text).ok).toBe(false);
  expect(decodeUrl("caf%C3%A9%20%F0%9F%98%80")).toEqual({ok:true,output:"café 😀"});
});
