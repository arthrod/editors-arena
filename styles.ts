export const CSS = `@font-face{font-family:'Libre Franklin';font-style:normal;font-weight:100 900;font-display:swap;src:url('https://cdn.jsdelivr.net/npm/@fontsource-variable/libre-franklin@5.3.0/files/libre-franklin-latin-wght-normal.woff2') format('woff2')}
@font-face{font-family:'Roboto Mono';font-style:normal;font-weight:100 700;font-display:swap;src:url('https://cdn.jsdelivr.net/npm/@fontsource-variable/roboto-mono@5.3.0/files/roboto-mono-latin-wght-normal.woff2') format('woff2')}
:root{--bg:#fafaf8;--surface:#fff;--ink:#0a0a0a;--muted:#6b6b6b;--faint:#e8e8e5;--mark:#ffd400;--del:#b4232f;--sans:'Libre Franklin',system-ui,-apple-system,sans-serif;--mono:'Roboto Mono',ui-monospace,monospace;--lift:6px 6px 0 #ffd400;--top-h:57px}
html{margin:0;padding:0}
.arena{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5;letter-spacing:-0.01em;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.arena *,.arena *::before,.arena *::after{box-sizing:border-box}
.arena ::selection{background:var(--mark);color:var(--ink)}
.arena a{color:inherit}
.arena :focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.top{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:10px clamp(14px,3vw,28px);background:color-mix(in srgb,var(--bg) 88%,transparent);-webkit-backdrop-filter:saturate(140%) blur(10px);backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid var(--ink)}
.wm{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;white-space:nowrap}
.wm::before{content:'';width:9px;height:9px;background:var(--mark);display:inline-block}
.colswitch{display:inline-flex;align-items:center;border:1px solid var(--ink);background:var(--surface)}
.colswitch .sep{font-family:var(--mono);font-size:11px;color:var(--muted);padding:0 1px}
.colswitch button{appearance:none;border:0;border-radius:0;background:transparent;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.08em;padding:7px 11px;cursor:pointer;color:var(--ink)}
.colswitch button:hover{background:var(--faint)}
.colswitch button[aria-pressed=true]{background:var(--mark)}
.acts{margin-left:auto;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.act{position:relative;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid var(--ink);border-radius:0;background:var(--surface);padding:8px 13px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:transform .18s ease,box-shadow .18s ease,background .18s ease,color .18s ease}
.act:hover{transform:translate(-1px,-1px);box-shadow:var(--lift);background:var(--mark)}
.act:active{transform:none;box-shadow:none}
.act.primary{background:var(--ink);color:#fff}
.act.primary:hover{background:var(--mark);color:var(--ink)}
.act input[type=file]{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;font-size:0}
.go{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);text-decoration:none;white-space:nowrap;background-image:linear-gradient(var(--mark),var(--mark));background-repeat:no-repeat;background-size:0% 42%;background-position:0 88%;transition:background-size .25s ease;padding-bottom:2px}
.go:hover{background-size:100% 42%}
.slots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:14px;min-height:calc(100vh - var(--top-h))}
.slots[data-cols="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}
.slot{display:flex;flex-direction:column;min-width:0;min-height:0;border:1px solid var(--ink);background:var(--surface)}
.slot-head{display:flex;align-items:center;gap:6px;padding:5px 7px;border-bottom:1px solid var(--ink);background:var(--bg);flex-wrap:nowrap;min-width:0}
.engine-select{font-family:var(--mono);font-size:10.5px;font-weight:600;color:var(--ink);background:var(--surface);border:1px solid var(--ink);border-radius:0;padding:3px 5px;cursor:pointer;max-width:110px;min-width:64px;flex:0 1 100px}
.lic{font-family:var(--mono);font-size:9px;letter-spacing:.04em;text-transform:uppercase;color:var(--ink);border:1px solid var(--ink);background:var(--surface);padding:1px 5px;white-space:nowrap;flex:0 0 auto}
.st{font-family:var(--mono);font-size:10px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);flex:1 1 0;min-width:58px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:1px 0}
.st.is-ready{color:var(--ink);background:var(--mark);padding:1px 5px}
.st.is-error{color:#fff;background:var(--del);padding:1px 5px}
.slot-acts{display:flex;align-items:center;gap:4px;flex:0 0 auto;flex-shrink:0}
.slot-act{position:relative;font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid var(--ink);border-radius:0;background:var(--surface);padding:3px 5px;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;line-height:1.2}
.slot-act:hover{background:var(--mark)}
.slot-act input[type=file]{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;font-size:0}
.slot-act.alone{border-color:transparent;background:transparent;padding:3px 2px;background-image:linear-gradient(var(--mark),var(--mark));background-repeat:no-repeat;background-size:0% 42%;background-position:0 88%;transition:background-size .25s ease}
.slot-act.alone:hover{background-color:transparent;background-size:100% 42%}
@media (max-width:1299px){.lic{display:none}}
@media (max-width:1199px){.slot-head{flex-wrap:wrap}}
@media (max-width:820px){.slots{grid-template-columns:1fr}.slot{min-height:70vh}.slot-head{flex-wrap:wrap}}
.slot-body{position:relative;flex:1;min-height:0}
.frame{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:var(--surface)}
.ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);background:var(--surface)}
.foot{border-top:1px solid var(--ink);padding:clamp(28px,5vw,44px) clamp(14px,3vw,28px)}
.foot-label{display:flex;align-items:center;gap:11px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:0 0 14px}
.foot-label::before{content:'';width:9px;height:9px;background:var(--mark);display:inline-block}
.foot-note{max-width:70ch;color:#333;font-size:15px;line-height:1.6;margin:0 0 14px}
.foot-links{display:flex;gap:18px;flex-wrap:wrap}
`;
/**
 * benchmarks.law design system v2 (see DESIGN_BRIEF.md): paper, ink, one
 * #FFD400 highlighter, Libre Franklin + Roboto Mono via the pinned CDN
 * URLs above. Radius 0, 1px ink rules, no shadows at rest, a hard yellow
 * offset on hover. Every rule is scoped under .arena classes so nothing
 * can leak into vendor DOM (the editors are cross-origin iframes anyway).
 */
