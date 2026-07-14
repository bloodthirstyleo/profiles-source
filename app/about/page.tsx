import type { Metadata } from "next";
import AboutSection from "@/sections/AboutSection";

export const metadata: Metadata = {
  title: "About Me - Vo Manh Khanh | Full Stack Developer",
  description: "Learn more about my background, technical stack, skills, work experience and education.",
};

/** About page displaying personal information, tech stack, skills, experience & education. */
export default function AboutPage() {
  return (
    <main className="w-full min-h-screen">
      <AboutSection />
    </main>
  );
}
