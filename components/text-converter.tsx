"use client";

import { useEffect, useRef, useState } from "react";

type Converter = (input: string) => { ok: true; output: string } | { ok: false; error: string };

type TextConverterProps = {
  converter: Converter;
  inputLabel: string;
  outputLabel: string;
  actionLabel: string;
  example: string;
  downloadName: string;
  mimeType: string;
};

export function TextConverter({ converter, inputLabel, outputLabel, actionLabel, example, downloadName, mimeType }: TextConverterProps) {
  const [input, setInput] = useState(""); const [output, setOutput] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const convert = () => { const result = converter(input); if (result.ok) { setOutput(result.output); setError(""); } else { setOutput(""); setError(result.error); } };
  const clear = () => { setInput(""); setOutput(""); setError(""); inputRef.current?.focus(); };
  const copy = async () => { if (!output) return; await navigator.clipboard.writeText(output); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const download = () => { const url = URL.createObjectURL(new Blob([output], { type: mimeType })); const link = document.createElement("a"); link.href = url; link.download = downloadName; link.click(); URL.revokeObjectURL(url); };
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); convert(); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); });
  return <section className="workbench" aria-label={actionLabel}>
    <div className="editor-toolbar"><span>{inputLabel}</span><div><button className="text-button" onClick={() => setInput(example)}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <textarea ref={inputRef} className="code-editor" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-label={inputLabel} placeholder={`Paste ${inputLabel.toLowerCase()} here…\n\nPress Ctrl + Enter to convert`} />
    <div className="action-row"><button className="primary-button" onClick={convert}>{actionLabel} <kbd>Ctrl ↵</kbd></button>{error && <p className="error-message" role="alert">{error}</p>}</div>
    <div className="editor-toolbar output-toolbar"><span>{outputLabel}</span><div><button className="text-button" disabled={!output} onClick={copy}>{copied ? "Copied" : "Copy"}</button><button className="text-button" disabled={!output} onClick={download}>Download</button></div></div>
    <textarea className="code-editor output-editor" value={output} readOnly spellCheck={false} aria-label={outputLabel} placeholder={`${outputLabel} will appear here.`} />
  </section>;
}
