"use client";

import { useTunisContext } from "@/contexts/TunisContext";
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
  const { dark } = useTunisContext();

  return (
    <section id="about" className="relative w-full">
      <div className="w-full">
        <SectionTitle bigTitle="resume" colorTitle="me" normalTitle="about" />

        <div className="xl:max-w-1140 custom-md-3:max-w-[calc(100%-195px)] lg:max-w-960 md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto">
          <div className="flex flex-row down-lg:flex-col">
            <div className="xl:basis-1/2 lg:basis-5/12 down-lg:basis-full">
              <h3 className={`uppercase text-fs-26 xs:text-fs-21 pb-22 font-semibold ${dark ? "text-white" : "text-black-6"}`}>
                personal infos
              </h3>
              <img
                className="hidden xs:block rounded-full border-4 border-solid border-black-3 w-230 h-230 mb-25 mx-auto"
                src="/assets/img/profile-image-mobile.jpg"
                alt="Profile mobile"
              />
              <div className="flex justify-between xs:justify-start font-Open-sans">
                {personalInfo.map((group) => (
                  <div key={group.id} className="basis-1/2 text-fs-15 xs:text-fs-14">
                    {group.data.map((item) => (
                      <div key={item.id} className="pb-20 last:pb-0">
                        <span className="opacity-80">{item.type} : </span>
                        <span className="xs:block custom-md-2:block font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <a
                className="button group mt-30 overflow-hidden inline-block leading-lh-1.4 rounded-30 text-ellipsis text-center align-middle select-none transition-all duration-250 ease-in-out uppercase no-underline relative z-10 py-16 pr-70 pl-35 text-fs-15 font-semibold text-white bg-transparent outline-0 before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:translate-x-full hover:before:translate-x-0 before:transition before:duration-300 before:ease-out"
                href="/assets/cv/cv-dev.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={`relative z-20 ${dark ? "text-white" : "text-black-6 group-hover:text-white transition-all duration-300"}`}>
                  download cv
                </span>
                <span className="absolute -right-px bottom-0 w-55 h-55 flex items-center justify-center rounded-full text-white text-fs-19 bg-accent">
                  <i className="fa fa-download" />
                </span>
              </a>
            </div>

            <div className="xl:basis-1/2 lg:basis-7/12 down-lg:basis-full down-lg:mt-50">
              <div className="flex down-lg:-mx-15 flex-wrap">
                {stats.map((item) => (
                  <div key={item.id} className="w-1/2 px-15">
                    <div className={`pt-20 xs:pt-15 pr-30 xs:pr-20 pb-25 xs:pb-20 pl-40 xs:pl-25 border rounded-5 mb-30 xs:mb-25 ${dark ? "border-black-3" : "border-grey"}`}>
                      <h3 className="relative inline-block font-bold text-fs-50 xs:text-fs-40 text-accent leading-lh-1.2">
                        {item.value}
                        <span className="absolute -right-6 text-fs-33 font-light top-1">+</span>
                      </h3>
                      <p
                        className="relative xs:text-fs-14 uppercase pl-45 xs:pl-0 xs:before:hidden font-Open-sans font-medium before:absolute before:left-0 before:top-13 before:w-30 before:h-1 before:bg-black-5"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className={`border-t border-solid mx-auto max-w-40prcent mt-70 mb-55 ${dark ? "border-t-black-3" : "border-t-grey"}`} />

          <h3 className="uppercase text-fs-26 xs:text-fs-21 pb-48 text-white font-semibold text-center">
            Tech stack
          </h3>
          <div className="flex down-lg:-mx-15 flex-wrap">
            {techStack.map((item) => (
              <div key={item.id} className="w-1/2 px-15">
                <div className={`pt-20 xs:pt-15 pr-30 xs:pr-20 pb-25 xs:pb-20 pl-40 xs:pl-25 border rounded-5 mb-30 xs:mb-25 ${dark ? "border-black-3" : "border-grey"}`}>
                  <h3 className="relative inline-block font-bold text-fs-50 xs:text-fs-40 text-accent leading-lh-1.2">
                    {item.value}
                    <span className="absolute -right-6 text-fs-33 font-light top-1">+</span>
                  </h3>
                  <p
                    className="relative xs:text-fs-14 uppercase pl-45 xs:pl-0 xs:before:hidden font-Open-sans font-medium before:absolute before:left-0 before:top-13 before:w-30 before:h-1 before:bg-black-5"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                </div>
              </div>
            ))}
          </div>

          <hr className={`border-t border-solid mx-auto max-w-40prcent mt-70 mb-55 ${dark ? "border-t-black-3" : "border-t-grey"}`} />

          <h3 className="uppercase text-fs-26 xs:text-fs-21 pb-48 text-white font-semibold text-center">
            my skills
          </h3>
          <div className="flex w-full flex-wrap">
            {skills.map((skill) => (
              <div key={skill.id} className="w-1/4 mb-48 down-sm:w-1/2 xs:mb-16 text-center">
                <div className={`c100 p${skill.value} float-none mx-auto ${dark ? "bg-black-3" : "bg-light-grey after:!bg-white"}`}>
                  <span className={dark ? "" : "!text-black-6"}>{skill.value}%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
                <h6 className="uppercase font-Open-sans text-center mt-24 xs:mt-8">
                  {skill.name}
                </h6>
              </div>
            ))}
          </div>

          <hr className={`border-t border-solid mx-auto max-w-40prcent mt-35 mb-55 ${dark ? "border-t-black-3" : "border-t-grey"}`} />

          <h3 className="uppercase text-fs-26 xs:text-fs-21 pb-48 text-white font-semibold text-center">
            experience & education
          </h3>
          <div className="flex down-sm:flex-col from-sm:mb-40">
            <div className="w-1/2 down-sm:w-full">
              <ul>
                {experience.map((item) => (
                  <li key={item.id} className={`relative pr-20 pl-60 mb-50 after:absolute after:top-0 after:left-20 after:w-1 after:h-full ${dark ? "after:bg-black-4" : "after:bg-grey"}`}>
                    <div className="bg-accent w-40 h-40 absolute left-0 leading-lh-40 text-center z-10 rounded-full text-white">
                      <i className="fa fa-briefcase" />
                    </div>
                    <span className={`text-fs-12 py-1 px-10 inline-block mb-12 rounded-20 font-semibold opacity-80 font-Open-sans uppercase ${dark ? "text-white bg-black-3" : "text-black-6 bg-light-grey"}`}>
                      {item.date}
                    </span>
                    <h5 className="uppercase text-fs-18 mt-7 mb-10">
                      {item.title}
                      <span className={`opacity-80 font-semibold relative pl-26 font-Open-sans before:absolute before:w-10 before:h-2 before:left-7 before:top-9 before:opacity-80 ${dark ? "before:bg-white" : "before:bg-black-6"}`}>
                        {item.company}
                      </span>
                    </h5>
                    <p className={`font-semibold text-fs-14 uppercase relative font-Open-sans ${dark ? "text-light-grey" : ""}`}>
                      PROJECT: {item.projectName}
                    </p>
                    <p className={`font-Open-sans text-fs-14 ${dark ? "text-light-grey" : ""}`}>
                      REPOSITORY: {item.desc}
                    </p>
                    <p className={`font-Open-sans text-fs-14 ${dark ? "text-light-grey" : ""}`}>
                      TECH STACK: {item.be} {item.fe} {item.db} {item.clound}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2 down-sm:w-full">
              <ul>
                {education.map((item) => (
                  <li key={item.id} className={`relative pr-20 pl-60 mb-50 after:absolute after:top-0 after:left-20 after:w-1 after:h-full ${dark ? "after:bg-black-4" : "after:bg-grey"}`}>
                    <div className="bg-accent w-40 h-40 absolute left-0 leading-lh-40 text-center z-10 rounded-full text-white">
                      <i className="fa fa-graduation-cap" />
                    </div>
                    <span className={`text-fs-12 py-1 px-10 inline-block mb-12 rounded-20 font-semibold opacity-80 font-Open-sans uppercase ${dark ? "text-white bg-black-3" : "text-black-6 bg-light-grey"}`}>
                      {item.date}
                    </span>
                    <h5 className="uppercase text-fs-18 mt-7 mb-10">
                      {item.title}
                      <span className={`opacity-80 font-semibold text-fs-15 relative pl-26 font-Open-sans before:absolute before:w-10 before:h-2 before:left-7 before:top-9 before:opacity-80 ${dark ? "before:bg-white" : "before:bg-black-6"}`}>
                        {item.unv}
                      </span>
                    </h5>
                    <p className={`font-Open-sans text-fs-14 ${dark ? "text-light-grey" : ""}`}>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
