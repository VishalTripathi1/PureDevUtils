"use client";
import { TextConverter } from "@/components/text-converter";
import { jsonToCsv } from "./logic";
export function JsonToCsvInterface() { return <TextConverter converter={jsonToCsv} inputLabel="Input JSON" outputLabel="CSV output" actionLabel="Convert to CSV" example={'[{"name":"Ada","role":"Engineer"},{"name":"Lin","role":"Designer"}]'} downloadName="converted.csv" mimeType="text/csv" />; }
