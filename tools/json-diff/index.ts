import type { ToolDefinition } from "../types";
import { JsonDiffInterface } from "./interface";

export const jsonDiff: ToolDefinition = {
  slug: "json-diff", name: "JSON Diff", category: "JSON", icon: "↔",
  description: "Compare two JSON documents and see exactly what changed.",
  longDescription: "Compare JSON documents side by side to identify added, removed, and changed values. Object paths and array indexes make it easy to locate each difference, and both inputs stay entirely in your browser.",
  metaTitle: "JSON Diff — Compare JSON Locally",
  metaDescription: "Compare two JSON documents locally in your browser. See added, removed, and changed JSON values without uploading data.",
  faq: [
    { question: "How are arrays compared?", answer: "Arrays are compared by index. A change at an index is shown at a path such as root.items[0]." },
    { question: "Are the JSON documents uploaded?", answer: "No. Both documents are parsed and compared entirely in your browser." },
  ],
  relatedTools: [{ slug: "json-formatter", name: "JSON Formatter" }, { slug: "json-validator", name: "JSON Validator" }, { slug: "json-minifier", name: "JSON Minifier" }],
  Interface: JsonDiffInterface,
};
