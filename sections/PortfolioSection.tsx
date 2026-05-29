"use client";

import { useState } from "react";
import { useTunisContext } from "@/contexts/TunisContext";
import SectionTitle from "@/components/SectionTitle";
import { portfolioWorks } from "@/data/siteData";

const categories = ["All", ...Array.from(new Set(portfolioWorks.map((w) => w.category)))];

/** Portfolio / Works section with category filtering. */
export default function PortfolioSection() {
  const { dark } = useTunisContext();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? portfolioWorks
      : portfolioWorks.filter((w) => w.category === activeFilter);

  return (
    <section id="works" className="relative w-full">
      <div className="w-full">
        <SectionTitle bigTitle="works" colorTitle="my" normalTitle="portfolio" />

        <div className="xl:max-w-1140 custom-md-3:max-w-[calc(100%-195px)] lg:max-w-960 md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto">
          <ul className="flex flex-wrap justify-center mb-50">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveFilter(cat)}
                  className={`mx-2 py-2 px-5 rounded-30 uppercase text-fs-14 font-semibold transition ${
                    activeFilter === cat
                      ? "bg-accent text-white"
                      : dark
                      ? "text-white hover:text-accent"
                      : "text-black-6 hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap -mx-4">
            {filtered.map((work) => (
              <div key={work.id} className="w-1/2 sm:w-1/3 down-sm:w-full px-4 mb-8">
                <div className="portfolio-item rounded-5">
                  <img src={work.src} alt={work.title} className="rounded-5" />
                  <div className="overlay rounded-5">
                    <h5 className="text-fs-18 font-semibold mb-2">{work.title}</h5>
                    <span className="text-fs-13 text-light-grey uppercase">{work.category}</span>
                    <div className="mt-4 space-x-4">
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white hover:opacity-80 transition"
                        >
                          <i className="fa fa-link" />
                        </a>
                      )}
                      <button
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black-6 hover:bg-accent hover:text-white transition"
                        aria-label="Zoom"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
