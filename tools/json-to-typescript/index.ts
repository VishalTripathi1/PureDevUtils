import type { ToolDefinition } from "../types";
import { JsonToTypescriptInterface } from "./interface";

export const jsonToTypescript: ToolDefinition = {
  slug: "json-to-typescript",
  name: "JSON to TypeScript",
  category: "Code generation",
  icon: "TS",
  description: "Generate TypeScript interfaces from JSON locally.",
  longDescription:
    "Infer TypeScript interfaces from a JSON example in your browser. Nested objects become their own named interfaces, arrays are typed based on their contents, and optional or inconsistent fields are flagged — giving you a typed starting point instead of hand-writing interfaces from an API response.",
  metaTitle: "JSON to TypeScript — Generate Interfaces Locally",
  metaDescription:
    "Convert a JSON example into TypeScript interfaces locally in your browser. Nested objects and arrays are typed automatically — nothing is uploaded.",
  faq: [
    { question: "Is JSON uploaded?", answer: "No. Generation runs in your browser." },
    {
      question: "How are nested objects typed?",
      answer:
        "Each nested object becomes its own named interface, referenced as a property type on the parent interface.",
    },
    {
      question: "What happens with mixed array types?",
      answer:
        "If an array contains values of different shapes, the generated type is a union so the interface still matches your sample data.",
    },
  ],
  relatedTools: [
    { slug: "json-to-java", name: "JSON to Java" },
    { slug: "json-to-python", name: "JSON to Python" },
    { slug: "json-formatter", name: "JSON Formatter" },
  ],
  Interface: JsonToTypescriptInterface,
};
