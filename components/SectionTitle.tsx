"use client";

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
    <div className="relative mb-60 xs:mb-50">
      <h2 className="text-fs-60 xs:text-fs-50 font-bold uppercase text-white opacity-10 tracking-wider">
        {bigTitle}
      </h2>
      <h3 className="absolute top-1/2 left-0 -translate-y-1/2 uppercase font-semibold text-fs-30 xs:text-fs-26 text-white">
        {normalTitle}{" "}
        <span className="text-accent">{colorTitle}</span>
      </h3>
    </div>
  );
}
