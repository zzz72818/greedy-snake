export type Point = { x: number; y: number };

export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "idle" | "playing" | "paused" | "gameover";

export type FoodKind = "chicken" | "steak";

export type Food = Point & {
  kind: FoodKind;
  points: number;
  growth: number;
};

export type GameState = {
  snake: Point[];
  food: Food;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  pendingGrowth: number;
  status: GameStatus;
};
