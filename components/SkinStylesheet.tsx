"use client";

import { useTunisContext } from "@/contexts/TunisContext";
import { prefixAssetPath } from "@/lib/utils";

/** Dynamically loads the colour-skin CSS based on the current theme colour. */
export default function SkinStylesheet() {
  const { color } = useTunisContext();
  const skin = color === "default" ? "" : color; // template supports blue, green, etc.
  const href = prefixAssetPath(`/assets/css/skins/${skin || "blue"}.css`);
  return <link rel="stylesheet" href={href} />;
}
