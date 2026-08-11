"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import { portfolioWorks } from "@/data/siteData";
import { prefixAssetPath } from "@/lib/utils";
import { useTunisContext } from "@/contexts/TunisContext";

export default function PortfolioSection() {
  const { popupToggle, t } = useTunisContext();
  const portfolio = t.portfolio;
  const categories = ["All", ...Array.from(new Set(portfolioWorks.map((w) => w.category)))] as string[];
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? portfolioWorks
      : portfolioWorks.filter((w) => w.category === activeFilter);

  return (
    <section id="works" className="relative w-full pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      <AuroraBackdrop />
      <div className="max-w-6xl w-full mx-auto">
        <SectionTitle bigTitle={t.section.worksBig} colorTitle={t.section.worksColor} normalTitle={t.section.worksNormal} />

        <Reveal as="div" className="flex justify-center mb-12">
          <div className="glass-panel p-1.5 rounded-full flex flex-wrap gap-2 max-w-full overflow-x-auto justify-center">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`py-2 px-6 rounded-full text-fs-13 font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                  }`}
                >
                  {cat === "All" ? portfolio.all : cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filtered.map((work, index) => (
            <Reveal
              key={work.id}
              as="article"
              delay={(index % 3) * 90}
              className="group relative glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col justify-between overflow-hidden hover:shadow-skin-glow will-change-transform"
            >
              <div className="relative rounded-xl overflow-hidden aspect-video mb-4 bg-zinc-900/50 border border-white/5">
                <Image
                  src={prefixAssetPath(work.src)}
                  alt={work.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => popupToggle(String(work.id))}
                    className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                    title={portfolio.details}
                    aria-label={`${portfolio.details}: ${work.title}`}
                  >
                    <i className="fa-solid fa-circle-info text-fs-16" />
                  </button>
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                      title={t.actions.visitSite}
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square text-fs-16" />
                    </a>
                  )}
                </div>
              </div>

              <div className="px-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
                  {[work.category, work.date].filter(Boolean).join(" / ")}
                </span>
                <h5 className="text-fs-16 font-bold text-zinc-100 group-hover:text-blue-400 transition-colors duration-300">
                  {work.title}
                </h5>
                {work.role && (
                  <p className="mt-2 text-fs-12 font-semibold text-zinc-400 font-Open-sans">
                    {work.role}
                  </p>
                )}
                {work.langages && (
                  <p className="mt-2 text-fs-12 text-zinc-500 font-Open-sans leading-relaxed line-clamp-2">
                    {work.langages}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
