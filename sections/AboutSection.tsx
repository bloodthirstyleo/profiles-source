"use client";

import SectionTitle from "@/components/SectionTitle";
import {
  personalInfo,
  stats,
  techStack,
  skills,
  experience,
  education,
} from "@/data/siteData";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl w-full mx-auto">
        <SectionTitle bigTitle="resume" colorTitle="me" normalTitle="about" />

        {/* Bento Row 1: Personal Info & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Personal Info Box */}
          <div className="col-span-1 lg:col-span-6 glass-panel p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-6 text-zinc-100 flex items-center gap-3">
                <i className="fa-solid fa-address-card text-blue-400" />
                Personal Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 font-Open-sans text-fs-14 text-zinc-300">
                {personalInfo.flatMap((group) => group.data).map((item) => (
                  <div key={item.id} className="border-b border-white/5 pb-2">
                    <span className="text-zinc-500 font-medium">{item.type}: </span>
                    <span className="font-semibold text-zinc-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <a
                className="btn-glow group inline-flex items-center gap-3 px-6 py-3 rounded-full text-fs-13 font-bold uppercase tracking-wider text-white transition-all"
                href="/assets/cv/cv-dev.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
                <i className="fa-solid fa-download transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Stats Grid Box */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((item) => (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-center"
              >
                <div className="text-fs-40 font-extrabold text-blue-400 mb-2 leading-none flex items-baseline">
                  {item.value}
                  <span className="text-fs-26 font-light text-indigo-400 ml-1">+</span>
                </div>
                <p
                  className="text-fs-12 font-bold uppercase tracking-widest text-zinc-400 font-Open-sans"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bento Row 2: Tech Stack Category */}
        <div className="mb-16">
          <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-8 text-center text-zinc-100 flex items-center justify-center gap-3">
            <i className="fa-solid fa-layer-group text-blue-400" />
            Core Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((item) => (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border-t-2 border-t-blue-500/30"
              >
                <span className="text-fs-12 font-bold text-blue-400 uppercase tracking-widest block mb-3">
                  {item.value}
                </span>
                <p
                  className="text-fs-15 font-medium text-zinc-300 font-Open-sans leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bento Row 3: Skills with Modern Progress Bars */}
        <div className="mb-20">
          <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-10 text-center text-zinc-100 flex items-center justify-center gap-3">
            <i className="fa-solid fa-code text-blue-400" />
            Skills Proficiency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="glass-panel p-5 rounded-2xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-fs-14 font-semibold text-zinc-200 uppercase tracking-wide">
                    {skill.name}
                  </span>
                  <span className="text-fs-13 font-bold text-blue-400">
                    {skill.value}%
                  </span>
                </div>
                {/* Modern subtle progress bar */}
                <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Row 4: Experience & Education Timeline */}
        <div>
          <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-12 text-center text-zinc-100 flex items-center justify-center gap-3">
            <i className="fa-solid fa-timeline text-blue-400" />
            Experience & Education
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience Column */}
            <div>
              <h4 className="text-fs-18 font-bold uppercase tracking-wider mb-8 text-zinc-300 flex items-center gap-3 pl-4 border-l-2 border-blue-500">
                <i className="fa-solid fa-briefcase text-blue-400" />
                Work Experience
              </h4>
              <div className="space-y-6">
                {experience.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl relative"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full inline-block mb-3">
                      {item.date}
                    </span>
                    <h5 className="text-fs-16 font-bold text-zinc-100 mb-1">
                      {item.title}
                    </h5>
                    <span className="text-fs-13 font-semibold text-zinc-400 block mb-4 font-Open-sans">
                      {item.company}
                    </span>
                    <div className="space-y-2 text-fs-13 font-Open-sans text-zinc-400 border-t border-white/5 pt-4 mt-4">
                      <p>
                        <span className="font-semibold text-zinc-300">Project:</span> {item.projectName}
                      </p>
                      <p>
                        <span className="font-semibold text-zinc-300">Repo:</span> {item.desc}
                      </p>
                      <p>
                        <span className="font-semibold text-zinc-300">Stack:</span>{" "}
                        <span className="text-blue-300/80">
                          {[item.be, item.fe, item.db, item.clound].filter(Boolean).join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div>
              <h4 className="text-fs-18 font-bold uppercase tracking-wider mb-8 text-zinc-300 flex items-center gap-3 pl-4 border-l-2 border-indigo-500">
                <i className="fa-solid fa-graduation-cap text-indigo-400" />
                Education Timeline
              </h4>
              <div className="space-y-6">
                {education.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full inline-block mb-3">
                      {item.date}
                    </span>
                    <h5 className="text-fs-16 font-bold text-zinc-100 mb-1">
                      {item.title}
                    </h5>
                    <span className="text-fs-13 font-semibold text-zinc-400 block mb-4 font-Open-sans">
                      {item.unv}
                    </span>
                    <p className="text-fs-13 font-Open-sans text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
