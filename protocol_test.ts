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

const U = (q: string) => "https://arena.benchmarks.law/" + q;

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
  assertEquals(OPEN_DOCS_ORIGIN, "https://editors.benchmarks.law");
  assertEquals(DEFAULT_SLUGS, ["superdoc", "eigenpal", "docxodus"]);
});

Deno.test("styles: attribute selectors with numeric values are quoted (unquoted digits are invalid CSS)", async () => {
  const { CSS } = await import("./styles.ts");
  const bad = CSS.match(/\[[a-z-]+=\d[^\]]*\]/g);
  if (bad) throw new Error(`unquoted numeric attribute selectors: ${bad.join(", ")}`);
});

Deno.test("engines: the five added to open-docs on 2026-11-18 are offered, once each", async () => {
  const { engines, engineSlugs, getEngine } = await import("./engines.ts");
  for (const slug of ["react-docx", "univer", "opendoc", "betteroffice", "onlyoffice"]) {
    assert(engineSlugs.includes(slug), `${slug} is missing from the arena`);
    assert(getEngine(slug)?.repo.startsWith("https://github.com/"), `${slug} has no repository`);
  }
  for (const slug of ["genoffice", "docs-plus"]) assert(engineSlugs.includes(slug), `${slug} is missing from the arena`);
  for (const slug of ["office-open", "fidus-writer"]) assert(!engineSlugs.includes(slug), `${slug} does not edit here and must not be offered`);
  assertEquals(engines.length, 15);
  assertEquals(new Set(engineSlugs).size, engineSlugs.length);
});

Deno.test("every arena engine has a vendor note on benchmarks.law, at the open-docs registry's anchor", async () => {
  const { engines, vendorNote } = await import("./engines.ts");
  // The registry is the source the anchors were copied from: every engine's link must be the one it gives
  // (outside review, 2026-11-23: a wrong anchor lands at the top of the page and no test saw it).
  // Live on purpose: a pinned copy would agree with itself and miss the drift this test exists to catch.
  const res = await fetch("https://esm.town/v/arthrod/open-docs/server/registry.ts", { redirect: "manual" });
  await res.body?.cancel();
  const loc = res.headers.get("location");
  // Fail with the reason, not with an import error on an HTML error page (Gitar on #17).
  if (!(res.status === 200 || (res.status >= 300 && res.status < 400 && loc))) {
    throw new Error(`esm.town answered ${res.status} for the open-docs registry; the comparison needs the network`);
  }
  const registry = await import(new URL(loc ?? "/v/arthrod/open-docs/server/registry.ts", "https://esm.town").href);
  for (const e of engines) {
    const want = registry.vendorNote(e.slug);
    if (!want) throw new Error(`${e.slug}: the registry has no vendor note for it`);
    if (vendorNote(e.slug) !== want) throw new Error(`${e.slug}: ${vendorNote(e.slug)} is not the registry's ${want}`);
  }
  for (const s of ["nope", "constructor", "toString"]) if (vendorNote(s) !== null) throw new Error(`unknown slug ${s}`);
});

Deno.test("a section not yet published gets no link, never one to the top of the page", async () => {
  const { vendorNote } = await import("./engines.ts");
  if (vendorNote("plate", new Set(["plate"])) !== null) throw new Error("linked before its section is published");
  if (vendorNote("plate", new Set(["folio"])) === null) throw new Error("another engine's pending section hid this one");
});

Deno.test("styles: the licence chip, the only link to an engine's vendor note, is never hidden; narrow panes show it as a small 'i'", async () => {
  // Outside review, 2026-11-23: below 1300 px the chip was display:none, so the vendor note had no link at all.
  const { CSS } = await import("./styles.ts");
  const flat = CSS.replace(/\/\*[\s\S]*?\*\//g, "");
  if (/\.lic\{[^}]*display:none/.test(flat)) throw new Error("a rule hides the licence chip");
  const narrow = flat.match(/@media \(max-width:1299px\)\{([\s\S]*?\})\}/)?.[1] ?? "";
  if (!/\.lic::after\{[^}]*content:"i"/.test(narrow)) throw new Error("narrow panes do not show the chip as an 'i'");
  if (!/\.lic\{[^}]*font-size:0/.test(narrow)) throw new Error("the licence text is not folded away in narrow panes");
});
