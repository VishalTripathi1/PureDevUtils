export type JavaOptions = { rootName: string; packageName: string; mode: "pojo" | "record"; jackson: boolean; lombok: boolean };
export const defaultJavaOptions: JavaOptions = { rootName: "Root", packageName: "", mode: "pojo", jackson: false, lombok: false };
const reserved = new Set(("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while true false null _ record sealed permits var yield when clone finalize getClass hashCode notify notifyAll toString wait").split(" "));
const builtins = ["String", "Object", "Boolean", "Integer", "Long", "Double", "List", "JsonProperty", "Data"];
export const validJavaIdentifier = (name: string) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) && !reserved.has(name);
function safeName(raw: string) {
  let name = raw.replace(/[^A-Za-z0-9_$]/g, "_") || "value";
  if (/^[0-9]/.test(name)) name = `_${name}`;
  if (reserved.has(name)) name += "_";
  return name;
}
function unique(base: string, used: Set<string>) {
  let name = base; let suffix = 2;
  while (used.has(name)) name = `${base}${suffix++}`;
  used.add(name); return name;
}
/** Octal control/backslash escapes avoid Java's pre-lexing Unicode escapes. */
export function javaString(value: string) {
  return '"' + [...value].map(c => c === '"' ? '\\"' : c === "\\" ? "\\134" : c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127 ? `\\${c.charCodeAt(0).toString(8).padStart(3,"0")}` : /[\uD800-\uDFFF]/.test(c) && c.length === 1 ? `\\u${c.charCodeAt(0).toString(16).padStart(4,"0")}` : c).join("") + '"';
}
type Field = { key: string; name: string; type: string };
type Definition = { name: string; fields: Field[] };
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === "object" && !Array.isArray(v);
export function generateJava(input: string, options: JavaOptions = defaultJavaOptions): { ok: true; output: string; filename: string } | { ok: false; error: string } {
  try {
    if (!validJavaIdentifier(options.rootName) || builtins.includes(options.rootName)) throw new Error("Use a Java class identifier such as ApiResponse, not a keyword or built-in type name.");
    if (options.packageName && !options.packageName.split(".").every(validJavaIdentifier)) throw new Error("Use a dot-separated Java package such as com.example.model; each segment must be an identifier, not a keyword.");
    if (options.mode === "record" && options.lombok) throw new Error("Lombok @Data is only available for POJOs. Turn it off for records.");
    if (input.length > 1_000_000) throw new Error("Use a representative JSON sample with at most 1,000,000 characters.");
    let value: unknown;
    try { value = JSON.parse(input); } catch { throw new Error("Invalid JSON. Use double-quoted keys and strings, with no comments or trailing commas."); }
    const roots = Array.isArray(value) ? value : [value];
    if (!roots.length || !roots.every(isObject)) throw new Error("Provide a JSON object or a non-empty array containing only objects. Wrap primitive values in an object first.");
    // Validate even mixed values that ultimately infer Object.
    function validate(v: unknown, depth = 0) {
      if (depth > 40) throw new Error("Sample nesting exceeds 40 levels. Use a smaller representative sample.");
      if (typeof v === "number" && (!Number.isFinite(v) || (Number.isInteger(v) && !Number.isSafeInteger(v)))) throw new Error("A number exceeds JavaScript's safe numeric range. Quote large identifiers or exact numeric values as JSON strings before generating.");
      if (v && typeof v === "object") Object.values(v).forEach(item => validate(item,depth + 1));
    }
    validate(value);
    const definitions: Definition[] = [];
    const names = new Set([...builtins, options.rootName]);
    function infer(samples: unknown[], hint: string): string {
      const nonNull = samples.filter(v => v != null);
      if (!nonNull.length) return "Object";
      if (nonNull.every(Array.isArray)) return `List<${infer(nonNull.flat(),`${hint}Item`)}>`;
      if (nonNull.every(isObject)) {
        const safe = safeName(hint); const name = unique(safe[0].toUpperCase() + safe.slice(1),names);
        define(nonNull,name); return name;
      }
      if (nonNull.every(v => typeof v === "string")) return "String";
      if (nonNull.every(v => typeof v === "boolean")) return "Boolean";
      if (nonNull.every(v => typeof v === "number")) {
        const numbers = nonNull as number[];
        return numbers.every(Number.isInteger) ? numbers.every(v => v >= -2147483648 && v <= 2147483647) ? "Integer" : "Long" : "Double";
      }
      return "Object";
    }
    function define(samples: Record<string,unknown>[], name: string) {
      if (definitions.length >= 200) throw new Error("Sample creates over 200 model types. Use a smaller representative sample.");
      const definition: Definition = { name, fields: [] }; definitions.push(definition);
      const usedFields = new Set<string>();
      const keys = [...new Set(samples.flatMap(Object.keys))];
      definition.fields = keys.map(key => ({ key, name: unique(safeName(key),usedFields), type: infer(samples.map(v => Object.prototype.hasOwnProperty.call(v,key) ? v[key] : undefined),key) }));
    }
    define(roots as Record<string,unknown>[],options.rootName);
    function render(def: Definition, root: boolean, nested = ""): string {
      const annotation = (f: Field) => options.jackson ? `@JsonProperty(${javaString(f.key)}) ` : "";
      if (options.mode === "record") return `public ${root ? "" : "static "}record ${def.name}(\n${def.fields.map(f => `  ${annotation(f)}${f.type} ${f.name}`).join(",\n")}\n) {${root ? `\n${nested}\n` : ""}}`;
      return `${options.lombok ? "@Data\n" : ""}public ${root ? "" : "static "}class ${def.name} {\n${def.fields.map(f => `  ${annotation(f)}public ${f.type} ${f.name};`).join("\n")}${root ? `\n${nested}\n` : "\n"}}`;
    }
    const nested = definitions.slice(1).map(def => render(def,false).split("\n").map(line => `  ${line}`).join("\n")).join("\n\n");
    const body = render(definitions[0],true,nested);
    return { ok: true, filename: `${options.rootName}.java`, output: `${options.packageName ? `package ${options.packageName};\n\n` : ""}import java.util.List;\n${options.jackson ? "import com.fasterxml.jackson.annotation.JsonProperty;\n" : ""}${options.lombok ? "import lombok.Data;\n" : ""}\n// Java ${options.mode === "record" ? "17+" : "8+"}. Inferred from samples; review before production use.\n// Null/missing fields use boxed types. Mixed or unknown values use Object.\n${!options.jackson ? "// Renamed JSON keys require explicit mapping; enable Jackson annotations to preserve them.\n" : ""}${body}\n` };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : "Unable to generate Java from this sample." }; }
}
