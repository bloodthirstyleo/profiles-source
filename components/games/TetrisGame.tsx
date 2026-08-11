"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Cell = string | null;
type Piece = { shape: number[][]; color: string; x: number; y: number };

const width = 10;
const height = 20;
const emptyBoard = () => Array.from({ length: height }, () => Array<Cell>(width).fill(null));
const shapes = [
  { color: "bg-cyan-300", shape: [[1, 1, 1, 1]] },
  { color: "bg-blue-400", shape: [[1, 0, 0], [1, 1, 1]] },
  { color: "bg-amber-300", shape: [[0, 0, 1], [1, 1, 1]] },
  { color: "bg-yellow-300", shape: [[1, 1], [1, 1]] },
  { color: "bg-emerald-300", shape: [[0, 1, 1], [1, 1, 0]] },
  { color: "bg-violet-300", shape: [[0, 1, 0], [1, 1, 1]] },
  { color: "bg-rose-300", shape: [[1, 1, 0], [0, 1, 1]] },
];

function makePiece(index: number): Piece {
  const item = shapes[index];
  return { ...item, shape: item.shape.map((row) => [...row]), x: 3, y: 0 };
}

function nextPiece(): Piece {
  return makePiece(Math.floor(Math.random() * shapes.length));
}

function rotate(shape: number[][]) {
  return shape[0].map((_, x) => shape.map((row) => row[x]).reverse());
}

function collides(board: Cell[][], piece: Piece, dx = 0, dy = 0, shape = piece.shape) {
  return shape.some((row, y) =>
    row.some((cell, x) => {
      if (!cell) return false;
      const nextX = piece.x + x + dx;
      const nextY = piece.y + y + dy;
      return nextX < 0 || nextX >= width || nextY >= height || (nextY >= 0 && Boolean(board[nextY][nextX]));
    }),
  );
}

function merge(board: Cell[][], piece: Piece) {
  const next = board.map((row) => [...row]);
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell && piece.y + y >= 0) next[piece.y + y][piece.x + x] = piece.color;
    });
  });
  return next;
}

function clearLines(board: Cell[][]) {
  const remaining = board.filter((row) => row.some((cell) => !cell));
  const cleared = height - remaining.length;
  return {
    board: [...Array.from({ length: cleared }, () => Array<Cell>(width).fill(null)), ...remaining],
    cleared,
  };
}

function playClearSound() {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = 660;
  gain.gain.setValueAtTime(0.04, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.16);
}

export default function TetrisGame() {
  const [board, setBoard] = useState<Cell[][]>(() => emptyBoard());
  const [piece, setPiece] = useState<Piece>(() => makePiece(0));
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const boardRef = useRef(board);
  const pieceRef = useRef(piece);

  useEffect(() => { boardRef.current = board; }, [board]);
  useEffect(() => { pieceRef.current = piece; }, [piece]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const spawn = useCallback((nextBoard: Cell[][]) => {
    const fresh = nextPiece();
    if (collides(nextBoard, fresh)) {
      setRunning(false);
      setGameOver(true);
    }
    setPiece(fresh);
  }, []);

  const move = useCallback((dx: number, dy: number) => {
    const currentBoard = boardRef.current;
    const currentPiece = pieceRef.current;
    if (!collides(currentBoard, currentPiece, dx, dy)) {
      setPiece({ ...currentPiece, x: currentPiece.x + dx, y: currentPiece.y + dy });
      setRunning(true);
      return true;
    }
    if (dy > 0) {
      const merged = merge(currentBoard, currentPiece);
      const result = clearLines(merged);
      if (result.cleared) {
        if (!mutedRef.current) playClearSound();
        setScore((value) => value + [0, 100, 300, 500, 800][result.cleared]);
      }
      setBoard(result.board);
      spawn(result.board);
    }
    return false;
  }, [spawn]);

  const rotatePiece = useCallback(() => {
    const currentBoard = boardRef.current;
    const currentPiece = pieceRef.current;
    const nextShape = rotate(currentPiece.shape);
    if (!collides(currentBoard, currentPiece, 0, 0, nextShape)) {
      setPiece({ ...currentPiece, shape: nextShape });
      setRunning(true);
    }
  }, []);

  const reset = useCallback(() => {
    const freshBoard = emptyBoard();
    setBoard(freshBoard);
    setPiece(nextPiece());
    setScore(0);
    setRunning(false);
    setGameOver(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Space"].includes(event.key) || event.code === "Space") event.preventDefault();
      if (event.key === "ArrowLeft") move(-1, 0);
      if (event.key === "ArrowRight") move(1, 0);
      if (event.key === "ArrowDown") move(0, 1);
      if (event.key === "ArrowUp" || event.code === "Space") rotatePiece();
      if (event.key === "Enter") setRunning((current) => !current);
    }
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, rotatePiece]);

  useEffect(() => {
    if (!running || gameOver) return;
    const timer = window.setInterval(() => move(0, 1), 520);
    return () => window.clearInterval(timer);
  }, [gameOver, move, running]);

  const display = useMemo(() => {
    const next = board.map((row) => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        if (cell && boardY >= 0 && boardY < height && boardX >= 0 && boardX < width) next[boardY][boardX] = piece.color;
      });
    });
    return next;
  }, [board, piece]);

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-fs-13 font-bold uppercase tracking-widest text-blue-400">Tetris</p>
          <h2 className="text-fs-26 font-extrabold text-zinc-100">Glass block stack</h2>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center text-fs-13 font-bold uppercase tracking-widest">
          <span className="block text-blue-300">{score}</span><span className="text-[10px] text-zinc-500">Score</span>
        </div>
      </div>

      <div className="mx-auto grid aspect-[10/20] w-full max-w-[360px] grid-cols-[repeat(10,minmax(0,1fr))] rounded-2xl border border-blue-400/20 bg-white/[0.04] p-2 shadow-skin-card backdrop-blur-xl">
        {display.flat().map((cell, index) => (
          <div key={index} className="aspect-square p-[2px]">
            <div className={`h-full w-full rounded-[5px] border ${cell ? `${cell} border-white/50 shadow-[inset_0_0_10px_rgba(255,255,255,0.45),0_0_12px_var(--skin-shadow-color)]` : "border-white/[0.04] bg-zinc-950/35"}`} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-3">
          <button type="button" onClick={() => setRunning((current) => !current)} className="btn-glow rounded-full px-5 py-3 text-fs-13 font-bold uppercase text-white">{running ? "Pause" : "Start"}</button>
          <button type="button" onClick={reset} className="rounded-full border border-white/10 px-5 py-3 text-fs-13 font-bold uppercase text-zinc-200 hover:border-blue-400/60">Reset</button>
          <button type="button" onClick={() => setMuted((current) => !current)} className="rounded-full border border-white/10 px-5 py-3 text-fs-13 font-bold uppercase text-zinc-200 hover:border-blue-400/60">{muted ? "Sound off" : "Sound on"}</button>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:hidden" aria-label="Tetris mobile controls">
          <span />
          <Control label="Rotate" onClick={rotatePiece} icon="fa-rotate-right" />
          <span />
          <Control label="Left" onClick={() => move(-1, 0)} icon="fa-arrow-left" />
          <Control label="Down" onClick={() => move(0, 1)} icon="fa-arrow-down" />
          <Control label="Right" onClick={() => move(1, 0)} icon="fa-arrow-right" />
        </div>
      </div>
      {gameOver && <p className="mt-4 text-center text-fs-14 font-bold text-rose-300">Stack locked. Reset for another round.</p>}
      <p className="mt-4 text-center text-fs-12 uppercase tracking-widest text-zinc-500">Move arrows. Rotate with Space or Up.</p>
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


