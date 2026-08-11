"use client";

import { useState } from "react";
import { generateUuid } from "./logic";

export function UuidGeneratorInterface() {
  const [uuids, setUuids] = useState<string[]>([]); const [copied, setCopied] = useState(false);
  const generate = () => { setUuids((current) => [generateUuid(), ...current].slice(0, 10)); setCopied(false); };
  const copy = async () => { if (uuids.length === 0) return; await navigator.clipboard.writeText(uuids.join("\n")); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <section className="workbench generator" aria-label="UUID generator"><div className="editor-toolbar"><span>Version 4 UUID</span><button className="text-button" disabled={!uuids.length} onClick={copy}>{copied ? "Copied" : "Copy all"}</button></div><div className="generator-body"><button className="primary-button" onClick={generate}>Generate UUID</button>{uuids.length === 0 ? <p className="generator-placeholder">Generate a cryptographically random UUID v4.</p> : <ol className="uuid-list">{uuids.map((uuid) => <li key={uuid}><code>{uuid}</code></li>)}</ol>}</div></section>;
}
