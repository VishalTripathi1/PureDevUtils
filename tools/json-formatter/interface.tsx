"use client";

import { useEffect, useRef, useState } from "react";
import { formatJson } from "./logic";

const starterJson = '{"project":"Developer Toolbox","private":true,"tools":["JSON Formatter"]}';

export function JsonFormatterInterface() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function format() {
    const result = formatJson(input);
    if (result.ok) { setOutput(result.output); setError(""); } else { setError(result.error); setOutput(""); }
  }
  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); window.setTimeout(() => setCopied(false), 1800);
  }
  function clear() { setInput(""); setOutput(""); setError(""); inputRef.current?.focus(); }
  function download() {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "formatted.json"; link.click(); URL.revokeObjectURL(url);
  }
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); format(); } };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  });
  return <section className="workbench" aria-label="JSON formatter">
    <div className="editor-toolbar"><span>Input JSON</span><div><button className="text-button" onClick={() => setInput(starterJson)}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <textarea ref={inputRef} className="code-editor" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-label="JSON input" placeholder={'Paste JSON here…\n\nPress Ctrl + Enter to format'} />
    <div className="action-row"><button className="primary-button" onClick={format}>Format JSON <kbd>Ctrl ↵</kbd></button>{error && <p className="error-message" role="alert">{error}</p>}</div>
    <div className="editor-toolbar output-toolbar"><span>Formatted JSON</span><div><button className="text-button" disabled={!output} onClick={copyOutput}>{copied ? "Copied" : "Copy"}</button><button className="text-button" disabled={!output} onClick={download}>Download</button></div></div>
    <textarea className="code-editor output-editor" value={output} readOnly spellCheck={false} aria-label="Formatted JSON output" placeholder="Formatted JSON will appear here." />
  </section>;
}
