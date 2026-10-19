"use client";

import { useEffect, useRef, useState } from "react";
import { copyText, downloadText } from "@/lib/browser-files";
import { ShortcutHint, useModifierKey } from "@/components/shortcut-hint";

type Converter = (input: string) => { ok: true; output: string } | { ok: false; error: string };

type TextConverterProps = {
  converter: Converter;
  conversionKey?: string;
  inputLabel: string;
  outputLabel: string;
  actionLabel: string;
  example: string;
  downloadName: string;
  mimeType: string;
};

export function TextConverter({ converter, conversionKey, inputLabel, outputLabel, actionLabel, example, downloadName, mimeType }: TextConverterProps) {
  const [input, setInput] = useState(""); const [output, setOutput] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const [outputFilename, setOutputFilename] = useState(downloadName);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modifier = useModifierKey();
  const convert = () => { const result = converter(input); if (result.ok) { setOutput(result.output); setOutputFilename(downloadName); setCopied(false); setError(""); } else { setOutput(""); setError(result.error); } };
  useEffect(() => { setOutput(""); setError(""); setCopied(false); }, [conversionKey]);
  const clear = () => { setInput(""); setOutput(""); setError(""); inputRef.current?.focus(); };
  const copy = async () => { if (!output) return; try { await copyText(output); setCopied(true); setError(""); } catch (e) { setError((e as Error).message); } };
  const download = () => { try { downloadText(output, outputFilename, mimeType); } catch (e) { setError((e as Error).message); } };
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); convert(); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); });
  return <section className="workbench" aria-label={actionLabel}>
    <div className="editor-toolbar"><span>{inputLabel}</span><div><button className="text-button" onClick={() => setInput(example)}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <textarea ref={inputRef} className="code-editor" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-label={inputLabel} placeholder={`Paste ${inputLabel.toLowerCase()} here…\n\nPress ${modifier} + Enter to convert`} />
    <div className="action-row"><button className="primary-button" onClick={convert}>{actionLabel} <ShortcutHint /></button>{error && <p className="error-message" role="alert">{error}</p>}</div>
    <div className="editor-toolbar output-toolbar"><span>{outputLabel}<span role="status">{copied ? " — copied" : ""}</span></span><div><button className="text-button" disabled={!output} onClick={copy}>{copied ? "Copied" : "Copy"}</button><button className="text-button" disabled={!output} onClick={download}>Download</button></div></div>
    <textarea className="code-editor output-editor" value={output} readOnly spellCheck={false} aria-label={outputLabel} placeholder={`${outputLabel} will appear here.`} />
  </section>;
}
