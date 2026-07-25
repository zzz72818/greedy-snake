# Feature: Meat Food Effects and Eating Sound

**Goal:** Resolve issues #1 and #2 with meat foods that score and grow
differently, plus eating audio in both game distributions.

**Architecture:** Extend the shared TypeScript engine with typed food rewards
and pending growth. Keep audio and visual rendering in the React UI, while
mirroring the same deterministic rules in the standalone HTML.

**Stack:** TypeScript, React 19, Node test runner, Canvas, Web Audio API.

## Global constraints

- Chicken is worth 10 points and 1 growth segment.
- Steak is worth 20 points and 2 growth segments.
- Food effects must not change tick speed.
- `GreedySnake.html` must remain fully offline and self-contained.
- Follow RED-GREEN-REFACTOR and run fresh full verification before commit.

## Tasks

### Task 1: Add typed food rewards to the engine

**Files:** modify `app/game/types.ts`, `app/game/config.ts`,
`app/game/engine.ts`; create `tests/game-engine.test.mjs`.

**Interface consumed:** `GameState` with snake, typed food, direction, score,
status, and pending growth.

**Interface produced:** `advance()` applies the current food's point and growth
rewards; `createFood()` returns chicken or steak on an unoccupied cell.

**Steps:**

1. Add engine tests that load the TypeScript engine through the build output and
   assert chicken gives 10 points/1 growth and steak gives 20 points/2 growth.
2. Run the focused test and confirm it fails because food rewards do not exist.
3. Add `FoodKind`, `Food`, and `pendingGrowth` types and food definitions.
4. Implement reward-aware spawning and growth in `advance()`.
5. Run the focused test and confirm it passes.

### Task 2: Render meat foods and play the eating sound in React

**Files:** modify `app/components/SnakeGame.tsx`, `app/globals.css`,
`tests/rendered-html.test.mjs`.

**Interface consumed:** typed `game.food` and score transitions.

**Interface produced:** chicken/steak board visuals and one synthesized eating
sound per successful food collision.

**Steps:**

1. Add rendered-output assertions for chicken, steak, and the audio hook.
2. Run the rendered test and confirm it fails on missing food/audio markers.
3. Add food-kind CSS classes and accessible labels.
4. Add a small Web Audio helper and call it when `advance()` reports a score
   increase caused by eating.
5. Run the rendered test and confirm it passes.

### Task 3: Mirror behaviour in the standalone game

**Files:** modify `GreedySnake.html`, `tests/standalone-html.test.mjs`.

**Interface consumed:** the standalone snake state and canvas renderer.

**Interface produced:** random chicken/steak foods, their distinct rewards,
multi-step growth, matching meat visuals, and synthesized eating audio.

**Steps:**

1. Add assertions for both food definitions, reward values, pending growth, and
   `AudioContext`.
2. Run the standalone test and confirm it fails for the missing features.
3. Implement the food table, random spawn, reward logic, pending growth,
   canvas meat rendering, and synthesized eating sound.
4. Update user-facing copy so it no longer refers to fruit.
5. Run the standalone test and confirm it passes.

### Task 4: Verify and publish

**Files:** all modified files.

**Steps:**

1. Run `pnpm lint` and require exit code 0.
2. Run `pnpm test` and require all rendered tests to pass.
3. Run `node --test tests/standalone-html.test.mjs` and require all standalone
   tests to pass.
4. Review `git diff --check` and the final diff.
5. Commit with a focused message.
6. Push `codex/issue-1-2-food-effects` to `origin`.
