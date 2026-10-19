"use client";
import { useState } from "react";
import { copyText, downloadText } from "@/lib/browser-files";
import { generateUuids, MAX_UUID_QUANTITY, serializeUuids } from "./logic";
export function UuidGeneratorInterface() {
  const [quantity, setQuantity] = useState("1");
  const [uuids, setUuids] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const run = async (action: () => void | Promise<void>) => {
    setError(""); setMessage("");
    try { await action(); } catch (e) { setError(e instanceof Error ? e.message : "Action unavailable. Copy the output manually."); }
  };
  return <section className="workbench generator" aria-label="UUID generator">
    <div className="tool-options"><label>Quantity<input type="number" min="1" max={MAX_UUID_QUANTITY} step="1" value={quantity} onChange={e => setQuantity(e.target.value)} /></label>
      <div className="preset-buttons" aria-label="Quantity presets">{[1,10,100].map(n => <button key={n} className="text-button" onClick={() => setQuantity(String(n))}>{n}</button>)}</div>
      <button className="primary-button" onClick={() => run(() => { const batch = generateUuids(quantity); setUuids(batch); setMessage(`Generated ${batch.length} UUIDs. This batch replaces the previous batch.`); })}>Generate UUIDs</button>
    </div>
    <p className="option-note">1–1,000 per batch. No input to paste. Requires secure browser randomness.</p>
    <div className="editor-toolbar"><span>{uuids.length} UUIDs</span><div>
      <button className="text-button" disabled={!uuids.length} onClick={() => run(async () => { await copyText(serializeUuids(uuids,"txt")); setMessage(`Copied ${uuids.length} UUIDs.`); })}>Copy all</button>
      {(["txt","csv"] as const).map(format => <button key={format} className="text-button" disabled={!uuids.length} onClick={() => run(() => { downloadText(serializeUuids(uuids,format),`uuids.${format}`,format === "csv" ? "text/csv" : "text/plain"); setMessage(`${format.toUpperCase()} download started.`); })}>Download {format.toUpperCase()}</button>)}
    </div></div>
    <textarea className="code-editor output-editor" aria-label="Generated UUIDs" readOnly value={uuids.join("\n")} placeholder="Generated UUIDs appear here, one per line." />
    <p role="status" className="option-note">{message}</p>{error && <p role="alert" className="error-message option-note">{error}</p>}
  </section>;
}
