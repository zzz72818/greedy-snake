"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BOARD_SIZE, KEY_TO_DIRECTION, TICK_MS } from "../game/config";
import { advance, createInitialState, queueDirection } from "../game/engine";
import type { Direction, GameState } from "../game/types";

const HIGH_SCORE_KEY = "greedy-snake-high-score";

function playEatingSound(audio: AudioContext | null) {
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const now = audio.currentTime;

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(440, now);
  oscillator.frequency.exponentialRampToValueAtTime(680, now + 0.09);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.12);
}

export function SnakeGame() {
  const [game, setGame] = useState<GameState>(createInitialState);
  const [highScore, setHighScore] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);
  const previousScoreRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  const ensureAudio = useCallback(() => {
    audioRef.current ??= new window.AudioContext();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHighScore(Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ate = game.score > previousScoreRef.current;
    previousScoreRef.current = game.score;
    if (!ate) return;
    playEatingSound(audioRef.current);
    if (game.score <= highScore) return;
    localStorage.setItem(HIGH_SCORE_KEY, String(game.score));
    const timer = window.setTimeout(() => setHighScore(game.score), 0);
    return () => window.clearTimeout(timer);
  }, [game.score, highScore]);

  useEffect(() => {
    if (game.status !== "playing") return;
    const timer = window.setInterval(() => setGame(advance), TICK_MS);
    return () => window.clearInterval(timer);
  }, [game.status]);

  const changeDirection = useCallback((direction: Direction) => {
    ensureAudio();
    setGame((current) => ({
      ...current,
      nextDirection: queueDirection(current.direction, direction),
      status: current.status === "idle" ? "playing" : current.status,
    }));
  }, [ensureAudio]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        changeDirection(direction);
      }
      if (event.code === "Space") {
        event.preventDefault();
        setGame((current) => ({
          ...current,
          status:
            current.status === "playing"
              ? "paused"
              : current.status === "paused"
                ? "playing"
                : current.status,
        }));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeDirection]);

  const startOrRestart = () => {
    ensureAudio();
    setGame({ ...createInitialState(), status: "playing" });
    boardRef.current?.focus();
  };

  const togglePause = () => {
    setGame((current) => ({
      ...current,
      status: current.status === "playing" ? "paused" : "playing",
    }));
  };

  return (
    <section className="game-card" aria-label="貪食蛇遊戲">
      <header className="scorebar">
        <div>
          <span className="score-label">目前分數</span>
          <strong>{String(game.score).padStart(3, "0")}</strong>
        </div>
        <span className="round-badge">ROUND 01</span>
        <div className="best-score">
          <span className="score-label">最高紀錄</span>
          <strong>{String(highScore).padStart(3, "0")}</strong>
        </div>
      </header>

      <div
        ref={boardRef}
        className="board"
        tabIndex={0}
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
        aria-label={`遊戲盤，目前分數 ${game.score}`}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const snakeIndex = game.snake.findIndex(
            (part) => part.x === x && part.y === y,
          );
          const isFood = game.food.x === x && game.food.y === y;
          const cellClass = [
            "cell",
            snakeIndex === 0 ? "snake snake-head" : "",
            snakeIndex > 0 ? "snake" : "",
            isFood ? "food" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const foodLabel =
            game.food.kind === "chicken"
              ? "雞腿，10 分，成長 1 格"
              : "牛排，20 分，成長 2 格";
          return (
            <span
              className={`${cellClass}${isFood ? ` food-${game.food.kind}` : ""}`}
              key={index}
              aria-label={isFood ? foodLabel : undefined}
            >
              {isFood ? (game.food.kind === "chicken" ? "🍗" : "🥩") : null}
            </span>
          );
        })}

        {game.status !== "playing" && (
          <div className="game-overlay">
            <span>
              {game.status === "gameover"
                ? "GAME OVER"
                : game.status === "paused"
                  ? "PAUSED"
                  : "READY?"}
            </span>
            <button type="button" onClick={startOrRestart}>
              {game.status === "gameover" ? "再玩一次" : "開始遊戲"}
            </button>
          </div>
        )}
      </div>

      <div className="food-legend" aria-label="食物效果">
        <span className="food-chicken">🍗 雞腿：10 分・成長 1 格</span>
        <span className="food-steak">🥩 牛排：20 分・成長 2 格</span>
      </div>

      <div className="controls">
        <div className="dpad" aria-label="觸控方向鍵">
          <button aria-label="向上" onClick={() => changeDirection("up")}>↑</button>
          <button aria-label="向左" onClick={() => changeDirection("left")}>←</button>
          <button aria-label="向下" onClick={() => changeDirection("down")}>↓</button>
          <button aria-label="向右" onClick={() => changeDirection("right")}>→</button>
        </div>
        <button
          className="pause-button"
          type="button"
          onClick={togglePause}
          disabled={game.status === "idle" || game.status === "gameover"}
        >
          {game.status === "paused" ? "繼續" : "暫停"} <span>SPACE</span>
        </button>
      </div>
    </section>
  );
}
