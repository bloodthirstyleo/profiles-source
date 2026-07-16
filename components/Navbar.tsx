"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTunisContext } from "@/contexts/TunisContext";

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

  useEffect(() => {
    const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
    if (activeItem) {
      changeNav(activeItem.stateName, false);
    }
  }, [pathname, changeNav]);

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
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav className="glass-panel px-6 py-3 rounded-full flex gap-6 items-center">
          <Link href="/" className="text-fs-18 font-bold mr-2 text-gradient select-none">
            {messages.nav.brand}
          </Link>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-fs-14 font-medium uppercase tracking-wider transition-all duration-300 hover:text-blue-400 ${
                  isActive ? "text-blue-400 font-semibold" : "text-zinc-400"
                }`}
              >
                {messages.nav[item.key]}
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" />
                )}
              </Link>
            );
          })}
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
