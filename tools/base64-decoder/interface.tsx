"use client";
import { TextConverter } from "@/components/text-converter";
import { decodeBase64 } from "./logic";
export function Base64DecoderInterface() { return <TextConverter converter={decodeBase64} inputLabel="Base64 input" outputLabel="Decoded text" actionLabel="Decode Base64" example="SGVsbG8sIHdvcmxkIQ==" downloadName="decoded.txt" mimeType="text/plain" />; }
