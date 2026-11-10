export const CSS = `@font-face{font-family:'Libre Franklin';font-style:normal;font-weight:100 900;font-display:swap;src:url('https://cdn.jsdelivr.net/npm/@fontsource-variable/libre-franklin@5.3.0/files/libre-franklin-latin-wght-normal.woff2') format('woff2')}
@font-face{font-family:'Roboto Mono';font-style:normal;font-weight:100 700;font-display:swap;src:url('https://cdn.jsdelivr.net/npm/@fontsource-variable/roboto-mono@5.3.0/files/roboto-mono-latin-wght-normal.woff2') format('woff2')}
:root{--bg:#fafaf8;--surface:#fff;--ink:#0a0a0a;--muted:#6b6b6b;--faint:#e8e8e5;--mark:#ffd400;--del:#b4232f;--ins:#2a6fdb;--sans:'Libre Franklin',system-ui,-apple-system,sans-serif;--mono:'Roboto Mono',ui-monospace,monospace;--lift:7px 7px 0 #ffd400;--shadow-offset:7px 7px 0 #ffd400;--top-h:52px}
html{margin:0;padding:0}
.arena{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5;letter-spacing:-0.01em;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.arena *,.arena *::before,.arena *::after{box-sizing:border-box}
.arena ::selection{background:var(--mark);color:var(--ink)}
.arena a{color:inherit}
.arena :focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.od-bar{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:10px 14px;flex:none;flex-wrap:nowrap;min-height:52px;height:auto;padding:8px clamp(12px,3vw,28px);min-width:0;background:color-mix(in srgb,var(--bg) 88%,transparent);-webkit-backdrop-filter:saturate(140%) blur(10px);backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid var(--ink);font-family:var(--sans);font-size:13px;line-height:1.45;color:var(--ink);letter-spacing:-.01em}
.site-nav .wm{display:inline-flex;align-items:center;gap:6px;flex:none;font-family:var(--mono);font-weight:700;font-size:13px;line-height:1.4;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;white-space:nowrap}
.site-nav .wm:hover .ins{background-image:linear-gradient(var(--mark),var(--mark));background-repeat:no-repeat;background-size:100% .55em;background-position:0 78%}
.site-nav .logo{display:inline-flex;align-items:center;gap:6px}
.site-nav .wm .dot{color:color-mix(in srgb,var(--ink) 35%,transparent)}
.site-nav .del{color:var(--del);text-decoration:line-through;text-decoration-thickness:2px;text-decoration-color:var(--del)}
.site-nav .ins{color:var(--ins);text-decoration:underline double;text-decoration-color:var(--ins);text-underline-offset:3px}
.site-nav .crumb{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);white-space:nowrap;flex:none}
.od-spacer{flex:1;min-width:4px}
.colswitch{display:inline-flex;align-items:center;border:1px solid var(--ink);background:var(--surface);flex:none}
.colswitch .sep{font-family:var(--mono);font-size:11px;color:var(--muted);padding:0 1px}
.colswitch button{appearance:none;border:0;border-radius:0;background:transparent;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.08em;padding:7px 11px;cursor:pointer;color:var(--ink);height:32px}
.colswitch button:hover{background:var(--faint)}
.colswitch button[aria-pressed=true]{background:var(--mark)}
.od-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:var(--mono);font-size:11px;font-weight:400;letter-spacing:.04em;text-transform:uppercase;line-height:1.2;height:32px;padding:0 10px;border-radius:0;border:1px solid var(--ink);background:var(--surface);color:var(--ink);cursor:pointer;white-space:nowrap;text-decoration:none;flex:none}
.od-btn:hover:not([disabled]){background:var(--mark);color:var(--ink)}
.od-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.od-btn.primary{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.od-btn.primary:hover:not([disabled]){background:var(--mark);color:var(--ink)}
.arena-bar-open{cursor:pointer}
.od-menu-btn[aria-expanded=true]{background:var(--mark);color:var(--ink);border-color:var(--ink)}
.od-menu-btn{flex:none}
.od-burger{display:inline-flex;flex-direction:column;justify-content:space-between;width:14px;height:11px;flex:none}
.od-burger i{display:block;height:1px;background:currentColor;width:100%}
.od-menu-wrap{position:relative;flex:none}
.od-menu{position:absolute;right:0;top:40px;min-width:290px;max-height:calc(100dvh - 64px);overflow:auto;background:var(--surface);border:1px solid var(--ink);border-radius:0;box-shadow:var(--shadow-offset);padding:6px;display:flex;flex-direction:column;z-index:50}
.od-menu[hidden]{display:none}
.od-menu>button,.od-menu>a{font-family:var(--sans);font-size:14px;letter-spacing:-.01em;text-transform:none;text-align:left;padding:8px 10px;border:0;background:none;border-radius:0;color:var(--ink);text-decoration:none;cursor:pointer;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.od-menu>button:hover,.od-menu>a:hover{background:var(--mark)}
.od-menu>button:focus-visible,.od-menu>a:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.od-menu-label{display:flex;align-items:center;gap:8px;padding:8px 10px 2px;font-family:var(--mono);font-size:11px;font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.od-menu-label .sq{width:9px;height:9px;background:var(--mark);display:inline-block;flex:none}
.od-menu hr{border:0;border-top:1px solid var(--faint);margin:4px 2px}
@media (max-width:1180px){.od-bar .crumb{display:none}}
@media (max-width:760px){.arena-bar-cols,.arena-bar-open,.arena-bar-sample{display:none}.od-menu-btn .arena-menu-lbl{display:none}.od-menu-btn{width:32px;padding:0}.od-menu-wrap{position:static}.od-menu{position:absolute;left:8px;right:8px;top:100%;min-width:0;width:auto}}
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
.slot-menu{position:relative;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ink);border:1px solid var(--ink);border-radius:0;background:var(--surface);padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;line-height:1.2;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
.slot-menu:hover{transform:translate(-1px,-1px);box-shadow:var(--lift);background:var(--mark)}
.slot-menu:active{transform:none;box-shadow:none}
.burger{display:inline-flex;flex-direction:column;gap:2px;flex-shrink:0}
.burger i{display:block;width:12px;height:1.5px;background:var(--ink)}
.slot-alone{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex-shrink:0;text-decoration:none;color:var(--ink);border:1px solid transparent;border-radius:0;background:transparent;transition:background .18s ease,border-color .18s ease}
.slot-alone:hover{background:var(--mark);border-color:var(--ink)}
.engine-pick{display:contents}
.engine-pick img{display:none}
@media (max-width:1299px){.lic{display:none}}
@media (max-width:1199px){.slot-head{flex-wrap:wrap}}
@media (max-width:820px){.slots{grid-template-columns:1fr}.slot{min-height:70vh}.slot-head{flex-wrap:wrap}}
/* Phones: the engine dropdown is a boxed numpad icon (the native select sits over it, transparent) and MENU is the boxed burger alone. */
@media (max-width:760px){.slot-head{flex-wrap:nowrap}.engine-pick{display:inline-flex;position:relative;align-items:center;justify-content:center;width:30px;height:30px;flex:none;border:1px solid var(--ink);background:var(--surface);cursor:pointer}.engine-pick img{display:block}.engine-pick .engine-select{position:absolute;inset:0;width:100%;height:100%;min-width:0;max-width:none;opacity:0;cursor:pointer}.engine-pick:hover{background:var(--mark)}.slot-menu .lbl{display:none}.slot-menu:not(.slot-sample){width:30px;height:30px;padding:0;justify-content:center}}
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
