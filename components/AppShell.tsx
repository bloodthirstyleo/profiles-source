"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Popup from "@/components/Popup";
import ThreeBackground from "@/components/ThreeBackground";
import CursorGlow from "@/components/CursorGlow";
import { useTunisContext } from "@/contexts/TunisContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { dark, locale } = useTunisContext();

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.lang = locale;
  }, [dark, locale]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="fixed inset-0 -z-50 overflow-hidden bg-[var(--page-bg)] pointer-events-none select-none transition-colors duration-300">
        <ThreeBackground />
      </div>
      <CursorGlow />
      <Navbar />
      <div className="relative w-full min-h-screen">{children}</div>
      <Popup />
    </div>
  );
}
