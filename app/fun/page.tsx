import type { Metadata } from "next";
import Link from "next/link";
import entertainment from "@/data/entertainment.json";
import JokeCard from "./components/JokeCard";
import MovieGrid from "./components/MovieGrid";
import QuizWidget from "./components/QuizWidget";

export const metadata: Metadata = {
  title: "Fun - Vo Manh Khanh | Entertainment Hub",
  description: "A small entertainment hub with jokes, quick quizzes and funny movie recommendations.",
};

export default function FunPage() {
  return (
    <main className="w-full min-h-screen pt-24 md:pt-32 pb-28 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-10">
          <p className="text-fs-13 uppercase tracking-[0.28em] text-blue-400 font-bold">Entertainment hub</p>
          <h1 className="mt-3 text-fs-40 md:text-fs-60 leading-lh-1.2 font-black text-zinc-100">
            Fun break, low effort.
          </h1>
          <p className="mt-4 max-w-700 text-fs-16 text-zinc-400 font-Open-sans">
            Jokes, five-question quiz, and movie picks filtered by mood for a quick reset between deep work blocks.
          </p>
        </section>

        <section className="mb-8 glass-panel rounded-2xl p-5 sm:p-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-fs-13 uppercase tracking-[0.22em] text-blue-300 font-bold">Mini arcade</p>
            <h2 className="mt-2 text-fs-26 font-black text-zinc-100">Snake and Tetris are ready.</h2>
            <p className="mt-2 max-w-700 text-fs-14 leading-lh-1.6 text-zinc-400">
              Play keyboard-first classics with mobile D-pad controls and a glass board style that matches the site skin.
            </p>
          </div>
          <Link
            href="/fun/games"
            className="btn-glow inline-flex shrink-0 items-center justify-center gap-3 rounded-full px-5 py-3 text-fs-13 font-bold uppercase tracking-wider text-blue-100"
          >
            <i className="fa-solid fa-gamepad" />
            Play games
          </Link>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 items-start">
          <JokeCard jokes={entertainment.jokes} />
          <QuizWidget questions={entertainment.quizzes} />
        </div>

        <MovieGrid movies={entertainment.movies} />
      </div>
    </main>
  );
}
