"use client";

import { useEffect, useRef, useState } from "react";
import { ShortcutHint, useModifierKey } from "@/components/shortcut-hint";
import { validateJson } from "./logic";

const exampleJson = '{"name":"Ada Lovelace","languages":["Mathematics","English"]}';

export function JsonValidatorInterface() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validateJson> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modifier = useModifierKey();
  const validate = () => setResult(validateJson(input));
  const clear = () => { setInput(""); setResult(null); inputRef.current?.focus(); };
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); validate(); } };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  });
  return <section className="workbench" aria-label="JSON validator">
    <div className="editor-toolbar"><span>JSON input</span><div><button className="text-button" onClick={() => setInput(exampleJson)}>Load example</button><button className="text-button" onClick={clear}>Clear</button></div></div>
    <textarea ref={inputRef} className="code-editor" value={input} onChange={(event) => { setInput(event.target.value); setResult(null); }} spellCheck={false} aria-label="JSON input to validate" placeholder={`Paste JSON here…\n\nPress ${modifier} + Enter to validate`} />
    <div className="action-row"><button className="primary-button" onClick={validate}>Validate JSON <ShortcutHint /></button>{result && <p className={result.valid ? "success-message" : "error-message"} role="status">{result.valid ? "Valid JSON — no syntax errors found." : result.error}</p>}</div>
  </section>;
}
