"use client";

import { useEffect } from "react";

const SPOTLIGHT_SELECTOR = ".glass-panel-hover, .btn-glow";

/**
 * Delegated pointer listener that positions the CSS spotlight glow
 * (--sx / --sy, consumed by .glass-panel-hover::after / .btn-glow shine
 * in skins/blue.css) on whichever card/button is currently hovered.
 * One listener for the whole page instead of one per card.
 */
export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(SPOTLIGHT_SELECTOR);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--sx", `${event.clientX - rect.left}px`);
        target.style.setProperty("--sy", `${event.clientY - rect.top}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
