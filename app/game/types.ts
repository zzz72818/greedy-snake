export type Point = { x: number; y: number };

export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "idle" | "playing" | "paused" | "gameover";

export type GameState = {
  snake: Point[];
  food: Point;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  status: GameStatus;
};
