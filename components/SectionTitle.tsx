"use client";

import Reveal from "@/components/Reveal";

interface SectionTitleProps {
  bigTitle: string;
  colorTitle: string;
  normalTitle: string;
}

/** Reusable three-part section heading used across every page section. */
export default function SectionTitle({
  bigTitle,
  colorTitle,
  normalTitle,
}: SectionTitleProps) {
  return (
    <Reveal as="div" className="relative mb-12 select-none">
      <h2 className="section-watermark text-fs-60 xs:text-fs-40 font-extrabold uppercase text-white/5 tracking-widest transition-opacity duration-300">
        {bigTitle}
      </h2>
      <h3 className="absolute top-1/2 left-0 -translate-y-1/2 uppercase font-extrabold text-fs-26 xs:text-fs-21 text-zinc-100">
        {normalTitle}{" "}
        <span className="text-blue-400">{colorTitle}</span>
      </h3>
    </Reveal>
  );
}
