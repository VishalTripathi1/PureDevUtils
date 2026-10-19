"use client";
import { useState } from "react";
import Link from "next/link";
import { TextConverter } from "./text-converter";
import { encodeUrl, type UrlMode } from "@/tools/url-encoder/logic";
import { decodeUrl } from "@/tools/url-decoder/logic";
export function UrlConverter({ decode = false }: { decode?: boolean }) {
  const [mode,setMode] = useState<UrlMode>("component");
  return <>
    <div className="tool-options"><label>Encoding convention<select value={mode} onChange={e => setMode(e.target.value as UrlMode)}><option value="component">URL component ({decode ? "decodeURIComponent" : "encodeURIComponent"})</option><option value="url">Whole URL ({decode ? "decodeURI" : "encodeURI"})</option></select></label>
      <Link href={`/tools/url-${decode ? "encoder" : "decoder"}`}>Open URL {decode ? "Encoder" : "Decoder"} →</Link></div>
    <p>{mode === "component" ? "For individual query values or path segments; reserved separators are encoded or decoded." : "Preserves URL separators. decodeURI keeps escapes for reserved separators encoded. This does not validate URLs or make them safe."} Spaces use %20; + remains a literal plus when decoding. This is not form encoding.</p>
    <TextConverter conversionKey={mode} converter={v => decode ? decodeUrl(v,mode) : encodeUrl(v,mode)} inputLabel={decode ? "URL-encoded input" : "Text to encode"} outputLabel={decode ? "Decoded output" : "Encoded output"} actionLabel={decode ? "Decode URL" : "Encode URL"} example={decode ? "hello%20world%20%26%20team" : "hello world & team"} downloadName={decode ? "url-decoded.txt" : "url-encoded.txt"} mimeType="text/plain" />
  </>;
}
