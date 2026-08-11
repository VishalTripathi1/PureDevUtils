import type { ComponentType } from "react";

export type ToolDefinition = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  faq: { question: string; answer: string }[];
  relatedTools: { slug: string; name: string }[];
  Interface: ComponentType;
};
