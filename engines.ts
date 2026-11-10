/**
 * The eight editing engines offered in the arena.
 *
 * Names, licenses, repos and blurbs are copied from the open-docs registry
 * (od-design/server/registry.ts, the single source of truth there). Only
 * engines that actually edit are listed: kind:"viewer" entries are excluded,
 * and so is cite-check, an app built on canvas-editor rather than a
 * separate engine.
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
];

export const engineSlugs: string[] = engines.map((e) => e.slug);

export function getEngine(slug: string): EngineMeta | undefined {
  return engines.find((e) => e.slug === slug);
}
