import type { ToolDefinition } from "../types";
import { JsonMinifierInterface } from "./interface";

export const jsonMinifier: ToolDefinition = {
  slug: "json-minifier", name: "JSON Minifier", category: "JSON", icon: "−",
  description: "Remove JSON whitespace for smaller, compact payloads.",
  longDescription: "Minify valid JSON into a compact single-line payload. This is useful when reducing the size of JSON embedded in fixtures, test data, or network requests. Minification runs completely in your browser.",
  metaTitle: "JSON Minifier — Minify JSON Locally",
  metaDescription: "Minify JSON locally in your browser. Remove whitespace from valid JSON, then copy or download the result.",
  faq: [
    { question: "Will minifying JSON change its data?", answer: "No. It removes insignificant whitespace only. Strings, numbers, arrays, objects, and values stay the same." },
    { question: "Can I minify invalid JSON?", answer: "No. JSON must be valid before it can be minified, so this tool shows the parser error instead." },
  ],
  relatedTools: [{ slug: "json-formatter", name: "JSON Formatter" }, { slug: "json-validator", name: "JSON Validator" }, { slug: "json-diff", name: "JSON Diff" }],
  Interface: JsonMinifierInterface,
};
