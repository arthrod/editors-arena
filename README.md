# editors-arena

[![License: MIT](https://img.shields.io/badge/license-MIT-0A0A0A.svg)](LICENSE)
[![Val Town](https://img.shields.io/badge/val_town-editors--arena-FFD400.svg)](https://arena.benchmarks.law)

Two or three open-source DOCX editors on the same document, side by side. Live
at https://arena.benchmarks.law.

## What it is

One page, two or three slots. Each slot holds one DOCX editor in an iframe,
running unmodified from [open-docs](https://editors.benchmarks.law) in embed mode at
`/e/<slug>?embed=1`: no assistant, just the engine. Pick an engine per slot,
open one .docx in all of them, and compare what the same file looks like under
different engines.

## How it works

- Iframes are lazy loaded, always: a frame is created only when its slot is
  active (slot 3 exists only in 3-column mode) and visible
  (IntersectionObserver), with `loading="lazy"` on top. Switching 3 to 2 removes
  the third iframe entirely; changing a slot's engine replaces only that frame.
- State lives in the URL: `?e=superdoc,eigenpal` holds the 2 or 3 engine slugs
  and is updated with `history.replaceState`, so links are shareable. Invalid
  slugs fall back to defaults.
- Parent and child talk over postMessage. The parent accepts a message only when
  `event.origin` is `https://editors.benchmarks.law` and `event.source` is one of the
  slot iframes; it posts to children with that same origin as `targetOrigin`.
  The file's bytes are read once and a fresh copy is posted into every slot.
- Each editor's slot header is the only bar for that editor. Embed mode in
  open-docs renders no chrome inside the iframe; per-slot **SAMPLE** (loads the
  rich sample in that slot only), **MENU** (toggles the
  editor's own menu inside the iframe) and an arrows-out icon (open that engine
  alone in a new tab) sit on the right. Global **Open .docx in all** and
  **Sample in all** stay in the top bar.

Protocol v2 (open-docs embed mode, see PROTOCOL2.md):

```
child -> parent  {source:"open-docs", type:"ready", slug, name, startupMs?}
                 {source:"open-docs", type:"error", slug, message, during?: "mount"|"open"|"export"}
                 {source:"open-docs", type:"opened", slug, name}
                 {source:"open-docs", type:"exported", slug, name, bytes: ArrayBuffer}
                 {source:"open-docs", type:"menu", slug, open: boolean}
parent -> child  {source:"editors-arena", type:"open", name, bytes: ArrayBuffer}
                 {source:"editors-arena", type:"sample"}
                 {source:"editors-arena", type:"export"}
                 {source:"editors-arena", type:"menu"}
```

`name` in `exported` is the document name without extension; the arena appends
`.docx` on download.

## Engines

| Engine          | License          | Source                                                            |
| --------------- | ---------------- | ----------------------------------------------------------------- |
| canvas-editor   | MIT              | [Hufe921/canvas-editor](https://github.com/Hufe921/canvas-editor) |
| Docxodus        | MIT              | [JSv4/Docxodus](https://github.com/JSv4/Docxodus)                 |
| SuperDoc        | AGPL-3.0         | [superdoc/docx-editor](https://github.com/superdoc/docx-editor)   |
| Plate           | MIT              | [udecode/plate](https://github.com/udecode/plate)                 |
| docen           | MIT              | [DemoMacro/docen](https://github.com/DemoMacro/docen)             |
| docx-editor.dev | Apache-2.0       | [eigenpal/docx-editor](https://github.com/eigenpal/docx-editor)   |
| folio           | Apache-2.0       | [stella/folio](https://github.com/stella/folio)                   |
| WordCraft       | Apache-2.0 / MIT | [storytold/wordcraft](https://github.com/storytold/wordcraft)     |

Only engines that actually edit are offered. The list mirrors the open-docs
registry, minus its proprietary viewers and cite-check (an app built on
canvas-editor, not a separate engine).

## Development

```
vt clone https://www.val.town/x/arthrod/editors-arena
deno test -A
deno check --allow-import main.http.ts client/arena.ts
vt push
```

## Files

```
main.http.ts        Hono app: GET / returns the page, /client/* serves modules
client/arena.ts     slot grid, lazy iframes, message routing, URL state
client/protocol.ts  pure helpers (parseState, parseChildMessage, makeOpen, makeMenu, ...)
protocol_test.ts    Deno tests for the pure helpers
engines.ts          the eight engines, copied from the open-docs registry
styles.ts           the page's CSS as a string (benchmarks.law design system)
valtown.d.ts        local copy of the Val Town ambient types
```

`main.http.ts` imports `https://esm.town`, and Deno 2.9 gates remote
specifiers behind `--allow-import`, hence the flag.

MIT license.
