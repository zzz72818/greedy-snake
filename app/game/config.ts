import type { Direction, FoodKind, Point } from "./types";

export const BOARD_SIZE = 20;
export const TICK_MS = 115;
export const FOOD_TYPES: ReadonlyArray<{
  kind: FoodKind;
  points: number;
  growth: number;
}> = [
  { kind: "chicken", points: 10, growth: 1 },
  { kind: "steak", points: 20, growth: 2 },
];

export const DIRECTION_VECTOR: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
};
