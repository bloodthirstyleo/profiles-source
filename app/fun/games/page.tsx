"use client";

import { useState } from "react";
import SnakeGame from "@/components/games/SnakeGame";
import TetrisGame from "@/components/games/TetrisGame";
import { prefixAssetPath } from "@/lib/utils";

type Game = "snake" | "tetris";

const games: Array<{ id: Game; title: string; copy: string; icon: string; image: string }> = [
  { id: "snake", title: "Snake", copy: "Fast grid chase with saved high score and keyboard or touch controls.", icon: "fa-worm", image: "/assets/img/games/snake-game.jpg" },
  { id: "tetris", title: "Tetris", copy: "Glass blocks, rotate on Space or Up, clear-line sound, mobile controls.", icon: "fa-cubes", image: "/assets/img/games/tetris-game.jpg" },
];

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const active = games.find((game) => game.id === activeGame);

  return (
    <main className="w-full min-h-screen pt-24 md:pt-32 pb-28 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10">
          <p className="text-fs-13 uppercase tracking-[0.28em] text-blue-400 font-bold">Game lobby</p>
          <h1 className="mt-3 text-fs-40 md:text-fs-60 leading-lh-1.2 font-black text-zinc-100">Pick a quick arcade run.</h1>
          <p className="mt-4 max-w-700 text-fs-16 text-zinc-400 font-Open-sans">Two tiny games tuned for short breaks. Open one, play, close, repeat.</p>
        </section>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {games.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => setActiveGame(game.id)}
              className="glass-panel glass-panel-hover rounded-2xl p-0 text-left focus:outline-none focus:ring-2 focus:ring-blue-400/70"
            >
              <img src={prefixAssetPath(game.image)} alt="" className="h-44 w-full rounded-t-2xl object-cover" />
              <div className="p-6">
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/15 text-fs-26 text-blue-200 shadow-skin-card">
                <i className={`fa-solid ${game.icon}`} />
              </span>
              <span className="block text-fs-26 font-extrabold text-zinc-100">{game.title}</span>
              <span className="mt-3 block font-Open-sans text-fs-14 leading-lh-1.6 text-zinc-400">{game.copy}</span>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 px-5 py-3 text-fs-13 font-bold uppercase tracking-widest text-blue-200">
                Play <i className="fa-solid fa-arrow-right" />
              </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeGame && active && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" role="dialog" aria-modal="true" aria-label={`${active.title} game`}>
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveGame(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-500"
              aria-label="Close game"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            {activeGame === "snake" ? <SnakeGame /> : <TetrisGame />}
          </div>
        </div>
      )}
    </main>
  );
}
