import type { Metadata } from "next";
import HeroSection from "@/sections/HeroSection";

export const metadata: Metadata = {
  title: "Home - Vo Manh Khanh | Full Stack Developer",
  description: "Welcome to my space. I'm a Full Stack Web Developer building scalable and high-performance applications.",
};

/** Main page composing all portfolio sections. */
export default function HomePage() {
  return (
    <main className="w-full h-full pages overflow-hidden relative">
      <HeroSection />
    </main>
  );
}
