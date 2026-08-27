"use client";

import { useEffect, useRef, useState } from "react";
import { ShortcutHint } from "@/components/shortcut-hint";
import { diffJson, displayValue, type DiffResult } from "./logic";

const leftExample = '{\n  "name": "Ada",\n  "active": true,\n  "roles": ["author"]\n}';
const rightExample = '{\n  "name": "Ada Lovelace",\n  "active": true,\n  "roles": ["author", "mathematician"],\n  "born": 1815\n}';

export function JsonDiffInterface() {
  const [left, setLeft] = useState(""); const [right, setRight] = useState(""); const [result, setResult] = useState<DiffResult | null>(null);
  const leftRef = useRef<HTMLTextAreaElement>(null);
  const compare = () => setResult(diffJson(left, right));
  const clear = () => { setLeft(""); setRight(""); setResult(null); leftRef.current?.focus(); };
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); compare(); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); });
  return <section className="workbench" aria-label="JSON diff">
    <div className="editor-toolbar"><span>Compare JSON documents</span><div><button className="text-button" onClick={() => { setLeft(leftExample); setRight(rightExample); setResult(null); }}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <div className="diff-inputs">
      <label><span>Original JSON</span><textarea ref={leftRef} className="code-editor" value={left} onChange={(event) => { setLeft(event.target.value); setResult(null); }} spellCheck={false} aria-label="Original JSON" placeholder="Paste original JSON…" /></label>
      <label><span>Changed JSON</span><textarea className="code-editor" value={right} onChange={(event) => { setRight(event.target.value); setResult(null); }} spellCheck={false} aria-label="Changed JSON" placeholder="Paste changed JSON…" /></label>
    </div>
    <div className="action-row"><button className="primary-button" onClick={compare}>Compare JSON <ShortcutHint /></button>{result && !result.ok && <p className="error-message" role="alert">{result.error}</p>}</div>
    {result?.ok && <div className="diff-results" aria-live="polite"><div className="editor-toolbar"><span>{result.entries.length === 0 ? "No differences found" : `${result.entries.length} difference${result.entries.length === 1 ? "" : "s"} found`}</span></div>{result.entries.length > 0 && <ul>{result.entries.map((entry, index) => <li className={`diff-entry ${entry.kind}`} key={`${entry.path}-${index}`}><span className="diff-kind">{entry.kind}</span><code>{entry.path}</code>{entry.kind !== "added" && <span className="diff-value">− {displayValue(entry.left)}</span>}{entry.kind !== "removed" && <span className="diff-value">+ {displayValue(entry.right)}</span>}</li>)}</ul>}</div>}
  </section>;
}
