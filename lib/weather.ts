export const WEATHER_CACHE_KEY = "portfolio-weather-v1";
export const WEATHER_CACHE_TTL = 15 * 60 * 1000;

export type WeatherLocationKey = "hoChiMinh" | "quyNhon" | "giaLai";

export interface WeatherLocation {
  key: WeatherLocationKey;
  name: string;
  shortName: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface WeatherData {
  location: WeatherLocation;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  rain: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
  sunrise: string;
  sunset: string;
  icon: string;
  label: string;
  labelVi: string;
  mood: string;
}

type CachedWeather = {
  savedAt: number;
  data: WeatherData;
};

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
}

export const WEATHER_LOCATIONS: Record<WeatherLocationKey, WeatherLocation> = {
  hoChiMinh: {
    key: "hoChiMinh",
    name: "Ho Chi Minh City",
    shortName: "Saigon",
    latitude: 10.8231,
    longitude: 106.6297,
    timezone: "Asia/Ho_Chi_Minh",
  },
  quyNhon: {
    key: "quyNhon",
    name: "Quy Nhon",
    shortName: "Quy Nhon",
    latitude: 13.782,
    longitude: 109.219,
    timezone: "Asia/Ho_Chi_Minh",
  },
  giaLai: {
    key: "giaLai",
    name: "Gia Lai",
    shortName: "Gia Lai",
    latitude: 13.9833,
    longitude: 108,
    timezone: "Asia/Ho_Chi_Minh",
  },
};

export function mapWeatherCode(code: number, isDay = true) {
  if (code === 0) return { icon: isDay ? "\u2600\ufe0f" : "\ud83c\udf19", label: "Clear", labelVi: "Troi quang" };
  if ([1, 2].includes(code)) return { icon: isDay ? "\ud83c\udf24\ufe0f" : "\u2601\ufe0f", label: "Partly cloudy", labelVi: "It may" };
  if (code === 3) return { icon: "\u2601\ufe0f", label: "Cloudy", labelVi: "Nhieu may" };
  if ([45, 48].includes(code)) return { icon: "\ud83c\udf2b\ufe0f", label: "Fog", labelVi: "Suong mu" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "\ud83c\udf26\ufe0f", label: "Drizzle", labelVi: "Mua phun" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "\ud83c\udf27\ufe0f", label: "Rain", labelVi: "Mua" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "\u2744\ufe0f", label: "Snow", labelVi: "Tuyet" };
  if ([95, 96, 99].includes(code)) return { icon: "\u26c8\ufe0f", label: "Thunderstorm", labelVi: "Dong" };
  return { icon: "\ud83c\udf21\ufe0f", label: "Weather", labelVi: "Thoi tiet" };
}

export function getDeveloperMood(weather: Pick<WeatherData, "temperature" | "rain" | "precipitation" | "isDay" | "weatherCode">) {
  if (!weather.isDay) return "Quiet late-night build mode, perfect for focused debugging.";
  if (weather.rain > 0 || weather.precipitation > 0 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weather.weatherCode)) {
    return "Rainy Saigon energy: hot coffee, calm commits, fewer distractions.";
  }
  if (weather.temperature >= 35) return "Hot day, laptop fans awake. Hydrate before chasing builds.";
  if (weather.temperature >= 30) return "Warm weather, steady focus. Good window for shipping UI polish.";
  return "Comfortable weather, clean headspace for careful code review.";
}

export async function fetchWeather(locationKey: WeatherLocationKey = "hoChiMinh"): Promise<WeatherData> {
  const location = WEATHER_LOCATIONS[locationKey];
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m",
    daily: "sunrise,sunset",
    timezone: location.timezone,
    forecast_days: "1",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);

  const data = (await response.json()) as OpenMeteoResponse;
  const isDay = data.current.is_day === 1;
  const mapped = mapWeatherCode(data.current.weather_code, isDay);
  const weather = {
    location,
    temperature: Math.round(data.current.temperature_2m),
    apparentTemperature: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    precipitation: data.current.precipitation,
    rain: data.current.rain,
    weatherCode: data.current.weather_code,
    isDay,
    time: data.current.time,
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    icon: mapped.icon,
    label: mapped.label,
    labelVi: mapped.labelVi,
    mood: "",
  } satisfies WeatherData;

  return { ...weather, mood: getDeveloperMood(weather) };
}

export function readCachedWeather(locationKey: WeatherLocationKey = "hoChiMinh") {
  try {
    const raw = sessionStorage.getItem(`${WEATHER_CACHE_KEY}:${locationKey}`);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedWeather;
    if (Date.now() - cached.savedAt > WEATHER_CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

export function writeCachedWeather(data: WeatherData) {
  try {
    sessionStorage.setItem(`${WEATHER_CACHE_KEY}:${data.location.key}`, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // sessionStorage can be blocked; live weather still renders.
  }
}

export async function getCachedWeather(locationKey: WeatherLocationKey = "hoChiMinh") {
  const cached = readCachedWeather(locationKey);
  if (cached) return cached;

  const data = await fetchWeather(locationKey);
  writeCachedWeather(data);
  return data;
}

export function formatWeatherTime(value: string) {
  return value.split("T")[1]?.slice(0, 5) ?? "--";
}
