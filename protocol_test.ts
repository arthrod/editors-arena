import { assert, assertEquals } from "jsr:@std/assert";
import {
  CHILD_SOURCE,
  DEFAULT_SLUGS,
  OPEN_DOCS_ORIGIN,
  PARENT_SOURCE,
  parseChildMessage,
  makeExport,
  makeMenu,
  makeOpen,
  makeSample,
  parseState,
  serializeState,
} from "./client/protocol.ts";

const U = (q: string) => "https://editors-arena.val.run/" + q;

Deno.test("parseState: no e param -> two defaults", () => {
  assertEquals(parseState(U("")), ["superdoc", "eigenpal"]);
});

Deno.test("parseState: three valid slugs are kept", () => {
  assertEquals(
    parseState(U("?e=plate,folio,wordcraft")),
    ["plate", "folio", "wordcraft"],
  );
});

Deno.test("parseState: invalid slugs fall back to positional defaults", () => {
  assertEquals(
    parseState(U("?e=plate,nope,wordcraft")),
    ["plate", "eigenpal", "wordcraft"],
  );
  assertEquals(parseState(U("?e=nope,nope")), ["superdoc", "eigenpal"]);
});

Deno.test("parseState: more than three slugs are truncated", () => {
  assertEquals(
    parseState(U("?e=plate,folio,wordcraft,docen")),
    ["plate", "folio", "wordcraft"],
  );
});

Deno.test("parseState: fewer than two slugs are padded", () => {
  assertEquals(parseState(U("?e=plate")), ["plate", "eigenpal"]);
  assertEquals(parseState(U("?e=")), ["superdoc", "eigenpal"]);
});

Deno.test("parseState: duplicate slugs are kept", () => {
  assertEquals(parseState(U("?e=superdoc,superdoc")), ["superdoc", "superdoc"]);
});

Deno.test("serializeState round-trips through parseState", () => {
  const slugs = ["docxodus", "eigenpal", "plate"];
  assertEquals(serializeState(slugs), "?e=docxodus,eigenpal,plate");
  assertEquals(parseState(U(serializeState(slugs))), slugs);
});

Deno.test("parseChildMessage accepts child message shapes including exported", () => {
  assert(
    parseChildMessage({
      source: "open-docs",
      type: "ready",
      slug: "superdoc",
      name: "SuperDoc",
    }),
  );
  assert(
    parseChildMessage({
      source: "open-docs",
      type: "ready",
      slug: "s",
      name: "n",
      startupMs: 812,
    }),
  );
  assert(
    parseChildMessage({ source: "open-docs", type: "error", slug: "s", message: "boom" }),
  );
  assert(
    parseChildMessage({
      source: "open-docs",
      type: "error",
      slug: "s",
      message: "boom",
      during: "export",
    }),
  );
  assert(
    parseChildMessage({ source: "open-docs", type: "opened", slug: "s", name: "memo.docx" }),
  );
  const expBytes = new Uint8Array([80, 75]).buffer;
  assert(
    parseChildMessage({
      source: "open-docs",
      type: "exported",
      slug: "s",
      name: "memo",
      bytes: expBytes,
    }),
  );
  assert(
    parseChildMessage({
      source: "open-docs",
      type: "menu",
      slug: "s",
      open: true,
    }),
  );
  assert(
    parseChildMessage({
      source: "open-docs",
      type: "menu",
      slug: "s",
      open: false,
    }),
  );
});

Deno.test("parseChildMessage rejects anything else", () => {
  assertEquals(parseChildMessage(null), false);
  assertEquals(parseChildMessage("open-docs"), false);
  assertEquals(
    parseChildMessage({
      source: "editors-arena",
      type: "open",
      name: "x",
      bytes: new ArrayBuffer(0),
    }),
    false,
  );
  // missing fields per type
  assertEquals(parseChildMessage({ source: "open-docs", type: "ready", slug: "s" }), false);
  assertEquals(parseChildMessage({ source: "open-docs", type: "error", slug: "s" }), false);
  assertEquals(parseChildMessage({ source: "open-docs", type: "opened", slug: "s" }), false);
  assertEquals(
    parseChildMessage({
      source: "open-docs",
      type: "exported",
      slug: "s",
      name: "memo",
    }),
    false,
  );
  assertEquals(
    parseChildMessage({
      source: "open-docs",
      type: "exported",
      slug: "s",
      name: "memo",
      bytes: "not-a-buffer",
    }),
    false,
  );
  assertEquals(
    parseChildMessage({
      source: "open-docs",
      type: "error",
      slug: "s",
      message: "x",
      during: "unknown",
    }),
    false,
  );
  assertEquals(parseChildMessage({ source: "open-docs", type: "ready", name: "n" }), false);
  // unknown type, bad startupMs
  assertEquals(parseChildMessage({ source: "open-docs", type: "mystery", slug: "s" }), false);
  assertEquals(
    parseChildMessage({
      source: "open-docs",
      type: "ready",
      slug: "s",
      name: "n",
      startupMs: "fast",
    }),
    false,
  );
  assertEquals(
    parseChildMessage({ source: "open-docs", type: "menu", slug: "s" }),
    false,
  );
  assertEquals(
    parseChildMessage({ source: "open-docs", type: "menu", slug: "s", open: "yes" }),
    false,
  );
});

Deno.test("makeOpen, makeSample, makeExport, and makeMenu build parent messages", () => {
  const bytes = new Uint8Array([1, 2, 3]).buffer;
  const open = makeOpen("memo.docx", bytes);
  assertEquals(open.source, PARENT_SOURCE);
  assertEquals(open.type, "open");
  assertEquals(open.name, "memo.docx");
  assert(open.bytes === bytes);
  const sample = makeSample();
  assertEquals(sample.source, PARENT_SOURCE);
  assertEquals(sample.type, "sample");
  const exp = makeExport();
  assertEquals(exp.source, PARENT_SOURCE);
  assertEquals(exp.type, "export");
  const menu = makeMenu();
  assertEquals(menu.source, PARENT_SOURCE);
  assertEquals(menu.type, "menu");
  assertEquals(CHILD_SOURCE, "open-docs");
  assertEquals(OPEN_DOCS_ORIGIN, "https://open-docs.val.run");
  assertEquals(DEFAULT_SLUGS, ["superdoc", "eigenpal", "docxodus"]);
});

Deno.test("styles: attribute selectors with numeric values are quoted (unquoted digits are invalid CSS)", async () => {
  const { CSS } = await import("./styles.ts");
  const bad = CSS.match(/\[[a-z-]+=\d[^\]]*\]/g);
  if (bad) throw new Error(`unquoted numeric attribute selectors: ${bad.join(", ")}`);
});
