"use client";

import { useState, FormEvent } from "react";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import { footerData } from "@/data/siteData";
import { useTunisContext } from "@/contexts/TunisContext";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { t } = useTunisContext();
  const contact = t.contact;
  const [status, setStatus] = useState<SubmitState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("from_name", "Portfolio Contact Form");
    formData.append("subject", String(formData.get("subject") || "Portfolio contact"));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms submit failed");
      }

      form.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  }

  const statusText = status === "success" ? contact.success : status === "error" ? contact.error : "";

  return (
    <section id="contact" className="relative w-full pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      <AuroraBackdrop />
      <div className="max-w-6xl w-full mx-auto">
        <SectionTitle bigTitle={t.section.contactBig} colorTitle={t.section.contactColor} normalTitle={t.section.contactNormal} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal as="div" className="col-span-1 lg:col-span-5 glass-panel p-8 rounded-2xl flex flex-col justify-between h-full">
            <div>
              <h3 className="text-fs-21 font-bold uppercase tracking-wider mb-4 text-zinc-100 flex items-center gap-3">
                <i className="fa-solid fa-handshake text-blue-400" />
                {contact.title}
              </h3>
              <p className="font-Open-sans text-fs-14 text-zinc-400 leading-relaxed mb-8">
                {contact.intro}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-blue-400 text-fs-18 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                    <i className="fa-solid fa-map-location-dot" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                      {contact.address}
                    </span>
                    <span className="font-semibold text-zinc-200 text-fs-15">
                      {footerData.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-blue-400 text-fs-18 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                    <i className="fa-solid fa-envelope-open-text" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                      {contact.email}
                    </span>
                    <span className="font-semibold text-zinc-200 text-fs-15">
                      {footerData.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-blue-400 text-fs-18 transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                    <i className="fa-solid fa-phone-volume" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                      {contact.phone}
                    </span>
                    <span className="font-semibold text-zinc-200 text-fs-15">
                      {footerData.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {footerData.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="mt-12 border-t border-white/5 pt-6 flex gap-4">
                {footerData.socialLinks.map((social: { id: number; icon: string; link: string }) => (
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
          </Reveal>

          <Reveal as="div" delay={150} className="col-span-1 lg:col-span-7 glass-panel p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder={contact.namePlaceholder}
                  required
                  className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={contact.emailPlaceholder}
                  required
                  className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder={contact.subjectPlaceholder}
                required
                className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300"
              />

              <textarea
                name="message"
                placeholder={contact.messagePlaceholder}
                rows={5}
                required
                className="w-full py-4 px-6 rounded-xl text-fs-13 font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.01] border border-white/10 focus:border-blue-500 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder:text-zinc-500 transition-all duration-300 resize-none"
              />

              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-glow group inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full text-fs-13 font-bold uppercase tracking-wider text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? t.actions.sending : t.actions.sendMessage}
                  <i className="fa-solid fa-paper-plane transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {statusText && (
                  <div className={`border px-4 py-2 rounded-xl text-fs-13 font-semibold ${status === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-300"}`}>
                    <i className={`fa-solid ${status === "success" ? "fa-circle-check" : "fa-triangle-exclamation"} mr-2`} />
                    {statusText}
                  </div>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
