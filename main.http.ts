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
<header class="top">
  <a class="wm" href="/">Editors Arena</a>
  <span class="colswitch" role="group" aria-label="Columns">
    <button type="button" data-cols="2">2</button><span class="sep">·</span><button type="button" data-cols="3">3</button>
  </span>
  <nav class="acts">
    <label class="act primary" title="Open a .docx in every editor">Open .docx in all<input id="file" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></label>
    <button id="sample" class="act" type="button">Sample in all</button>
    <a class="go" href="https://open-docs.val.run" target="_blank" rel="noopener">open-docs →</a>
  </nav>
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
