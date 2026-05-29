"use client";

import { useTunisContext } from "@/contexts/TunisContext";
import { homeData } from "@/data/siteData";

/** Full-screen hero section with background image. */
export default function HeroSection() {
  const { changeNav } = useTunisContext();

  return (
    <section
      id="home"
      className="home-bg absolute inset-0 bg-no-repeat bg-cover bg-center flex items-center justify-center"
    >
      <div className="text-center text-white px-4">
        <h1 className="text-fs-60 xs:text-fs-40 font-bold uppercase mb-4">
          Hi, I'm{" "}
          <span className="text-accent">{homeData.name}</span>
        </h1>
        <p className="text-fs-26 xs:text-fs-21 font-medium mb-8">
          {homeData.role}
        </p>
        <button
          onClick={() => {
            changeNav("about", false);
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="button inline-block leading-lh-1.4 rounded-30 text-center uppercase no-underline relative z-10 py-16 px-35 text-fs-15 font-semibold text-white bg-transparent outline-0 border border-accent hover:bg-accent transition-colors duration-300"
        >
          about me
        </button>
      </div>
    </section>
  );
}
