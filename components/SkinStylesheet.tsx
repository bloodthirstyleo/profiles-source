"use client";

import { useTunisContext } from "@/contexts/TunisContext";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Dynamically loads the colour-skin CSS based on the current theme colour. */
export default function SkinStylesheet() {
  const { color } = useTunisContext();
  const skin = color === "default" ? "" : color; // template supports blue, green, etc.
  const href = skin ? `${basePath}/assets/css/skins/${skin}.css` : `${basePath}/assets/css/skins/blue.css`;
  return <link rel="stylesheet" href={href} />;
}
