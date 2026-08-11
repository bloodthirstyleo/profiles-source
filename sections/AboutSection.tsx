"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import { homeData } from "@/data/siteData";
import {
  personalInfo,
  stats,
  techStack,
  skills,
  experience,
  education,
  references,
} from "@/data/siteData";
import { prefixAssetPath } from "@/lib/utils";
import { formatWeatherTime, getCachedWeather, type WeatherData } from "@/lib/weather";
import { useTunisContext } from "@/contexts/TunisContext";

function WeatherBentoCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [localTime, setLocalTime] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Ho_Chi_Minh",
        }).format(new Date()),
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    getCachedWeather("hoChiMinh")
      .then((data) => {
        if (mounted) setWeather(data);
      })
      .catch(() => {
        if (mounted) setFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-blue-400/20 bg-blue-500/[0.03]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 block mb-2">Live Weather</span>
          <h3 className="text-fs-21 font-bold text-zinc-100">Saigon developer mood</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-fs-21 shrink-0">
          {weather?.icon ?? <i className="fa-solid fa-cloud text-blue-300" />}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 font-Open-sans">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="block text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Local Time</span>
          <span className="text-fs-16 font-bold text-zinc-100 tabular-nums">{localTime || "--:--:--"}</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="block text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Temp</span>
          <span className="text-fs-16 font-bold text-blue-300">{weather ? <>{weather.temperature}&deg;C</> : "--"}</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="block text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Humidity</span>
          <span className="text-fs-16 font-bold text-zinc-100">{weather ? `${weather.humidity}%` : "--"}</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="block text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Wind</span>
          <span className="text-fs-16 font-bold text-zinc-100">{weather ? `${weather.windSpeed} km/h` : "--"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-Open-sans text-fs-13">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-zinc-300">
          <span className="font-semibold text-zinc-500">Feels like: </span>
          {weather ? <>{weather.apparentTemperature}&deg;C</> : "--"}
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-zinc-300">
          <span className="font-semibold text-zinc-500">Sunrise: </span>
          {weather ? formatWeatherTime(weather.sunrise) : "--"}
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-zinc-300">
          <span className="font-semibold text-zinc-500">Sunset: </span>
          {weather ? formatWeatherTime(weather.sunset) : "--"}
        </div>
      </div>

      <p className="mt-5 text-fs-14 font-Open-sans leading-relaxed text-zinc-300 border-t border-white/5 pt-5">
        {failed ? "Weather API offline. Local time remains available." : weather?.mood ?? "Loading live weather mood..."}
      </p>
    </div>
  );
}

export default function AboutSection() {
  const { t } = useTunisContext();
  const about = t.about;

  return (
    <section id="about" className="relative w-full pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      <AuroraBackdrop />
      <div className="max-w-6xl w-full mx-auto">
        <SectionTitle bigTitle={about.bigTitle} colorTitle={about.colorTitle} normalTitle={about.normalTitle} />

        {/* Bento Row 1: {about.personalInfo} & Stats */}
        <Reveal as="div" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* {about.personalInfo} Box */}
          <div className="col-span-1 lg:col-span-6 glass-panel p-5 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-6 text-zinc-100 flex items-center gap-3">
                <i className="fa-solid fa-address-card text-blue-400" />
                {about.personalInfo}
              </h3>
              <div className="hidden xs:block relative rounded-full border-4 border-solid border-zinc-800 w-[230px] h-[230px] mb-6 mx-auto overflow-hidden">
                <Image
                  src={prefixAssetPath(homeData.photoMobile || "/assets/img/profile-image-mobile.png")}
                  alt="Profile mobile"
                  fill
                  sizes="230px"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 font-Open-sans text-fs-14 text-zinc-300">
                {personalInfo.flatMap((group) => group.data).map((item) => (
                  <div key={item.id} className="border-b border-white/5 pb-2">
                    <span className="text-zinc-500 font-medium">{item.type}: </span>
                    <span className="font-semibold text-zinc-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center sm:justify-start">
              <a
                className="btn-glow group inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-3 px-6 py-3 rounded-full text-fs-13 font-bold uppercase tracking-wider text-white transition-all"
                href={prefixAssetPath("/assets/cv/cv-dev.pdf")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {about.downloadCv}
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
        </Reveal>

        {references.length > 0 && (
          <Reveal as="div" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {references.map((reference) => (
                <div
                  key={reference.email}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-blue-400/20 bg-blue-500/[0.03]"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 block mb-2">{about.references}</span>
                      <h3 className="text-fs-21 font-bold text-zinc-100">
                        {about.referenceTitle}
                      </h3>
                      <p className="mt-1 text-fs-14 font-bold text-zinc-100">
                        {reference.name}
                      </p>
                      <p className="text-fs-13 font-semibold text-zinc-400 font-Open-sans mt-1">
                        {reference.role}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300 shrink-0">
                      <i className="fa-solid fa-user-check text-fs-18" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-Open-sans text-fs-13">
                    <a
                      href={"mailto:" + reference.email}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-zinc-300 hover:text-blue-300 transition-colors"
                    >
                      <i className="fa-solid fa-envelope text-blue-400" />
                      <span className="break-all">{reference.email}</span>
                    </a>
                    <a
                      href={"tel:" + reference.phone}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-zinc-300 hover:text-blue-300 transition-colors"
                    >
                      <i className="fa-solid fa-phone text-blue-400" />
                      <span>{reference.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal as="div" className="mb-16">
          <WeatherBentoCard />
        </Reveal>
        {/* Bento Row 2: Tech Stack Category */}
        <Reveal as="div" className="mb-16">
          <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-8 text-center text-zinc-100 flex items-center justify-center gap-3">
            <i className="fa-solid fa-layer-group text-blue-400" />
            {about.coreTechnologies}
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
        </Reveal>

        {/* Bento Row 3: Skills with Modern Progress Bars */}
        <Reveal as="div" className="mb-20">
          <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-10 text-center text-zinc-100 flex items-center justify-center gap-3">
            <i className="fa-solid fa-code text-blue-400" />
            {about.skills}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between"
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
        </Reveal>

        {/* Bento Row 4: {about.experienceEducation} Timeline */}
        <Reveal as="div">
          <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-12 text-center text-zinc-100 flex items-center justify-center gap-3">
            <i className="fa-solid fa-timeline text-blue-400" />
            {about.experienceEducation}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience Column */}
            <div>
              <h4 className="text-fs-18 font-bold uppercase tracking-wider mb-8 text-zinc-300 flex items-center gap-3 pl-4 border-l-2 border-blue-500">
                <i className="fa-solid fa-briefcase text-blue-400" />
                {about.workExperience}
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
                        <span className="font-semibold text-zinc-300">{about.project}:</span> {item.projectName}
                      </p>
                      <p>
                        <span className="font-semibold text-zinc-300">{about.repo}:</span> {item.desc}
                      </p>
                      <p>
                        <span className="font-semibold text-zinc-300">{about.stack}:</span>{" "}
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
                {about.educationTimeline}
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
        </Reveal>

      </div>
    </section>
  );
}
