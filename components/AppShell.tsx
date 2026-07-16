"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Popup from "@/components/Popup";
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
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-5xl animate-aurora-slow" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-indigo-600/10 blur-5xl animate-aurora-medium" />
      </div>
      <Navbar />
      <div className="relative w-full min-h-screen">{children}</div>
      <Popup />
    </div>
  );
}
