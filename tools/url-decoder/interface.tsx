"use client";
import { TextConverter } from "@/components/text-converter";
import { decodeUrl } from "./logic";
export function UrlDecoderInterface() { return <TextConverter converter={decodeUrl} inputLabel="URL-encoded input" outputLabel="Decoded output" actionLabel="Decode URL" example="hello%20world%3Fsource%3Ddeveloper%20toolbox" downloadName="url-decoded.txt" mimeType="text/plain" />; }
