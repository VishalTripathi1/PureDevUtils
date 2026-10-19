import type { ToolDefinition } from "../types";
import { JsonFormatterInterface } from "./interface";

export const jsonFormatter: ToolDefinition = {
  slug: "json-formatter", name: "JSON Formatter", category: "JSON", icon: "{}",
  description: "Format and beautify JSON with clear errors and no uploads.",
  longDescription: "Paste a JSON document to make nested data readable with consistent two-space indentation. Formatting happens entirely in your browser, so sensitive payloads never leave your device.",
  metaTitle: "JSON Formatter — Format and Beautify JSON",
  metaDescription: "Format and beautify JSON locally in your browser. Fast, private JSON formatting with validation, copy, and download.",
  faq: [
    { question: "Is my JSON uploaded anywhere?", answer: "No. Formatting runs in your browser using the built-in JSON parser. No JSON is sent to a server." },
    { question: "Why won’t my JSON format?", answer: "JSON requires double-quoted property names and strings, and does not allow trailing commas or comments. The error message points to the parser issue." },
  ],
  relatedTools: [
    { slug: "json-validator", name: "JSON Validator" },
    { slug: "json-minifier", name: "JSON Minifier" },
    { slug: "json-diff", name: "JSON Diff" },
  ],
  Interface: JsonFormatterInterface,
};
