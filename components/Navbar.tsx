"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTunisContext } from "@/contexts/TunisContext";
import WeatherWidget from "@/components/WeatherWidget";

const NAV_ITEMS = [
  { key: "home", href: "/", icon: "fa-solid fa-house", stateName: "home" },
  { key: "about", href: "/about", icon: "fa-solid fa-user", stateName: "about" },
  { key: "portfolio", href: "/portfolio", icon: "fa-solid fa-briefcase", stateName: "portfolio" },
  { key: "fun", href: "/fun", icon: "fa-solid fa-gamepad", stateName: "fun" },
  { key: "contact", href: "/contact", icon: "fa-solid fa-envelope", stateName: "contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { changeNav, dark, darkToggle, locale, setLocale, messages } = useTunisContext();
  const [scrolled, setScrolled] = useState(false);
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
    if (activeItem) {
      changeNav(activeItem.stateName, false);
    }
  }, [pathname, changeNav]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const activeEl = navRefs.current[pathname];
    if (activeEl) {
      setPillStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    } else {
      setPillStyle(null);
    }
  }, [pathname]);

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLocale(locale === "en" ? "vi" : "en")}
        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-fs-12 font-bold text-zinc-300 hover:text-blue-400 transition-colors"
        aria-label={messages.common.language}
        title={messages.common.language}
      >
        {locale.toUpperCase()}
      </button>
      <button
        type="button"
        onClick={() => darkToggle(!dark)}
        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-300 hover:text-blue-400 transition-colors"
        aria-label={messages.common.theme}
        title={dark ? messages.common.light : messages.common.dark}
      >
        <i className={`fa-solid ${dark ? "fa-sun" : "fa-moon"}`} />
      </button>
    </div>
  );

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          scrolled ? "top-3" : "top-6"
        }`}
      >
        <nav
          className={`glass-panel px-6 py-3 rounded-full flex gap-6 items-center transition-shadow duration-500 ${
            scrolled ? "shadow-skin-glow" : ""
          }`}
        >
          <Link href="/" className="text-fs-18 font-bold mr-2 text-gradient select-none">
            {messages.nav.brand}
          </Link>
          <WeatherWidget />
          <div className="relative flex gap-6 items-center">
            {pillStyle && (
              <span
                className="nav-pill"
                style={{ left: pillStyle.left, width: pillStyle.width }}
                aria-hidden="true"
              />
            )}
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    navRefs.current[item.href] = el;
                  }}
                  className={`relative z-[1] px-3 py-1.5 text-fs-14 font-medium uppercase tracking-wider transition-all duration-300 hover:text-blue-400 ${
                    isActive ? "text-blue-400 font-semibold" : "text-zinc-400"
                  }`}
                >
                  {messages.nav[item.key]}
                </Link>
              );
            })}
          </div>
          {controls}
        </nav>
      </header>

      <div className="fixed top-4 right-4 z-50 md:hidden">{controls}</div>

      <nav className="fixed bottom-6 left-4 right-4 z-50 md:hidden glass-panel px-4 py-3.5 rounded-2xl flex justify-around items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-blue-400 scale-110" : "text-zinc-500"
              }`}
            >
              <i className={`${item.icon} text-fs-18`} />
              <span className="text-[10px] uppercase font-bold tracking-wider">{messages.nav[item.key]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
