/**
 * Browser module: builds the slot grid, lazy-mounts editor iframes, speaks
 * the postMessage protocol with open-docs and keeps the ?e= URL state.
 */
import { engines, getEngine } from "../engines.ts";
import {
  DEFAULT_SLUGS,
  isChildMessage,
  makeOpen,
  makeSample,
  MAX_SLOTS,
  OPEN_DOCS_ORIGIN,
  type ParentCommand,
  parseState,
  serializeState,
} from "./protocol.ts";

interface Slot {
  index: number;
  slug: string;
  el: HTMLElement | null;
  body: HTMLElement | null;
  statusEl: HTMLElement | null;
  licEl: HTMLElement | null;
  select: HTMLSelectElement | null;
  alone: HTMLAnchorElement | null;
  frame: HTMLIFrameElement | null;
  ready: boolean;
  error: string | null;
  startupMs: number | null;
  openedName: string | null;
  queue: ParentCommand[];
}

const grid = document.getElementById("grid") as HTMLElement;
const colBtns = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".colswitch button"),
);
const fileInput = document.getElementById("file") as HTMLInputElement;
const sampleBtn = document.getElementById("sample") as HTMLButtonElement;

const initial = parseState(location.href);
let cols = initial.length; // 2 or 3

const slots: Slot[] = [];
for (let i = 0; i < MAX_SLOTS; i++) {
  slots.push({
    index: i,
    slug: initial[i] ?? DEFAULT_SLUGS[i],
    el: null,
    body: null,
    statusEl: null,
    licEl: null,
    select: null,
    alone: null,
    frame: null,
    ready: false,
    error: null,
    startupMs: null,
    openedName: null,
    queue: [],
  });
}

const bodyToSlot = new Map<Element, Slot>();
const observer = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    const slot = bodyToSlot.get(en.target);
    if (slot) {
      observer.unobserve(en.target);
      mountFrame(slot);
    }
  }
});

function statusText(s: Slot): string {
  if (s.error !== null) return "Error: " + s.error;
  if (!s.frame) return "Idle";
  if (!s.ready) return "Loading";
  const head = s.startupMs !== null
    ? "Ready in " + Math.round(s.startupMs) + " ms"
    : "Ready";
  return s.openedName ? head + " · opened " + s.openedName : head;
}

function paintStatus(s: Slot): void {
  if (!s.statusEl) return;
  s.statusEl.textContent = statusText(s);
  s.statusEl.classList.toggle("is-ready", s.ready && s.error === null);
  s.statusEl.classList.toggle("is-error", s.error !== null);
}

/** Create the iframe, replacing the slot's placeholder or previous frame. */
function mountFrame(s: Slot): void {
  if (!s.body) return;
  s.frame = null;
  s.ready = false;
  s.error = null;
  s.startupMs = null;
  s.openedName = null;
  const eng = getEngine(s.slug);
  const frame = document.createElement("iframe");
  frame.className = "frame";
  frame.title = (eng ? eng.name : s.slug) + " editor";
  frame.setAttribute("allow", "clipboard-read; clipboard-write");
  frame.loading = "lazy";
  frame.src = OPEN_DOCS_ORIGIN + "/e/" + s.slug + "?embed=1";
  s.body.replaceChildren(frame);
  s.frame = frame;
  paintStatus(s);
}

function mountSlot(s: Slot): void {
  if (s.el) return;
  const eng = getEngine(s.slug);

  const el = document.createElement("section");
  el.className = "slot";

  const head = document.createElement("header");
  head.className = "slot-head";

  const select = document.createElement("select");
  select.className = "engine-select";
  select.setAttribute("aria-label", "Engine for slot " + (s.index + 1));
  for (const e of engines) {
    const opt = document.createElement("option");
    opt.value = e.slug;
    opt.textContent = e.name;
    select.appendChild(opt);
  }
  select.value = s.slug;
  select.addEventListener("change", () => setEngine(s, select.value));

  const lic = document.createElement("span");
  lic.className = "lic";
  lic.textContent = eng ? eng.license : "?";
  if (eng) lic.title = eng.repo;

  const status = document.createElement("span");
  status.className = "st";

  const alone = document.createElement("a");
  alone.className = "alone";
  alone.textContent = "Open alone →";
  alone.target = "_blank";
  alone.rel = "noopener";
  alone.href = OPEN_DOCS_ORIGIN + "/e/" + s.slug;

  head.append(select, lic, status, alone);
  el.appendChild(head);

  const body = document.createElement("div");
  body.className = "slot-body";
  const ph = document.createElement("div");
  ph.className = "ph";
  ph.textContent = "Idle";
  body.appendChild(ph);
  el.appendChild(body);

  s.el = el;
  s.body = body;
  s.statusEl = status;
  s.licEl = lic;
  s.select = select;
  s.alone = alone;
  s.frame = null;
  paintStatus(s);
  grid.appendChild(el);
  bodyToSlot.set(body, s);
  observer.observe(body);
}

/** Remove the slot DOM entirely — dropping the iframe frees its memory. */
function unmountSlot(s: Slot): void {
  if (!s.el) return;
  if (s.body) {
    observer.unobserve(s.body);
    bodyToSlot.delete(s.body);
  }
  s.el.remove();
  s.el = null;
  s.body = null;
  s.statusEl = null;
  s.licEl = null;
  s.select = null;
  s.alone = null;
  s.frame = null;
  s.ready = false;
  s.error = null;
  s.startupMs = null;
  s.openedName = null;
}

function setEngine(s: Slot, slug: string): void {
  if (s.slug === slug) return;
  s.slug = slug;
  const eng = getEngine(slug);
  if (s.licEl) {
    s.licEl.textContent = eng ? eng.license : "?";
    if (eng) s.licEl.title = eng.repo;
  }
  if (s.alone) s.alone.href = OPEN_DOCS_ORIGIN + "/e/" + slug;
  if (s.select) s.select.value = slug;
  if (s.frame) mountFrame(s); // replaces only this slot's iframe
  else paintStatus(s);
  syncUrl();
}

function render(): void {
  grid.dataset.cols = String(cols);
  for (const b of colBtns) {
    b.setAttribute("aria-pressed", String(Number(b.dataset.cols) === cols));
  }
  for (const s of slots) {
    if (s.index < cols) mountSlot(s);
    else unmountSlot(s);
  }
}

function setCols(n: number): void {
  cols = n;
  render();
  syncUrl();
}

function syncUrl(): void {
  const slugs = slots.slice(0, cols).map((s) => s.slug);
  history.replaceState(null, "", location.pathname + serializeState(slugs));
}

function slotByWindow(w: unknown): Slot | null {
  for (const s of slots) {
    if (s.frame && s.frame.contentWindow === w) return s;
  }
  return null;
}

function flush(s: Slot): void {
  const cw = s.frame && s.frame.contentWindow;
  if (!s.ready || !cw) return;
  let m = s.queue.shift();
  while (m) {
    cw.postMessage(m, OPEN_DOCS_ORIGIN);
    m = s.queue.shift();
  }
}

/** Queue the command; it goes out as soon as the slot reports ready. */
function post(s: Slot, msg: ParentCommand): void {
  s.queue.push(msg);
  flush(s);
}

addEventListener("message", (ev) => {
  if (ev.origin !== OPEN_DOCS_ORIGIN) return;
  const slot = slotByWindow(ev.source);
  if (!slot || !isChildMessage(ev.data)) return;
  const d = ev.data;
  if (d.type === "ready") {
    slot.ready = true;
    slot.startupMs = typeof d.startupMs === "number" ? d.startupMs : null;
    slot.error = null;
    paintStatus(slot);
    flush(slot);
  } else if (d.type === "error") {
    slot.error = d.message;
    paintStatus(slot);
  } else if (d.type === "opened") {
    slot.openedName = d.name;
    paintStatus(slot);
  }
});

fileInput.addEventListener("change", async () => {
  const f = fileInput.files && fileInput.files[0];
  if (!f) return;
  const bytes = await f.arrayBuffer();
  // A fresh copy per slot: bytes are cloned into the child by postMessage,
  // and queued copies survive until that slot mounts and reports ready.
  for (const s of slots) post(s, makeOpen(f.name, bytes.slice(0)));
  fileInput.value = "";
});

sampleBtn.addEventListener("click", () => {
  for (const s of slots) post(s, makeSample());
});

for (const b of colBtns) {
  b.addEventListener("click", () => setCols(Number(b.dataset.cols)));
}

render();
