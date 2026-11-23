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

Protocol v2 (open-docs embed mode; this block and the header of `client/protocol.ts` are its only description):

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

| Engine                      | Slug            | License          | Source                                                                      |
| --------------------------- | --------------- | ---------------- | --------------------------------------------------------------------------- |
| canvas-editor               | `canvas-editor` | MIT              | [Hufe921/canvas-editor](https://github.com/Hufe921/canvas-editor)           |
| Docxodus                    | `docxodus`      | MIT              | [JSv4/Docxodus](https://github.com/JSv4/Docxodus)                           |
| SuperDoc                    | `superdoc`      | AGPL-3.0         | [superdoc/docx-editor](https://github.com/superdoc/docx-editor)             |
| Plate                       | `plate`         | MIT              | [udecode/plate](https://github.com/udecode/plate)                           |
| docen                       | `docen`         | MIT              | [DemoMacro/docen](https://github.com/DemoMacro/docen)                       |
| docx-editor.dev             | `eigenpal`      | Apache-2.0       | [eigenpal/docx-editor](https://github.com/eigenpal/docx-editor)             |
| folio                       | `folio`         | Apache-2.0       | [stella/folio](https://github.com/stella/folio)                             |
| WordCraft                   | `wordcraft`     | Apache-2.0 / MIT | [storytold/wordcraft](https://github.com/storytold/wordcraft)               |
| react-docx                  | `react-docx`    | MIT              | [extend-hq/react-docx](https://github.com/extend-hq/react-docx)             |
| Univer                      | `univer`        | Apache-2.0       | [dream-num/univer](https://github.com/dream-num/univer)                     |
| OpenDoc                     | `opendoc`       | Apache-2.0       | [CasualOffice/opendoc](https://github.com/CasualOffice/opendoc)             |
| BetterOffice                | `betteroffice`  | Apache-2.0       | [openooxml/betteroffice](https://github.com/openooxml/betteroffice)         |
| OnlyOffice (CryptPad build) | `onlyoffice`    | AGPL-3.0         | [cryptpad/onlyoffice-editor](https://github.com/cryptpad/onlyoffice-editor) |
| GenOffice                   | `genoffice`     | Apache-2.0       | [genspark-ai/genoffice](https://github.com/genspark-ai/genoffice)           |
| docs.plus                   | `docs-plus`     | MIT              | [docs-plus/docs.plus](https://github.com/docs-plus/docs.plus)               |

Fifteen engines: every editor in the open-docs registry but two. office-open is left out
because it is a library with no editor; Fidus Writer edits, but is left out because its .docx
export fails on the samples, so an edit made in it could not be read back. Univer has no .docx
export at all and is offered (see below): these are two exclusions, not one rule. The list mirrors
the open-docs registry, minus its proprietary viewers and cite-check (an app
built on canvas-editor, not a separate engine). The slug is what goes in the
URL: `?e=onlyoffice,opendoc,betteroffice`.

react-docx, Univer, OpenDoc, BetterOffice and OnlyOffice were added on 2026-11-20, two days after open-docs got them:

- **Univer** edits, but its open-source packages have no .docx reader. A file
  opened in its slot arrives as text and headings, read by open-docs; what you
  see there is not Univer's rendering of the file.
- **OpenDoc** and **OnlyOffice** each run their own application in a frame
  inside the slot's frame, and download about 20 MB and 18 MB to start
  (WordCraft: 22 MB).
- **SuperDoc** and **OnlyOffice** are AGPL-3.0.

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
engines.ts          the fifteen engines, copied from the open-docs registry
styles.ts           the page's CSS as a string (benchmarks.law design system)
valtown.d.ts        local copy of the Val Town ambient types
```

`main.http.ts` imports `https://esm.town`, and Deno 2.9 gates remote
specifiers behind `--allow-import`, hence the flag.

MIT license.
