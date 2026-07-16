"use client";

import Image from "next/image";
import { useTunisContext } from "@/contexts/TunisContext";
import { portfolioWorks } from "@/data/siteData";
import { prefixAssetPath } from "@/lib/utils";

export default function Popup() {
  const { popup, popupToggle, t } = useTunisContext();
  const portfolio = t.portfolio;
  const work = portfolioWorks.find((item) => String(item.id) === popup);

  if (!popup || !work) return null;

  const screenshots = work.screenshots?.length ? work.screenshots : [work.src];
  const techs = work.langages?.split(",").map((tech) => tech.trim()).filter(Boolean) || [];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl p-5 sm:p-7">
        <button
          type="button"
          onClick={() => popupToggle(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white rounded-full bg-blue-600 hover:bg-blue-500 transition"
          aria-label={t.actions.close}
        >
          <i className="fa fa-close text-fs-15" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-3">
            {screenshots.map((src) => (
              <div key={src} className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50">
                <Image
                  src={prefixAssetPath(src)}
                  alt={work.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
              {[work.category, work.date].filter(Boolean).join(" / ")}
            </span>
            <h3 className="mt-2 text-fs-26 font-extrabold text-zinc-100 leading-tight">
              {work.title}
            </h3>
            {work.description && (
              <p className="mt-4 font-Open-sans text-fs-14 text-zinc-400 leading-relaxed">
                {work.description}
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-3 text-fs-13 font-Open-sans">
              {[
                [portfolio.project, work.project],
                [portfolio.client, work.client],
                [portfolio.role, work.role],
                [portfolio.teamSize, work.teamSize || portfolio.solo],
                [portfolio.date, work.date],
              ].filter(([, value]) => Boolean(value)).map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</span>
                  <span className="mt-1 block font-semibold text-zinc-200">{value}</span>
                </div>
              ))}
            </div>

            {work.features && work.features.length > 0 && (
              <div className="mt-6">
                <h4 className="text-fs-13 font-bold uppercase tracking-widest text-zinc-200">{portfolio.features}</h4>
                <ul className="mt-3 space-y-2 font-Open-sans text-fs-13 text-zinc-400">
                  {work.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <i className="fa-solid fa-check mt-1 text-blue-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {techs.length > 0 && (
              <div className="mt-6">
                <h4 className="text-fs-13 font-bold uppercase tracking-widest text-zinc-200">{portfolio.technologies}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span key={tech} className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-fs-12 font-semibold text-blue-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {work.link && (
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="btn-glow inline-flex items-center gap-2 rounded-full px-5 py-3 text-fs-13 font-bold uppercase text-white">
                  {portfolio.demo}
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              )}
              {work.sourceLink && (
                <a href={work.sourceLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-fs-13 font-bold uppercase text-zinc-200 hover:border-blue-400/60">
                  {portfolio.source}
                  <i className="fa-brands fa-github" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
