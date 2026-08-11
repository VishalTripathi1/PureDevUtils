"use client";
import { TextConverter } from "@/components/text-converter";
import { jsonToYaml } from "./logic";
export function JsonToYamlInterface() { return <TextConverter converter={jsonToYaml} inputLabel="Input JSON" outputLabel="YAML output" actionLabel="Convert to YAML" example={'{"name":"Ada","skills":["math","programming"]}'} downloadName="converted.yaml" mimeType="application/yaml" />; }
