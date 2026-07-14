"use client";

import Link from "next/link";
import portfolio from "@/data/portfolio.json";

export default function HeroSection() {
  const { name, role, intro, photo } = portfolio.home;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Profile Image Column */}
        <div className="col-span-1 md:col-span-5 flex justify-center order-1 md:order-2">
          <div className="relative group">
            {/* Soft decorative glow background */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            {/* Main image container */}
            <div className="relative w-64 h-64 md:w-80 md:h-[420px] rounded-2xl overflow-hidden glass-panel border border-white/20">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={photo || "/assets/img/profile-image.png"}
                alt={name}
              />
            </div>
          </div>
        </div>

        {/* Text/Content Column */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <span className="text-fs-14 font-bold tracking-widest text-blue-400 uppercase mb-3">
            Welcome to my space
          </span>
          <h1 className="text-fs-40 sm:text-fs-50 lg:text-fs-60 font-extrabold uppercase leading-tight tracking-tight mb-4">
            Hi, I'm <span className="text-gradient block sm:inline">{name}</span>
          </h1>
          <h2 className="text-fs-21 sm:text-fs-26 font-semibold text-zinc-300 mb-6">
            I'm a <span className="text-blue-400">{role}</span>
          </h2>
          <p className="text-fs-16 font-Open-sans text-zinc-400 leading-relaxed max-w-lg mb-8">
            {intro || "Full Stack Developer building scalable and high-performance web applications with modern technologies."}
          </p>

          <Link
            href="/about"
            className="btn-glow group inline-flex items-center gap-3 px-8 py-4 rounded-full text-fs-14 font-bold uppercase tracking-wider text-white transition-all"
          >
            More About Me
            <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
