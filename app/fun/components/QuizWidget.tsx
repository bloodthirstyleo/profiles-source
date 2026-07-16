"use client";

import { useMemo, useState } from "react";
import { useTunisContext } from "@/contexts/TunisContext";

type LocalizedText = {
  en: string;
  vi: string;
};

type QuizQuestion = {
  id: string;
  question: LocalizedText;
  options: string[];
  answerIndex: number;
};

export default function QuizWidget({ questions }: { questions: QuizQuestion[] }) {
  const { locale } = useTunisContext();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const score = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.id] === question.answerIndex ? 1 : 0), 0),
    [answers, questions],
  );

  return (
    <section className="glass-panel rounded-2xl p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-fs-13 uppercase tracking-widest text-blue-400 font-bold">{locale === "vi" ? "Do vui nhanh" : "Quick quiz"}</p>
          <h2 className="text-fs-26 font-extrabold text-zinc-100">{locale === "vi" ? "5 cau hoi toc do" : "5 fast questions"}</h2>
        </div>
        <div className="w-16 h-16 rounded-full bg-zinc-900/60 border border-white/10 flex flex-col items-center justify-center shrink-0">
          <span className="text-fs-21 font-extrabold text-blue-300">{score}</span>
          <span className="text-[10px] uppercase text-zinc-500 font-bold">score</span>
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((question, questionIndex) => (
          <fieldset key={question.id} className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
            <legend className="px-2 text-fs-14 font-bold text-zinc-200">
              {questionIndex + 1}. {question.question[locale]}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {question.options.map((option, optionIndex) => {
                const selected = answers[question.id] === optionIndex;
                const answered = question.id in answers;
                const correct = optionIndex === question.answerIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                    className={`min-h-12 rounded-xl border px-4 py-3 text-left text-fs-13 font-semibold transition-colors ${
                      selected
                        ? correct
                          ? "border-emerald-400/70 bg-emerald-500/15 text-emerald-200"
                          : "border-rose-400/70 bg-rose-500/15 text-rose-200"
                        : answered && correct
                          ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                          : "border-white/10 bg-zinc-900/40 text-zinc-300 hover:border-blue-400/60 hover:text-blue-200"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}
