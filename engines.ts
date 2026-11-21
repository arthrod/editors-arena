/**
 * The thirteen editing engines offered in the arena.
 *
 * Names, licenses, repos and blurbs are copied from the open-docs registry
 * (open-docs/server/registry.ts, the single source of truth there). Only
 * engines that actually edit are listed: kind:"viewer" entries are excluded,
 * and so is cite-check, an app built on canvas-editor rather than a
 * separate engine. The last five were added to open-docs on 2026-11-18.
 * Univer edits, but its open-source packages have no .docx reader: a file
 * opened in its slot arrives as text and headings only.
 */
export interface EngineMeta {
  /** URL segment: https://editors.benchmarks.law/e/<slug> */
  slug: string;
  name: string;
  license: string;
  repo: string;
  /** One line on what makes this editor different. */
  blurb: string;
}

export const engines: EngineMeta[] = [
  {
    slug: "canvas-editor",
    name: "canvas-editor",
    license: "MIT",
    repo: "https://github.com/Hufe921/canvas-editor",
    blurb:
      "Canvas/SVG-rendered paginated editor — the document is drawn, not DOM. Form/EMR oriented.",
  },
  {
    slug: "docxodus",
    name: "Docxodus",
    license: "MIT",
    repo: "https://github.com/JSv4/Docxodus",
    blurb:
      ".NET compiled to WebAssembly: Word-grade rendering, real tracked changes and redlines, all client-side.",
  },
  {
    slug: "superdoc",
    name: "SuperDoc",
    license: "AGPL-3.0",
    repo: "https://github.com/superdoc/docx-editor",
    blurb:
      "Full DOCX editor with comments, track changes and a Vue/React surface. Heaviest of the set.",
  },
  {
    slug: "plate",
    name: "Plate",
    license: "MIT",
    repo: "https://github.com/udecode/plate",
    blurb:
      "Slate-based plugin framework. DOCX comes in through mammoth and goes out through a small OOXML writer, not a native engine.",
  },
  {
    slug: "docen",
    name: "docen",
    license: "MIT",
    repo: "https://github.com/DemoMacro/docen",
    blurb:
      "Canvas web-component editor with a headless Markdown/DOCX conversion API in the same package.",
  },
  {
    slug: "eigenpal",
    name: "docx-editor.dev",
    license: "Apache-2.0",
    repo: "https://github.com/eigenpal/docx-editor",
    blurb: "React DOCX editor adapter with a headless core you can drive yourself.",
  },
  {
    slug: "folio",
    name: "folio",
    license: "Apache-2.0",
    repo: "https://github.com/stella/folio",
    blurb:
      "ProseMirror + paginated layout DOCX editor with first-class AI edit/suggestion primitives.",
  },
  {
    slug: "wordcraft",
    name: "WordCraft",
    license: "Apache-2.0 / MIT",
    repo: "https://github.com/storytold/wordcraft",
    blurb:
      "A clean-room Word in pure Rust: its own layout engine and egui UI drawn into one canvas via WebGPU/WebGL2.",
  },
  {
    slug: "react-docx",
    name: "react-docx",
    license: "MIT",
    repo: "https://github.com/extend-hq/react-docx",
    blurb:
      "Paginated DOCX viewer and editor on a Rust/WASM parser (Rust Office), with review and thumbnails; a framework-free entry with Preact inside.",
  },
  {
    slug: "univer",
    name: "Univer",
    license: "Apache-2.0",
    repo: "https://github.com/dream-num/univer",
    blurb:
      "Office SDK with a canvas document editor. Its open-source packages have no .docx import or export (those are in its Server SDK), so documents arrive here as text.",
  },
  {
    slug: "opendoc",
    name: "OpenDoc",
    license: "Apache-2.0",
    repo: "https://github.com/CasualOffice/opendoc",
    blurb:
      "A deterministic Rust engine in WebAssembly that reads, lays out, paints and saves DOCX and ODT itself, with its own editor application; pre-release.",
  },
  {
    slug: "betteroffice",
    name: "BetterOffice",
    license: "Apache-2.0",
    repo: "https://github.com/openooxml/betteroffice",
    blurb:
      "Rust-native OOXML engines (parse, edit, layout) compiled to WebAssembly and run in a Worker, with a React editor, review cards and collaboration.",
  },
  {
    slug: "onlyoffice",
    name: "OnlyOffice (CryptPad build)",
    license: "AGPL-3.0",
    repo: "https://github.com/cryptpad/onlyoffice-editor",
    blurb:
      "OnlyOffice's document editor with no document server: CryptPad's build replaces the co-editing socket with messages to the page, and OnlyOffice's own converter (x2t) runs in WebAssembly.",
  },
];

/** Where benchmarks.law describes each vendor: one page, one section per tool. */
export const VENDOR_NOTES = "https://benchmarks.law/editors-trial/vendor-notes";
/** Engine → its section's anchor there. Copied from the open-docs registry (VENDOR_NOTE_ANCHOR). */
const VENDOR_NOTE_ANCHOR: Record<string, string> = {
  "canvas-editor": "canvas-editor",
  docxodus: "docxodus",
  superdoc: "superdoc",
  plate: "platejs",
  docen: "docen",
  eigenpal: "eigenpal",
  folio: "folio",
  wordcraft: "wordcraft",
  "react-docx": "react-docx",
  univer: "univer",
  opendoc: "opendoc",
  betteroffice: "betteroffice",
  onlyoffice: "onlyoffice-cryptpad-build",
};
/**
 * Sections written in the trial's vendor notes and not yet on benchmarks.law (they arrive with its
 * next release and deploy). Until then these engines get no link: one would land at the top of the
 * page, not on a note. Empty this set when the page has the sections (CHECKLIST 4.3).
 */
export const VENDOR_NOTE_PENDING: ReadonlySet<string> = new Set(["react-docx", "univer", "opendoc", "betteroffice", "onlyoffice"]);
/** The vendor note of an engine: pros, cons and every benchmark of it. Null when benchmarks.law has no section for it. */
export const vendorNote = (slug: string): string | null =>
  VENDOR_NOTE_ANCHOR[slug] && !VENDOR_NOTE_PENDING.has(slug) ? `${VENDOR_NOTES}#${VENDOR_NOTE_ANCHOR[slug]}` : null;

export const engineSlugs: string[] = engines.map((e) => e.slug);

export function getEngine(slug: string): EngineMeta | undefined {
  return engines.find((e) => e.slug === slug);
}
