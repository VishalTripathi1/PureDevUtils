"use client";
import { useState } from "react";
import { TextConverter } from "@/components/text-converter";
import { generateJava, defaultJavaOptions, type JavaOptions } from "./logic";
export function JsonToJavaInterface() {
  const [options,setOptions] = useState<JavaOptions>(defaultJavaOptions);
  return <>
    <div className="tool-options">
      <label>Root class name<input value={options.rootName} onChange={e => setOptions({...options,rootName:e.target.value})} /></label>
      <label>Java package (optional)<input placeholder="com.example.model" value={options.packageName} onChange={e => setOptions({...options,packageName:e.target.value})} /></label>
      <label>Output mode<select value={options.mode} onChange={e => setOptions({...options,mode:e.target.value as JavaOptions["mode"],lombok:false})}><option value="pojo">POJO (Java 8+)</option><option value="record">Record (Java 17+)</option></select></label>
      <label className="checkbox-label"><input type="checkbox" checked={options.jackson} onChange={e => setOptions({...options,jackson:e.target.checked})} />Jackson @JsonProperty</label>
      <label className="checkbox-label"><input type="checkbox" disabled={options.mode === "record"} checked={options.lombok} onChange={e => setOptions({...options,lombok:e.target.checked})} />Lombok @Data (POJO only)</label>
    </div>
    <p>Accepts an object or a non-empty array of objects. POJOs use public fields; records use components. Jackson requires jackson-annotations; Lombok requires its dependency and annotation processor. Generate again after changing options.</p>
    <TextConverter conversionKey={JSON.stringify(options)} converter={v => generateJava(v,options)} inputLabel="Input JSON" outputLabel="Java output" actionLabel="Generate Java" example={'{"order-id":42,"customer":{"name":"Ada"},"items":[{"sku":"A1","quantity":2},{"sku":"B2","price":4.5}]}'} downloadName={`${options.rootName}.java`} mimeType="text/plain" />
  </>;
}
