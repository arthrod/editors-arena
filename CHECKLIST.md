# Reports checklist: arena.benchmarks.law (editors-arena)

Every part this repository publishes. Tick a part only when it has been
updated **and** seen on the live site. The same file exists in `open-docs`,
`open-docs-viewer` and `editors_trial`.

Legend: `[x]` done and checked live · `[~]` in progress · `[ ]` not done ·
`[!]` blocked, with the reason beside it.

## 1. README and home page

- [ ] 1.1 What it is
- [ ] 1.2 How it works (protocol between the page and each editor frame)
- [x] 1.3 Engines: all thirteen editors of editors.benchmarks.law are listed (the four view-only renderers do not edit, and the README says so)
- [ ] 1.4 Development, Files

## 2. The arena itself

- [ ] 2.1 Every listed engine loads the shared document in its pane
- [ ] 2.2 An edit made in one pane reaches the others
- [ ] 2.3 The engine picker shows the same names as the other sites

## 3. Cross-site consistency

- [ ] 3.1 Same menu as editors.benchmarks.law, with the Blog link
- [~] 3.2 Each engine links to its vendor note at `benchmarks.law/editors-trial/vendor-notes` (live 2026-11-21 for the eight whose section is published; the five new editors get their link when benchmarks.law has their sections: empty `VENDOR_NOTE_PENDING` in `engines.ts` then)

## Log

| Date | Part | What changed |
| --- | --- | --- |
| 2026-11-21 | all | Checklist created |
| 2026-11-21 | 3.2 | Each engine links to its vendor note |
