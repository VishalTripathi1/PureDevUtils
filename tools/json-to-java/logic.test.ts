import { describe, expect, it } from "vitest";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateJava, defaultJavaOptions, javaString, type JavaOptions } from "./logic";
function output(input: unknown, options: Partial<JavaOptions> = {}) {
  const result = generateJava(JSON.stringify(input),{...defaultJavaOptions,...options});
  if (!result.ok) throw new Error(result.error);
  return result.output;
}
describe("Java models", () => {
  it("merges nested arrays, missing fields, nulls and boxed numbers", () => {
    const code = output({rows:[{name:"Ada",value:null},{count:3,value:4.5}],empty:[], large:2147483648, mixed:[1,"a"], matrix:[[1],[2]]});
    for (const field of ["String name", "Integer count", "Double value", "List<Object> empty", "Long large", "List<Object> mixed", "List<List<Integer>> matrix"]) expect(code).toContain(field);
  });
  it("handles root arrays, empty objects and null elements", () => {
    expect(output([{a:1},{b:true}])).toContain("Boolean b");
    expect(output({a:[null,1], b:null})).toContain("List<Integer> a");
    expect(output({})).toContain("public class Root");
  });
  it("rejects unsupported shapes and invalid options with actionable errors", () => {
    for (const input of ["null","[]","[1]",'"hello"',"{",'{"id":9007199254740993}']) expect(generateJava(input).ok).toBe(false);
    for (const rootName of ["1Root","class","String","record"]) expect(generateJava("{}",{...defaultJavaOptions,rootName}).ok).toBe(false);
    expect(generateJava("{}",{...defaultJavaOptions,packageName:"com.class"}).ok).toBe(false);
    expect(generateJava("{}",{...defaultJavaOptions,mode:"record",lombok:true}).ok).toBe(false);
  });
  it("disambiguates identifiers, class names and Java builtins", () => {
    const code = output({"a-b":{},a_b:{},class:1,"1key":true,root:{},string:{},"":null});
    for (const field of ["A_b a_b", "A_b2 a_b2", "Integer class_", "Boolean _1key", "Root2 root", "String2 string", "Object value"]) expect(code).toContain(field);
  });
  it("escapes original names and only adds requested dependencies", () => {
    expect(javaString('a"b\\u000a\n')).toBe('"a\\"b\\134u000a\\012"');
    expect(output({'a"b\\u000a\n':1},{jackson:true})).toContain('@JsonProperty("a\\"b\\134u000a\\012")');
    expect(output({x:1},{mode:"record"})).toContain("public record Root");
    expect(output({x:1},{lombok:true})).toContain("@Data");
    expect(output({x:1})).not.toContain("import lombok");
  });
  it("bounds deep and oversized samples", () => {
    expect(generateJava(' '.repeat(1_000_001)).ok).toBe(false);
    let nested: unknown = {}; for(let i=0;i<42;i++) nested = {nested};
    expect(generateJava(JSON.stringify(nested)).ok).toBe(false);
  });
  it.skipIf(!process.env.JAVA_TEST_CLASSPATH)("compiles Jackson POJOs/records and Lombok POJOs with real dependencies", () => {
    const directory = mkdtempSync(join(tmpdir(),"puredevutils-java-deps-"));
    try {
      for (const mode of ["pojo","record"] as const) {
        const code = output({'a"b\\u000a\n':1, "class":true, "a-b":{}, "a_b":{}, rows:[{x:1},{y:2.5}],getClass: false},{mode,jackson:true,lombok:mode === "pojo"});
        writeFileSync(join(directory,"Root.java"),code);
        execFileSync("javac",["--release",mode === "record" ? "17" : "8","-cp",process.env.JAVA_TEST_CLASSPATH!,"-d",directory,join(directory,"Root.java")]);
      }
    } finally { rmSync(directory,{recursive:true,force:true}); }
  });
  const javac = spawnSync("javac",["-version"]).status === 0;
  it.skipIf(!javac)("compiles representative dependency-free POJOs and records with javac", () => {
    const directory = mkdtempSync(join(tmpdir(),"puredevutils-java-"));
    try {
      for (const mode of ["pojo","record"] as const) {
        const code = output({"order-id":42,customer:{name:"Ada"},items:[{sku:"A",quantity:2},{sku:"B",price:4.5}], "getClass":false, empty:[], objects:[{},null], mixed:[1,"x"], root:{child:{}}, NESTED:"literal"},{mode,packageName:"com.example.model"});
        writeFileSync(join(directory,"Root.java"),code);
        execFileSync("javac",["--release",mode === "record" ? "17" : "8","-d",directory,join(directory,"Root.java")]);
      }
    } finally { rmSync(directory,{recursive:true,force:true}); }
  });
});
