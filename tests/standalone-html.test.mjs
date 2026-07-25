import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const standaloneFile = new URL("../GreedySnake.html", import.meta.url);

test("standalone game is a complete single offline HTML file", async () => {
  const html = await readFile(standaloneFile, "utf8");

  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<style>[\s\S]+<\/style>/i);
  assert.match(html, /<script>[\s\S]+<\/script>/i);
  assert.match(html, /id="board"/);
  assert.match(html, /id="startButton"/);
  assert.match(html, /localStorage/);
  assert.match(html, /ArrowUp/);
  assert.match(html, /touch-action:\s*none/);
});

test("standalone game has no network or external resource dependency", async () => {
  const html = await readFile(standaloneFile, "utf8");

  assert.doesNotMatch(html, /https?:\/\//i);
  assert.doesNotMatch(html, /<script[^>]+\bsrc=/i);
  assert.doesNotMatch(html, /<link[^>]+\bhref=/i);
  assert.doesNotMatch(html, /\bfetch\s*\(/);
  assert.doesNotMatch(html, /\bimport\s*(?:\(|[{*])/);
  assert.doesNotMatch(html, /\bXMLHttpRequest\b/);
});

test("standalone game includes the required gameplay controls", async () => {
  const html = await readFile(standaloneFile, "utf8");

  for (const required of [
    "changeDirection",
    "advanceGame",
    "togglePause",
    "restartGame",
    "game-over",
    "aria-label=\"向上\"",
    "aria-label=\"向下\"",
    "aria-label=\"向左\"",
    "aria-label=\"向右\"",
  ]) {
    assert.ok(html.includes(required), `missing required feature: ${required}`);
  }
});

test("standalone game includes meat food rewards and eating audio", async () => {
  const html = await readFile(standaloneFile, "utf8");

  assert.match(html, /kind:\s*"chicken"[\s\S]*points:\s*10[\s\S]*growth:\s*1/);
  assert.match(html, /kind:\s*"steak"[\s\S]*points:\s*20[\s\S]*growth:\s*2/);
  assert.match(html, /pendingGrowth/);
  assert.match(html, /AudioContext/);
  assert.doesNotMatch(html, /吃下果實/);
});
