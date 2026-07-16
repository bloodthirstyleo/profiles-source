import type { Metadata } from "next";
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

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 items-start">
          <JokeCard jokes={entertainment.jokes} />
          <QuizWidget questions={entertainment.quizzes} />
        </div>

        <MovieGrid movies={entertainment.movies} />
      </div>
    </main>
  );
}
