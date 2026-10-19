import type { ToolDefinition } from "../types";
import { JsonToJavaInterface } from "./interface";
export const jsonToJava: ToolDefinition = {
  slug: "json-to-java",
  name: "JSON to Java",
  category: "Code generation",
  icon: "JV",
  description: "Generate Java model classes from JSON locally.",
  longDescription:
    "Infer simple Java model classes from a JSON example in your browser. Nested objects become their own classes, arrays become typed lists, and field types are guessed from the sample values — so you get a starting point for POJOs without hand-typing boilerplate.",
  metaTitle: "JSON to Java POJO Generator",
  metaDescription:
    "Generate Java POJOs or records from nested JSON. Set class and package names, add Jackson or Lombok, and download a Java file. Processing stays local.",
  faq: [
    {
      question: "Is JSON uploaded?",
      answer: "No. Generation runs in your browser.",
    },
    {
      question: "How are nested objects handled?",
      answer:
        "Each nested object in your JSON example becomes its own Java class, referenced as a field on the parent class.",
    },
    {
      question: "What Java types are used?",
      answer:
        "Types are inferred from the sample values: strings, numbers, booleans, lists, and nested object classes. Review and adjust types for edge cases your sample doesn't cover.",
    },
  ],
  relatedTools: [
    { slug: "json-to-typescript", name: "JSON to TypeScript" },
    { slug: "json-to-python", name: "JSON to Python" },
    { slug: "json-formatter", name: "JSON Formatter" },
  ],
  Interface: JsonToJavaInterface,
};
