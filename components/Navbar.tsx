"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTunisContext } from "@/contexts/TunisContext";
import { useEffect } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "fa-solid fa-house", stateName: "home" },
  { label: "About", href: "/about", icon: "fa-solid fa-user", stateName: "about" },
  { label: "Portfolio", href: "/portfolio", icon: "fa-solid fa-briefcase", stateName: "portfolio" },
  { label: "Contact", href: "/contact", icon: "fa-solid fa-envelope", stateName: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { changeNav } = useTunisContext();

  // Đồng bộ hóa state của TunisContext với đường dẫn thực tế của URL
  useEffect(() => {
    const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
    if (activeItem) {
      changeNav(activeItem.stateName, false);
    }
  }, [pathname, changeNav]);

  return (
    <>
      {/* Desktop Navigation - Floating top header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav className="glass-panel px-8 py-3 rounded-full flex gap-8 items-center">
          <Link href="/" className="text-fs-18 font-bold mr-6 text-gradient select-none">
            Portfolio.
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
                {item.label}
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Mobile Navigation - Floating bottom navigation bar */}
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
              <span className="text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
