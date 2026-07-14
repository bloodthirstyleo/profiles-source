"use client";

import { useState, FormEvent } from "react";
import SectionTitle from "@/components/SectionTitle";
import { footerData } from "@/data/siteData";

export default function ContactSection() {
  const [status, setStatus] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("Message sent successfully!");
    setTimeout(() => setStatus(""), 4000);
  }

  return (
    <section id="contact" className="relative w-full pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl w-full mx-auto">
        <SectionTitle bigTitle="contact" colorTitle="me" normalTitle="get in" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Column */}
          <div className="col-span-1 lg:col-span-5 glass-panel p-8 rounded-2xl flex flex-col justify-between h-full">
            <div>
              <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-4 text-zinc-100 flex items-center gap-3">
                <i className="fa-solid fa-handshake text-blue-400" />
                Don't be shy!
              </h3>
              <p className="font-Open-sans text-fs-14 text-zinc-400 leading-relaxed mb-8">
                Feel free to get in touch with me. I am always open to discussing new
                projects, creative ideas or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-blue-400 text-fs-18 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                    <i className="fa-solid fa-map-location-dot" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                      Address Point
                    </span>
                    <span className="font-semibold text-zinc-200 text-fs-15">
                      {footerData.address}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-blue-400 text-fs-18 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                    <i className="fa-solid fa-envelope-open-text" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                      Mail Me
                    </span>
                    <span className="font-semibold text-zinc-200 text-fs-15">
                      {footerData.email}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-blue-400 text-fs-18 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                    <i className="fa-solid fa-phone-volume" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                      Call Me
                    </span>
                    <span className="font-semibold text-zinc-200 text-fs-15">
                      {footerData.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            {footerData.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="mt-12 border-t border-white/5 pt-6 flex gap-4">
                {footerData.socialLinks.map((social: any) => (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form Column */}
          <div className="col-span-1 lg:col-span-7 glass-panel p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    required
                    className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    required
                    className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <input
                  type="text"
                  name="subject"
                  placeholder="YOUR SUBJECT"
                  required
                  className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col">
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  rows={5}
                  required
                  className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  className="btn-glow group inline-flex items-center gap-3 px-8 py-4 rounded-full text-fs-13 font-bold uppercase tracking-wider text-white transition-all"
                >
                  Send Message
                  <i className="fa-solid fa-paper-plane transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {status && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-fs-13 font-semibold animate-pulse">
                    <i className="fa-solid fa-circle-check mr-2" />
                    {status}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
