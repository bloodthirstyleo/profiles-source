"use client";

import { useState } from "react";
import { useTunisContext } from "@/contexts/TunisContext";

type LocalizedText = {
  en: string;
  vi: string;
};

type Joke = {
  id: string;
  rating: number;
  text: LocalizedText;
  author: LocalizedText;
};

export default function JokeCard({ jokes }: { jokes: Joke[] }) {
  const { locale } = useTunisContext();
  const [index, setIndex] = useState(0);
  const joke = jokes[index];

  function nextJoke() {
    setIndex((current) => (current + 1) % jokes.length);
  }

  return (
    <section className="glass-panel rounded-2xl p-6 sm:p-7 min-h-[280px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-500/15 text-blue-300 flex items-center justify-center">
            <i className="fa-solid fa-face-laugh-beam text-fs-21" />
          </div>
          <span className="rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1 text-fs-12 font-bold text-blue-200">
            {joke.rating.toFixed(1)} fun
          </span>
        </div>
        <p className="text-fs-21 sm:text-fs-26 leading-lh-1.4 font-bold text-zinc-100">"{joke.text[locale]}"</p>
        <p className="mt-4 text-fs-13 uppercase tracking-wider text-zinc-500 font-semibold">{joke.author[locale]}</p>
      </div>
      <button
        type="button"
        onClick={nextJoke}
        className="mt-8 inline-flex items-center justify-center gap-3 rounded-full btn-glow px-5 py-3 text-fs-13 font-bold uppercase tracking-wider text-blue-100"
      >
        <i className="fa-solid fa-shuffle" />
        {locale === "vi" ? "Cau khac" : "Random joke"}
      </button>
    </section>
  );
}
