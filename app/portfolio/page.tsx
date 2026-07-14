import type { Metadata } from "next";
import PortfolioSection from "@/sections/PortfolioSection";

export const metadata: Metadata = {
  title: "My Portfolio - Vo Manh Khanh | Full Stack Developer",
  description: "Browse the showcase of my selected projects, web applications and creative works.",
};

/** Portfolio page showcasing works. */
export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen">
      <PortfolioSection />
    </main>
  );
}
