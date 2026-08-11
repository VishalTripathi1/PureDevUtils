"use client";
import { TextConverter } from "@/components/text-converter";
import { encodeUrl } from "./logic";
export function UrlEncoderInterface() { return <TextConverter converter={encodeUrl} inputLabel="Text or URL component" outputLabel="URL-encoded output" actionLabel="Encode URL" example="hello world?source=developer toolbox" downloadName="url-encoded.txt" mimeType="text/plain" />; }
