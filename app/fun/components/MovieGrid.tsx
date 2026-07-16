"use client";

import { useMemo, useState } from "react";
import { useTunisContext } from "@/contexts/TunisContext";

type LocalizedText = {
  en: string;
  vi: string;
};

type Movie = {
  id: string;
  title: LocalizedText;
  mood: string;
  rating: number;
  funScore: number;
  tagline: LocalizedText;
};

const MOOD_LABELS: Record<string, LocalizedText> = {
  all: { en: "All", vi: "Tat ca" },
  laugh: { en: "Laugh", vi: "Vui nhon" },
  comfort: { en: "Comfort", vi: "De chiu" },
  party: { en: "Party", vi: "Tiec" },
  hype: { en: "Hype", vi: "Bung no" },
};

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  const { locale } = useTunisContext();
  const moods = useMemo(() => ["all", ...Array.from(new Set(movies.map((movie) => movie.mood)))], [movies]);
  const [activeMood, setActiveMood] = useState("all");
  const filtered = activeMood === "all" ? movies : movies.filter((movie) => movie.mood === activeMood);

  return (
    <section className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div>
          <p className="text-fs-13 uppercase tracking-widest text-blue-400 font-bold">{locale === "vi" ? "Phim de xuat" : "Movie picks"}</p>
          <h2 className="text-fs-33 font-extrabold text-zinc-100">{locale === "vi" ? "Ke phim theo tam trang" : "Netflix-style mood shelf"}</h2>
        </div>
        <div className="glass-panel rounded-full p-1.5 flex gap-2 overflow-x-auto max-w-full">
          {moods.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => setActiveMood(mood)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-fs-12 font-bold uppercase tracking-wider transition-colors ${
                activeMood === mood ? "bg-blue-500 text-white" : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
              }`}
            >
              {(MOOD_LABELS[mood] ?? { en: mood, vi: mood })[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((movie, index) => (
          <article
            key={movie.id}
            className="group relative overflow-hidden rounded-2xl min-h-[260px] glass-panel border-white/10 p-5 flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-blue-950" />
            <div className="absolute -top-10 -right-10 text-[140px] font-black leading-none text-white/5 select-none">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-200">
                <i className="fa-solid fa-star text-yellow-300" /> {movie.rating.toFixed(1)} / fun {movie.funScore}
              </span>
              <h3 className="mt-5 text-fs-26 font-extrabold text-zinc-100 group-hover:text-blue-300 transition-colors">
                {movie.title[locale]}
              </h3>
              <p className="mt-3 text-fs-14 text-zinc-400 font-Open-sans leading-relaxed">{movie.tagline[locale]}</p>
              <p className="mt-5 text-fs-12 uppercase tracking-widest text-zinc-500 font-bold">
                {locale === "vi" ? "Tam trang" : "Mood"}: {(MOOD_LABELS[movie.mood] ?? { en: movie.mood, vi: movie.mood })[locale]}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
