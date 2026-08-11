import type { ToolDefinition } from "../types";
import { JsonValidatorInterface } from "./interface";

export const jsonValidator: ToolDefinition = {
  slug: "json-validator", name: "JSON Validator", category: "JSON", icon: "✓",
  description: "Check JSON syntax instantly, without sending it anywhere.",
  longDescription: "Validate JSON documents in your browser before using them in an API, config file, or application. The built-in JSON parser checks the same strict JSON syntax your JavaScript runtime expects.",
  metaTitle: "JSON Validator — Validate JSON Locally",
  metaDescription: "Validate JSON syntax locally in your browser. Find JSON syntax errors without uploading sensitive data.",
  faq: [
    { question: "Does this validator upload my JSON?", answer: "No. Validation uses your browser's JSON parser and the input never leaves your device." },
    { question: "Why is valid JavaScript not always valid JSON?", answer: "JSON is stricter: it requires double quotes around property names and strings, and it does not permit comments, trailing commas, or undefined values." },
  ],
  relatedTools: [{ slug: "json-formatter", name: "JSON Formatter" }, { slug: "json-minifier", name: "JSON Minifier" }, { slug: "json-diff", name: "JSON Diff" }],
  Interface: JsonValidatorInterface,
};
