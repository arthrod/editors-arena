/**
 * Pure helpers for the editors-arena postMessage protocol and URL state.
 * No DOM access: every function here is unit-tested in protocol_test.ts.
 *
 * Embed protocol v2 (see PROTOCOL2.md):
 *   child -> parent: ready | error | opened | exported | menu
 *   parent -> child: open | sample | export | menu
 */
import { engineSlugs } from "../engines.ts";

/** The only origin a child message is accepted from, and the only
 * targetOrigin the parent posts to. */
export const OPEN_DOCS_ORIGIN = "https://editors.benchmarks.law";

export const CHILD_SOURCE = "open-docs";
export const PARENT_SOURCE = "editors-arena";

/** Default engines per slot: slot 1, slot 2, slot 3. */
export const DEFAULT_SLUGS = ["superdoc", "eigenpal", "docxodus"] as const;

export const MIN_SLOTS = 2;
export const MAX_SLOTS = 3;

export type ErrorDuring = "mount" | "open" | "export";

export interface ReadyMessage {
  source: typeof CHILD_SOURCE;
  type: "ready";
  slug: string;
  name: string;
  startupMs?: number;
}
export interface ErrorMessage {
  source: typeof CHILD_SOURCE;
  type: "error";
  slug: string;
  message: string;
  during?: ErrorDuring;
}
export interface OpenedMessage {
  source: typeof CHILD_SOURCE;
  type: "opened";
  slug: string;
  name: string;
}
export interface ExportedMessage {
  source: typeof CHILD_SOURCE;
  type: "exported";
  slug: string;
  name: string;
  bytes: ArrayBuffer;
}
export interface MenuMessage {
  source: typeof CHILD_SOURCE;
  type: "menu";
  slug: string;
  open: boolean;
}
export type ChildMessage =
  | ReadyMessage
  | ErrorMessage
  | OpenedMessage
  | ExportedMessage
  | MenuMessage;

export interface OpenCommand {
  source: typeof PARENT_SOURCE;
  type: "open";
  name: string;
  bytes: ArrayBuffer;
}
export interface SampleCommand {
  source: typeof PARENT_SOURCE;
  type: "sample";
}
export interface ExportCommand {
  source: typeof PARENT_SOURCE;
  type: "export";
}
export interface MenuCommand {
  source: typeof PARENT_SOURCE;
  type: "menu";
}
export type ParentCommand =
  | OpenCommand
  | SampleCommand
  | ExportCommand
  | MenuCommand;

/**
 * Read the ?e= state: 2 or 3 comma-separated slugs.
 *
 * - missing e -> first two defaults
 * - a slug that is not in validSlugs falls back to the default for its
 *   position (duplicates are allowed, per the UI)
 * - more than three slugs -> first three
 * - fewer than two -> padded with defaults
 */
export function parseState(
  url: string | URL,
  validSlugs: readonly string[] = engineSlugs,
): string[] {
  const u = typeof url === "string" ? new URL(url, "https://arena.benchmarks.law") : url;
  const raw = u.searchParams.get("e");
  const slugs: string[] = raw === null
    ? DEFAULT_SLUGS.slice(0, MIN_SLOTS)
    : raw
      .split(",")
      .slice(0, MAX_SLOTS)
      .map((s, i) => {
        const slug = s.trim();
        return validSlugs.includes(slug) ? slug : DEFAULT_SLUGS[i] ?? DEFAULT_SLUGS[0];
      });
  while (slugs.length < MIN_SLOTS) slugs.push(DEFAULT_SLUGS[slugs.length]);
  return slugs;
}

/** ["a","b"] -> "?e=a,b" — appended to the path via history.replaceState. */
export function serializeState(slugs: readonly string[]): string {
  return "?e=" + slugs.join(",");
}

/** Shape-check a postMessage payload as a child -> parent message. */
export function parseChildMessage(data: unknown): data is ChildMessage {
  if (data === null || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (d.source !== CHILD_SOURCE) return false;
  if (typeof d.slug !== "string") return false;
  switch (d.type) {
    case "ready":
      return typeof d.name === "string" &&
        (d.startupMs === undefined || typeof d.startupMs === "number");
    case "opened":
      return typeof d.name === "string";
    case "exported":
      return typeof d.name === "string" && d.bytes instanceof ArrayBuffer;
    case "error":
      return typeof d.message === "string" &&
        (d.during === undefined ||
          d.during === "mount" || d.during === "open" || d.during === "export");
    case "menu":
      return typeof d.open === "boolean";
    default:
      return false;
  }
}

/** Parent -> child: open these .docx bytes under this file name. */
export function makeOpen(name: string, bytes: ArrayBuffer): OpenCommand {
  return { source: PARENT_SOURCE, type: "open", name, bytes };
}

/** Parent -> child: open the built-in sample document. */
export function makeSample(): SampleCommand {
  return { source: PARENT_SOURCE, type: "sample" };
}

/** Parent -> child: export the current document as .docx bytes. */
export function makeExport(): ExportCommand {
  return { source: PARENT_SOURCE, type: "export" };
}

/** Parent -> child: toggle the embed menu inside this editor. */
export function makeMenu(): MenuCommand {
  return { source: PARENT_SOURCE, type: "menu" };
}
