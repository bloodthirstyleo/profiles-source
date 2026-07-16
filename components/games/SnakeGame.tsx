"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const size = 16;
const startSnake: Point[] = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];
const startFood: Point = { x: 11, y: 8 };
const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const opposites: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };

function samePoint(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function randomFood(snake: Point[]): Point {
  const open: Point[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!snake.some((part) => part.x === x && part.y === y)) open.push({ x, y });
    }
  }
  return open[Math.floor(Math.random() * open.length)] ?? { x: 0, y: 0 };
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(startSnake);
  const [food, setFood] = useState<Point>(startFood);
  const [direction, setDirection] = useState<Direction>("right");
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const directionRef = useRef<Direction>("right");
  const score = snake.length - startSnake.length;

  useEffect(() => {
    const saved = window.localStorage.getItem("snake-high-score");
    if (saved) setHighScore(Number(saved) || 0);
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      window.localStorage.setItem("snake-high-score", String(score));
    }
  }, [score, highScore]);

  const changeDirection = useCallback((next: Direction) => {
    if (opposites[next] === directionRef.current) return;
    directionRef.current = next;
    setDirection(next);
    setRunning(true);
  }, []);

  const reset = useCallback(() => {
    directionRef.current = "right";
    setDirection("right");
    setSnake(startSnake);
    setFood(startFood);
    setGameOver(false);
    setRunning(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const controlKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"];
      if (controlKeys.includes(event.key)) event.preventDefault();
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") changeDirection("up");
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") changeDirection("down");
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") changeDirection("left");
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") changeDirection("right");
      if (event.key === "Enter") setRunning((current) => !current);
    }
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeDirection]);

  useEffect(() => {
    if (!running || gameOver) return;
    const timer = window.setInterval(() => {
      setSnake((current) => {
        const vector = vectors[directionRef.current];
        const head = { x: current[0].x + vector.x, y: current[0].y + vector.y };
        const hitWall = head.x < 0 || head.x >= size || head.y < 0 || head.y >= size;
        const hitSelf = current.some((part) => samePoint(part, head));
        if (hitWall || hitSelf) {
          setRunning(false);
          setGameOver(true);
          return current;
        }
        const ate = samePoint(head, food);
        const next = [head, ...current];
        if (!ate) next.pop();
        if (ate) setFood(randomFood(next));
        return next;
      });
    }, Math.max(70, 140 - Math.floor(score / 5) * 14));
    return () => window.clearInterval(timer);
  }, [food, gameOver, running, score]);

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-fs-13 font-bold uppercase tracking-widest text-blue-400">Snake</p>
          <h2 className="text-fs-26 font-extrabold text-zinc-100">Neon grid sprint</h2>
        </div>
        <div className="flex gap-3 text-center text-fs-13 font-bold uppercase tracking-widest">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2"><span className="block text-blue-300">{score}</span><span className="text-[10px] text-zinc-500">Score</span></div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2"><span className="block text-blue-300">{highScore}</span><span className="text-[10px] text-zinc-500">Best</span></div>
        </div>
      </div>

      <div className="mx-auto grid aspect-square w-full max-w-[520px] grid-cols-[repeat(16,minmax(0,1fr))] rounded-2xl border border-blue-400/20 bg-zinc-950/70 p-2 shadow-skin-card">
        {Array.from({ length: size * size }, (_, index) => {
          const point = { x: index % size, y: Math.floor(index / size) };
          const bodyIndex = snake.findIndex((part) => samePoint(part, point));
          const isFood = samePoint(food, point);
          return (
            <div key={index} className="aspect-square p-[2px]">
              <div
                className={`h-full w-full rounded-[5px] border ${
                  bodyIndex === 0
                    ? "border-blue-200 bg-[var(--accent-2,#38bdf8)] shadow-[0_0_14px_var(--skin-shadow-color)]"
                    : bodyIndex > -1
                      ? "border-blue-400/40 bg-blue-500/70"
                      : isFood
                        ? "border-amber-200 bg-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.6)]"
                        : "border-white/[0.03] bg-white/[0.02]"
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-3">
          <button type="button" onClick={() => setRunning((current) => !current)} className="btn-glow rounded-full px-5 py-3 text-fs-13 font-bold uppercase text-white">{running ? "Pause" : "Start"}</button>
          <button type="button" onClick={reset} className="rounded-full border border-white/10 px-5 py-3 text-fs-13 font-bold uppercase text-zinc-200 hover:border-blue-400/60">Reset</button>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:hidden" aria-label="Snake mobile controls">
          <span />
          <Control label="Up" onClick={() => changeDirection("up")} icon="fa-arrow-up" />
          <span />
          <Control label="Left" onClick={() => changeDirection("left")} icon="fa-arrow-left" />
          <Control label="Down" onClick={() => changeDirection("down")} icon="fa-arrow-down" />
          <Control label="Right" onClick={() => changeDirection("right")} icon="fa-arrow-right" />
        </div>
      </div>
      {gameOver && <p className="mt-4 text-center text-fs-14 font-bold text-rose-300">Game over. Reset to run again.</p>}
    </section>
  );
}

function Control({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-blue-100 active:scale-95">
      <i className={`fa-solid ${icon}`} />
    </button>
  );
}


