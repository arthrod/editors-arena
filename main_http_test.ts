import { assert, assertEquals } from "jsr:@std/assert";

Deno.env.set("VAL_TOWN_API_KEY", Deno.env.get("VAL_TOWN_API_KEY") ?? "test-only");

const fetchPage = Deno.env.get("MAIN_HTTP_TEST_FETCH");
const HANDLER_IDS = [
  "arena-more",
  "arena-menu",
  "arena-file",
  "arena-sample",
  "arena-cols-2",
  "arena-cols-3",
  "arena-menu-open",
  "arena-menu-sample",
  "arena-menu-cols-2",
  "arena-menu-cols-3",
  "arena-menu-editors",
  "arena-menu-viewers",
  "arena-menu-od-repo",
  "arena-menu-arena-repo",
] as const;

async function getHtml(): Promise<string> {
  if (fetchPage === "1") {
    const res = await fetch("https://editors-arena.val.run/", { redirect: "follow" });
    return await res.text();
  }
  const app = (await import("./main.http.ts")).default;
  const res = await app(new Request("http://localhost/"));
  return await res.text();
}

Deno.test("GET / HTML has open-docs SiteNav wordmark and / arena crumb", async () => {
  const html = await getHtml();
  assertEquals(html.includes(`<header class="site-nav od-bar">`), true);
  assertEquals(html.includes(">CHILL<"), true);
  assertEquals(html.includes(">NEUROTIC<"), true);
  assertEquals(html.includes(`DOCX`), true);
  assertEquals(html.includes(`BENCH`), true);
  assertEquals(html.includes(`class="crumb">/ arena`), true);
});

Deno.test("GET / HTML: every arena nav menu action has a handler id", async () => {
  const html = await getHtml();
  for (const id of HANDLER_IDS) {
    assert(
      html.includes(`id="${id}"`),
      `expected handler id="${id}" in page HTML`,
    );
  }
});
