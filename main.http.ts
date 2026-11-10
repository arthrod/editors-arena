/**
 * editors-arena — two or three open-source DOCX editors side by side on the
 * same document. Each editor runs unmodified in an iframe pointed at the
 * open-docs val in embed mode (/e/<slug>?embed=1), lazy loaded.
 *
 * GET / returns the page; /client/* serves the browser modules and
 * /engines.ts serves the engine list the client imports.
 */
import { Hono } from "npm:hono@4";
import { serveFile } from "https://esm.town/v/std/utils/index.ts";
import { CSS } from "./styles.ts";

const app = new Hono();

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Editors Arena · open-source DOCX editors, side by side</title>
<meta name="description" content="Two or three open-source DOCX editors on the same document, side by side, each running unmodified from open-docs.">
<style>${CSS}</style>
</head>
<body class="arena">
<header class="site-nav od-bar">
  <a class="wm" href="/" title="Editors Arena">
    <span class="logo"><span class="del">CHILL</span><span class="ins">NEUROTIC</span></span><span class="dot">.</span>DOCX<span class="dot">.</span>BENCH
  </a>
  <span class="crumb">/ arena</span>
  <span class="od-spacer"></span>
  <span class="colswitch arena-bar-cols" role="group" aria-label="Columns">
    <button type="button" id="arena-cols-2" data-cols="2">2</button><span class="sep">·</span><button type="button" id="arena-cols-3" data-cols="3">3</button>
  </span>
  <label class="od-btn primary arena-bar-open" id="arena-open-wrap" title="Open a .docx in every editor">Open .docx in all<input id="arena-file" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden></label>
  <button id="arena-sample" class="od-btn arena-bar-sample" type="button">Sample in all</button>
  <div class="od-menu-wrap">
    <button class="od-btn od-menu-btn" id="arena-more" type="button" title="Menu" aria-haspopup="menu" aria-expanded="false" aria-controls="arena-menu">
      <span class="od-burger" aria-hidden="true"><i></i><i></i><i></i></span><span class="arena-menu-lbl">MENU</span>
    </button>
    <div class="od-menu" id="arena-menu" role="menu" hidden>
      <div class="od-menu-label"><span class="sq" aria-hidden="true"></span> / Document</div>
      <button type="button" role="menuitem" id="arena-menu-open">Open .docx in all</button>
      <button type="button" role="menuitem" id="arena-menu-sample">Sample in all</button>
      <hr>
      <div class="od-menu-label"><span class="sq" aria-hidden="true"></span> / Layout</div>
      <button type="button" role="menuitem" id="arena-menu-cols-2">2 columns</button>
      <button type="button" role="menuitem" id="arena-menu-cols-3">3 columns</button>
      <hr>
      <div class="od-menu-label"><span class="sq" aria-hidden="true"></span> / Links</div>
      <a role="menuitem" id="arena-menu-editors" href="https://editors.benchmarks.law" target="_blank" rel="noopener">Editors →</a>
      <a role="menuitem" id="arena-menu-viewers" href="https://viewers.benchmarks.law" target="_blank" rel="noopener">Viewers →</a>
      <a role="menuitem" id="arena-menu-od-repo" href="https://github.com/arthrod/open-docs" target="_blank" rel="noopener">open-docs repo →</a>
      <a role="menuitem" id="arena-menu-arena-repo" href="https://github.com/arthrod/editors-arena" target="_blank" rel="noopener">editors-arena repo →</a>
      <a role="menuitem" id="arena-menu-contact" href="https://arthur.law/contact" target="_blank" rel="noopener">Contact →</a>
    </div>
  </div>
</header>
<main id="grid" class="slots" data-cols="2"></main>
<footer class="foot">
  <p class="foot-label">/ About</p>
  <p class="foot-note">editors-arena puts two or three open-source DOCX editors on the same document, side by side. Each frame loads an editor unmodified from open-docs in embed mode: no assistant, just the engine. Your file's bytes never leave this page; they are posted straight into each frame.</p>
  <nav class="foot-links">
    <a class="go" href="https://github.com/arthrod/open-docs" target="_blank" rel="noopener">open-docs repo →</a>
    <a class="go" href="https://github.com/arthrod/editors-arena" target="_blank" rel="noopener">editors-arena repo →</a>
  </nav>
</footer>
<script type="module" src="/client/arena.ts"></script>
</body>
</html>`;

app.get("/", (c) => c.html(PAGE));

// Client modules are served straight from the val.
app.get("/client/*", (c) => serveFile(c.req.path, import.meta.url));
app.get("/engines.ts", (c) => serveFile(c.req.path, import.meta.url));

// Unwrap Hono errors to see original error details.
app.onError((err) => Promise.reject(err));

export default app.fetch;
