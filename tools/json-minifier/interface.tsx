"use client";

import { useEffect, useRef, useState } from "react";
import { ShortcutHint, useModifierKey } from "@/components/shortcut-hint";
import { minifyJson } from "./logic";

const exampleJson = '{\n  "project": "PureDevUtils",\n  "private": true,\n  "tools": ["JSON Minifier"]\n}';

export function JsonMinifierInterface() {
  const [input, setInput] = useState(""); const [output, setOutput] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null); const modifier = useModifierKey();
  const minify = () => { const result = minifyJson(input); if (result.ok) { setOutput(result.output); setError(""); } else { setOutput(""); setError(result.error); } };
  const clear = () => { setInput(""); setOutput(""); setError(""); inputRef.current?.focus(); };
  const copy = async () => { if (!output) return; await navigator.clipboard.writeText(output); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const download = () => { const url = URL.createObjectURL(new Blob([output], { type: "application/json" })); const link = document.createElement("a"); link.href = url; link.download = "minified.json"; link.click(); URL.revokeObjectURL(url); };
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); minify(); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); });
  return <section className="workbench" aria-label="JSON minifier">
    <div className="editor-toolbar"><span>Input JSON</span><div><button className="text-button" onClick={() => setInput(exampleJson)}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <textarea ref={inputRef} className="code-editor" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-label="JSON input to minify" placeholder={`Paste JSON here…\n\nPress ${modifier} + Enter to minify`} />
    <div className="action-row"><button className="primary-button" onClick={minify}>Minify JSON <ShortcutHint /></button>{error && <p className="error-message" role="alert">{error}</p>}</div>
    <div className="editor-toolbar output-toolbar"><span>Minified JSON</span><div><button className="text-button" disabled={!output} onClick={copy}>{copied ? "Copied" : "Copy"}</button><button className="text-button" disabled={!output} onClick={download}>Download</button></div></div>
    <textarea className="code-editor output-editor" value={output} readOnly spellCheck={false} aria-label="Minified JSON output" placeholder="Minified JSON will appear here." />
  </section>;
}
