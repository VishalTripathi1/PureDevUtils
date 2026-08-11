"use client";
import { TextConverter } from "@/components/text-converter";
import { csvToJson } from "./logic";
export function CsvToJsonInterface() { return <TextConverter converter={csvToJson} inputLabel="Input CSV" outputLabel="JSON output" actionLabel="Convert to JSON" example={"name,role\nAda,Engineer\nLin,Designer"} downloadName="converted.json" mimeType="application/json" />; }
