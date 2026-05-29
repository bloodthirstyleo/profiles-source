"use client";

import { useTunisContext } from "@/contexts/TunisContext";

/** Dynamically loads the colour-skin CSS based on the current theme colour. */
export default function SkinStylesheet() {
  const { color } = useTunisContext();
  const skin = color === "default" ? "" : color; // template supports blue, green, etc.
  const href = skin ? `/assets/css/skins/${skin}.css` : `/assets/css/skins/blue.css`;
  return <link rel="stylesheet" href={href} />;
}
