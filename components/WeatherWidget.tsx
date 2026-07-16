"use client";

import { useEffect, useState } from "react";
import { getCachedWeather, type WeatherData } from "@/lib/weather";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    getCachedWeather("hoChiMinh")
      .then((data) => {
        if (mounted) setWeather(data);
      })
      .catch(() => {
        if (mounted) setFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (failed) {
    return (
      <span className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-fs-12 font-semibold text-zinc-500">
        <i className="fa-solid fa-cloud" />
        Weather offline
      </span>
    );
  }

  if (!weather) {
    return (
      <span className="hidden lg:inline-flex h-10 w-28 animate-pulse rounded-full border border-white/10 bg-white/[0.03]" aria-hidden />
    );
  }

  return (
    <span
      className="hidden lg:inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-3 py-2 text-fs-12 font-semibold text-zinc-300"
      title={`${weather.location.name}: ${weather.label} / ${weather.labelVi}`}
    >
      <span aria-hidden>{weather.icon}</span>
      <span>{weather.location.shortName}</span>
      <span className="text-blue-300">{weather.temperature}&deg;C</span>
    </span>
  );
}