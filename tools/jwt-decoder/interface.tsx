"use client";

import { useEffect, useRef, useState } from "react";
import { decodeJwt } from "./logic";

const example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiQWRhIn0.signature";

export function JwtDecoderInterface() {
  const [input, setInput] = useState(""); const [result, setResult] = useState<ReturnType<typeof decodeJwt> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null); const decode = () => setResult(decodeJwt(input));
  const clear = () => { setInput(""); setResult(null); inputRef.current?.focus(); };
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); decode(); } }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); });
  return <section className="workbench" aria-label="JWT decoder">
    <div className="editor-toolbar"><span>JWT</span><div><button className="text-button" onClick={() => setInput(example)}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <textarea ref={inputRef} className="code-editor jwt-input" value={input} onChange={(event) => { setInput(event.target.value); setResult(null); }} spellCheck={false} aria-label="JWT input" placeholder={'Paste a JSON Web Token here…\n\nPress Ctrl + Enter to decode'} />
    <div className="action-row"><button className="primary-button" onClick={decode}>Decode JWT <kbd>Ctrl ↵</kbd></button>{result && !result.ok && <p className="error-message" role="alert">{result.error}</p>}</div>
    {result?.ok && <div className="jwt-results"><div><div className="editor-toolbar"><span>Header</span></div><textarea className="code-editor output-editor" value={result.header} readOnly aria-label="Decoded JWT header" /></div><div><div className="editor-toolbar"><span>Payload</span></div><textarea className="code-editor output-editor" value={result.payload} readOnly aria-label="Decoded JWT payload" /></div></div>}
  </section>;
}
