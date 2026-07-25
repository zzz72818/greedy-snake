import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "vite";

async function loadEngine() {
  const result = await build({
    configFile: false,
    build: {
      lib: {
        entry: fileURLToPath(new URL("../app/game/engine.ts", import.meta.url)),
        formats: ["es"],
      },
      write: false,
    },
  });
  const output = Array.isArray(result) ? result[0].output : result.output;
  const source = output.find((file) => file.type === "chunk").code;
  return import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
}

function stateWith(food) {
  return {
    snake: [
      { x: 7, y: 10 },
      { x: 6, y: 10 },
      { x: 5, y: 10 },
    ],
    food: { ...food, x: 8, y: 10 },
    direction: "right",
    nextDirection: "right",
    score: 0,
    pendingGrowth: 0,
    status: "playing",
  };
}

test("chicken gives 10 points and one segment of growth", async () => {
  const { advance } = await loadEngine();
  const result = advance(
    stateWith({ kind: "chicken", points: 10, growth: 1 }),
  );

  assert.equal(result.score, 10);
  assert.equal(result.snake.length, 4);
  assert.equal(result.pendingGrowth, 0);
});

test("steak gives 20 points and two segments of growth", async () => {
  const { advance } = await loadEngine();
  const afterEating = advance(
    stateWith({ kind: "steak", points: 20, growth: 2 }),
  );

  assert.equal(afterEating.score, 20);
  assert.equal(afterEating.snake.length, 4);
  assert.equal(afterEating.pendingGrowth, 1);

  const afterNextMove = advance(afterEating);
  assert.equal(afterNextMove.snake.length, 5);
  assert.equal(afterNextMove.pendingGrowth, 0);
});

test("food spawning can select chicken or steak", async () => {
  const { createFood } = await loadEngine();
  const snake = [{ x: 0, y: 0 }];

  assert.equal(createFood(snake, () => 0).kind, "chicken");
  assert.equal(createFood(snake, () => 0.999).kind, "steak");
});
