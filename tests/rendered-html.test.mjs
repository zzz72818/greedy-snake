import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Greedy Snake game shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Greedy Snake/);
  assert.match(html, /GREEDY/);
  assert.match(html, /SNAKE/);
  assert.match(html, /目前分數/);
  assert.match(html, /最高紀錄/);
  assert.match(html, /food-chicken/);
  assert.match(html, /food-steak/);
  assert.doesNotMatch(html, /吃下果實/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);

  const component = await readFile(
    new URL("../app/components/SnakeGame.tsx", import.meta.url),
    "utf8",
  );
  assert.match(component, /AudioContext/);
});
