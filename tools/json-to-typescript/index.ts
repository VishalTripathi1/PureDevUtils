import type { ToolDefinition } from "../types";
import { JsonToTypescriptInterface } from "./interface";

export const jsonToTypescript: ToolDefinition = {
  slug: "json-to-typescript",
  name: "JSON to TypeScript",
  category: "Code generation",
  icon: "TS",
  description: "Generate TypeScript interfaces from JSON locally.",
  longDescription:
    "Infer TypeScript interfaces from a JSON example in your browser. Nested objects become their own named interfaces, arrays are typed from their first element — giving you a typed starting point instead of hand-writing interfaces from an API response.",
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
        "Only the first array element is used. Review mixed types and later objects manually; unions and optional fields are not inferred.",
    },
  ],
  relatedTools: [
    { slug: "json-to-java", name: "JSON to Java" },
    { slug: "json-to-python", name: "JSON to Python" },
    { slug: "json-formatter", name: "JSON Formatter" },
  ],
  Interface: JsonToTypescriptInterface,
};
