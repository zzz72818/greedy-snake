import {
  BOARD_SIZE,
  DIRECTION_VECTOR,
  FOOD_TYPES,
  OPPOSITE,
} from "./config";
import type { Direction, Food, GameState, Point } from "./types";

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export function createFood(
  snake: Point[],
  random: () => number = Math.random,
): Food {
  const free: Point[] = [];
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!snake.some((part) => samePoint(part, { x, y }))) free.push({ x, y });
    }
  }
  const position = free[Math.floor(random() * free.length)] ?? { x: 0, y: 0 };
  const type =
    FOOD_TYPES[Math.floor(random() * FOOD_TYPES.length)] ?? FOOD_TYPES[0];
  return { ...position, ...type };
}

export function createInitialState(): GameState {
  const snake = [
    { x: 7, y: 10 },
    { x: 6, y: 10 },
    { x: 5, y: 10 },
  ];
  return {
    snake,
    food: createFood(snake),
    direction: "right",
    nextDirection: "right",
    score: 0,
    pendingGrowth: 0,
    status: "idle",
  };
}

export function queueDirection(
  current: Direction,
  requested: Direction,
): Direction {
  return OPPOSITE[current] === requested ? current : requested;
}

export function advance(state: GameState): GameState {
  if (state.status !== "playing") return state;

  const direction = state.nextDirection;
  const vector = DIRECTION_VECTOR[direction];
  const head = {
    x: state.snake[0].x + vector.x,
    y: state.snake[0].y + vector.y,
  };
  const hitWall =
    head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE;
  const ate = samePoint(head, state.food);
  const growthBudget =
    state.pendingGrowth + (ate ? state.food.growth : 0);
  const bodyToCheck =
    growthBudget > 0 ? state.snake : state.snake.slice(0, -1);
  const hitSelf = bodyToCheck.some((part) => samePoint(part, head));

  if (hitWall || hitSelf) return { ...state, status: "gameover" };

  const snake = [head, ...state.snake];
  if (growthBudget === 0) snake.pop();

  return {
    ...state,
    snake,
    direction,
    score: ate ? state.score + state.food.points : state.score,
    pendingGrowth: Math.max(0, growthBudget - 1),
    food: ate ? createFood(snake) : state.food,
  };
}
