# Reports checklist: arena.benchmarks.law (editors-arena)

Every part this repository publishes. Tick a part only when it has been
updated **and** seen on the live site. The same file exists in `open-docs`,
`open-docs-viewer` and `editors_trial`.

Legend: `[x]` done and checked live · `[~]` in progress · `[ ]` not done ·
`[!]` blocked, with the reason beside it.

## 1. README and home page

- [x] 1.1 What it is. Audited 2026-11-21: the page does what the section says (two or three slots, one engine each, one document in all)
- [x] 1.2 How it works (protocol between the page and each editor frame). Audited 2026-11-21 in Chrome: every frame posted `ready`, then `opened` after "Sample in all"
- [x] 1.3 Engines: fifteen. GenOffice and docs.plus were added 2026-11-21 (seen in Chrome: both panes reach READY and the picker lists fifteen names); office-open (no editor) and Fidus Writer (its export fails) are on the editors site and not offered here. Before that: all thirteen editors of editors.benchmarks.law are listed (the four view-only renderers do not edit, and the README says so)
- [x] 1.4 Development, Files. Audited 2026-11-21: the files named exist; the tests pass (16)

## 2. The arena itself

- [x] 2.1 Every listed engine loads the shared document in its pane. Checked in Chrome 2026-11-21: all thirteen, in five pages of two or three slots, answered `opened` within three seconds of "Sample in all", with no error message. GenOffice and docs.plus, added later that day: both panes showed the sample ("Coastal Wind Farm — Spring…", GenOffice at "Page 1 of 3") after "Sample in all"
- [x] 2.2 The panes are independent by design: one file is opened in all of them and an edit stays in its pane. This line first said an edit reaches the other panes; the arena never did that and its README never said so
- [x] 2.3 The engine picker shows the same names as the other sites (fifteen names read from the live picker, 2026-11-21)

## 3. Cross-site consistency

- [x] 3.1 The top bar links Editors, Viewers, Blog, both repositories and Contact (live 2026-11-21); it has no Measurements or Samples entry because the arena has no such sections
- [x] 3.2 Each engine links to its vendor note at `benchmarks.law/editors-trial/vendor-notes`, the six new tools included since benchmarks.law published their sections (et-v0.10.6, 2026-11-21)

## Log

| Date | Part | What changed |
| --- | --- | --- |
| 2026-11-21 | all | Checklist created |
| 2026-11-21 | 3.2 | Each engine links to its vendor note |
| 2026-11-21 | vendor notes | benchmarks.law has the six new sections; their links are on |
| 2026-11-21 | 1, 2, 3.1 | Audited in Chrome: thirteen engines load and open the sample |
| 2026-11-21 | 1.3 | GenOffice and docs.plus offered; fifteen engines |
