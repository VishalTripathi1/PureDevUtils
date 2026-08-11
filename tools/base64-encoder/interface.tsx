"use client";
import { TextConverter } from "@/components/text-converter";
import { encodeBase64 } from "./logic";
export function Base64EncoderInterface() { return <TextConverter converter={encodeBase64} inputLabel="Text input" outputLabel="Base64 output" actionLabel="Encode Base64" example="Hello, world!" downloadName="encoded-base64.txt" mimeType="text/plain" />; }
