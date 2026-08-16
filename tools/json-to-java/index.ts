import type { ToolDefinition } from "../types";
import { JsonToJavaInterface } from "./interface";
export const jsonToJava: ToolDefinition = {
  slug: "json-to-java",
  name: "JSON to Java",
  category: "Code generation",
  icon: "JV",
  description: "Generate Java model classes from JSON locally.",
  longDescription:
    "Infer simple Java model classes from a JSON example in your browser.",
  metaTitle: "JSON to Java — Generate Classes Locally",
  metaDescription: "Generate Java classes from JSON locally.",
  faq: [
    {
      question: "Is JSON uploaded?",
      answer: "No. Generation runs in your browser.",
    },
  ],
  relatedTools: [],
  Interface: JsonToJavaInterface,
};
