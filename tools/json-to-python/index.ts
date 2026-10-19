import type { ToolDefinition } from "../types";
import { JsonToPythonInterface } from "./interface";

export const jsonToPython: ToolDefinition = {
  slug: "json-to-python",
  name: "JSON to Python",
  category: "Code generation",
  icon: "PY",
  description: "Generate Python dataclasses from JSON locally.",
  longDescription:
    "Infer Python dataclasses from a JSON example in your browser. Nested objects become their own dataclasses, fields are typed from the sample values, and the result provides a starting point to review for a Python module — no server round-trip required.",
  metaTitle: "JSON to Python — Generate Dataclasses Locally",
  metaDescription:
    "Convert a JSON example into Python dataclasses locally in your browser. Nested objects and field types are inferred automatically — nothing is uploaded.",
  faq: [
    { question: "Is JSON uploaded?", answer: "No. Generation runs in your browser." },
    {
      question: "How are nested objects handled?",
      answer:
        "Each nested object in your JSON example becomes its own dataclass, referenced as a field type on the parent dataclass.",
    },
    {
      question: "Does it require any external libraries?",
      answer:
        "No. The generated code uses only the standard library's dataclasses module, so it works without extra installs.",
    },
  ],
  relatedTools: [
    { slug: "json-to-typescript", name: "JSON to TypeScript" },
    { slug: "json-to-java", name: "JSON to Java" },
    { slug: "json-formatter", name: "JSON Formatter" },
  ],
  Interface: JsonToPythonInterface,
};
