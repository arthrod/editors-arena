import { assert, assertEquals } from "jsr:@std/assert";
import {
  CHILD_SOURCE,
  DEFAULT_SLUGS,
  OPEN_DOCS_ORIGIN,
  PARENT_SOURCE,
  isChildMessage,
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

Deno.test("isChildMessage accepts the three message shapes", () => {
  assert(
    isChildMessage({
      source: "open-docs",
      type: "ready",
      slug: "superdoc",
      name: "SuperDoc",
    }),
  );
  assert(
    isChildMessage({
      source: "open-docs",
      type: "ready",
      slug: "s",
      name: "n",
      startupMs: 812,
    }),
  );
  assert(
    isChildMessage({ source: "open-docs", type: "error", slug: "s", message: "boom" }),
  );
  assert(
    isChildMessage({ source: "open-docs", type: "opened", slug: "s", name: "memo.docx" }),
  );
});

Deno.test("isChildMessage rejects anything else", () => {
  assertEquals(isChildMessage(null), false);
  assertEquals(isChildMessage("open-docs"), false);
  assertEquals(
    isChildMessage({
      source: "editors-arena",
      type: "open",
      name: "x",
      bytes: new ArrayBuffer(0),
    }),
    false,
  );
  // missing fields per type
  assertEquals(isChildMessage({ source: "open-docs", type: "ready", slug: "s" }), false);
  assertEquals(isChildMessage({ source: "open-docs", type: "error", slug: "s" }), false);
  assertEquals(isChildMessage({ source: "open-docs", type: "opened", slug: "s" }), false);
  assertEquals(isChildMessage({ source: "open-docs", type: "ready", name: "n" }), false);
  // unknown type, bad startupMs
  assertEquals(isChildMessage({ source: "open-docs", type: "mystery", slug: "s" }), false);
  assertEquals(
    isChildMessage({
      source: "open-docs",
      type: "ready",
      slug: "s",
      name: "n",
      startupMs: "fast",
    }),
    false,
  );
});

Deno.test("makeOpen and makeSample build parent messages", () => {
  const bytes = new Uint8Array([1, 2, 3]).buffer;
  const open = makeOpen("memo.docx", bytes);
  assertEquals(open.source, PARENT_SOURCE);
  assertEquals(open.type, "open");
  assertEquals(open.name, "memo.docx");
  assert(open.bytes === bytes);
  const sample = makeSample();
  assertEquals(sample.source, PARENT_SOURCE);
  assertEquals(sample.type, "sample");
  assertEquals(CHILD_SOURCE, "open-docs");
  assertEquals(OPEN_DOCS_ORIGIN, "https://open-docs.val.run");
  assertEquals(DEFAULT_SLUGS, ["superdoc", "eigenpal", "docxodus"]);
});
