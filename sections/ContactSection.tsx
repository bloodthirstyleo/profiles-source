"use client";

import { useState, FormEvent } from "react";
import { useTunisContext } from "@/contexts/TunisContext";
import SectionTitle from "@/components/SectionTitle";
import { footerData } from "@/data/siteData";

/** Contact section with form and personal info. */
export default function ContactSection() {
  const { dark } = useTunisContext();
  const [status, setStatus] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("Message sent successfully!");
    setTimeout(() => setStatus(""), 3000);
  }

  return (
    <section id="contact" className="relative w-full">
      <div className="w-full">
        <SectionTitle bigTitle="contact" colorTitle="me" normalTitle="get in" />

        <div className="xl:max-w-1140 custom-md-3:max-w-[calc(100%-195px)] lg:max-w-960 md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto pb-20">
          <div className="flex flex-row down-lg:flex-col gap-8">
            <div className="xl:basis-1/2 lg:basis-5/12 down-lg:basis-full">
              <h3 className="text-fs-26 xs:text-fs-21 font-semibold mb-8">
                Don't be shy !
              </h3>
              <p className={`font-Open-sans text-fs-15 mb-8 ${dark ? "text-light-grey" : "text-black-6"}`}>
                Feel free to get in touch with me. I am always open to discussing new
                projects, creative ideas or opportunities to be part of your visions.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-fs-18">
                    <i className="fa fa-map-marker" />
                  </div>
                  <div>
                    <span className="text-fs-13 uppercase text-light-grey block">Address Point</span>
                    <span className="font-semibold">{footerData.address}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-fs-18">
                    <i className="fa fa-envelope-open" />
                  </div>
                  <div>
                    <span className="text-fs-13 uppercase text-light-grey block">Mail Me</span>
                    <span className="font-semibold">{footerData.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-fs-18">
                    <i className="fa fa-phone-square" />
                  </div>
                  <div>
                    <span className="text-fs-13 uppercase text-light-grey block">Call Me</span>
                    <span className="font-semibold">{footerData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:basis-1/2 lg:basis-7/12 down-lg:basis-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    required
                    className={`w-full py-4 px-6 rounded-5 text-fs-14 font-medium uppercase border bg-transparent focus:border-accent transition ${dark ? "border-black-3 text-white placeholder:text-light-grey" : "border-grey text-black-6 placeholder:text-black-6"}`}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    required
                    className={`w-full py-4 px-6 rounded-5 text-fs-14 font-medium uppercase border bg-transparent focus:border-accent transition ${dark ? "border-black-3 text-white placeholder:text-light-grey" : "border-grey text-black-6 placeholder:text-black-6"}`}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="YOUR SUBJECT"
                  required
                  className={`w-full py-4 px-6 rounded-5 text-fs-14 font-medium uppercase border bg-transparent focus:border-accent transition ${dark ? "border-black-3 text-white placeholder:text-light-grey" : "border-grey text-black-6 placeholder:text-black-6"}`}
                />
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  rows={5}
                  required
                  className={`w-full py-4 px-6 rounded-5 text-fs-14 font-medium uppercase border bg-transparent focus:border-accent transition resize-none ${dark ? "border-black-3 text-white placeholder:text-light-grey" : "border-grey text-black-6 placeholder:text-black-6"}`}
                />
                <button
                  type="submit"
                  className="button group overflow-hidden inline-block leading-lh-1.4 rounded-30 text-center align-middle select-none transition-all duration-250 ease-in-out uppercase no-underline relative z-10 py-16 pr-70 pl-35 text-fs-15 font-semibold text-white bg-transparent outline-0 border border-accent hover:bg-accent"
                >
                  <span className="relative z-20">Send Message</span>
                  <span className="absolute -right-px bottom-0 w-55 h-55 flex items-center justify-center rounded-full text-white text-fs-19 bg-accent">
                    <i className="fa fa-paper-plane" />
                  </span>
                </button>
                {status && (
                  <p className="text-accent text-fs-14 font-semibold mt-4">{status}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
