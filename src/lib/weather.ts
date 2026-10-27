/**
 * Server-side weather retrieval for the Manila Bay Beach guide.
 * Runs on the server (SSR / Cloudflare Workers) and keeps a short-lived
 * in-memory cache so concurrent visitors reuse the same response.
 */

export interface WeatherCurrent {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  isDay: boolean;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  windSpeed: number;
  windGusts: number;
}

export interface WeatherDay {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax: number | null;
  uvIndexMax: number | null;
  windSpeedMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherSnapshot {
  current: WeatherCurrent;
  daily: WeatherDay[];
  updatedAt: number;
}

const ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const TIMEZONE = 'Asia/Manila';
const CACHE_TTL_MS = 10 * 60 * 1000;

let cache: { data: WeatherSnapshot; expiresAt: number } | null = null;

function num(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export async function getWeatherSnapshot(
  latitude: number,
  longitude: number
): Promise<WeatherSnapshot | null> {
  if (cache && cache.expiresAt > Date.now()) return cache.data;

  try {
    const url = new URL(ENDPOINT);
    url.searchParams.set('latitude', String(latitude));
    url.searchParams.set('longitude', String(longitude));
    url.searchParams.set(
      'current',
      'temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m'
    );
    url.searchParams.set(
      'daily',
      'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,uv_index_max,wind_speed_10m_max,sunrise,sunset'
    );
    url.searchParams.set('timezone', TIMEZONE);
    url.searchParams.set('forecast_days', '7');

    const response = await fetch(url.toString(), {
      headers: { accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`weather request failed: ${response.status}`);

    const json = (await response.json()) as Record<string, any>;
    const current = json?.current ?? {};
    const daily = json?.daily ?? {};
    const dates: string[] = Array.isArray(daily.time) ? daily.time : [];
    if (!dates.length) throw new Error('weather payload missing daily series');

    const days: WeatherDay[] = dates.map((date, i) => ({
      date,
      weatherCode: num(daily.weather_code?.[i], 0),
      tempMax: num(daily.temperature_2m_max?.[i]),
      tempMin: num(daily.temperature_2m_min?.[i]),
      precipitationSum: num(daily.precipitation_sum?.[i]),
      precipitationProbabilityMax:
        typeof daily.precipitation_probability_max?.[i] === 'number'
          ? (daily.precipitation_probability_max[i] as number)
          : null,
      uvIndexMax:
        typeof daily.uv_index_max?.[i] === 'number' ? (daily.uv_index_max[i] as number) : null,
      windSpeedMax: num(daily.wind_speed_10m_max?.[i]),
      sunrise: str(daily.sunrise?.[i]),
      sunset: str(daily.sunset?.[i]),
    }));

    const snapshot: WeatherSnapshot = {
      current: {
        time: str(current.time, dates[0]),
        temperature: num(current.temperature_2m),
        apparentTemperature: num(current.apparent_temperature, num(current.temperature_2m)),
        humidity: num(current.relative_humidity_2m),
        isDay: current.is_day === 1 || current.is_day === true,
        precipitation: num(current.precipitation),
        weatherCode: num(current.weather_code, days[0]?.weatherCode ?? 0),
        cloudCover: num(current.cloud_cover),
        windSpeed: num(current.wind_speed_10m),
        windGusts: num(current.wind_gusts_10m),
      },
      daily: days,
      updatedAt: Date.now(),
    };

    cache = { data: snapshot, expiresAt: Date.now() + CACHE_TTL_MS };
    return snapshot;
  } catch {
    return cache?.data ?? null;
  }
}

export type WeatherGroup = 'clear' | 'partly' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'storm';

export const WEATHER_CODES: Record<number, { label: string; group: WeatherGroup }> = {
  0: { label: 'Clear sky', group: 'clear' },
  1: { label: 'Mainly clear', group: 'clear' },
  2: { label: 'Partly cloudy', group: 'partly' },
  3: { label: 'Overcast', group: 'cloudy' },
  45: { label: 'Fog', group: 'fog' },
  48: { label: 'Rime fog', group: 'fog' },
  51: { label: 'Light drizzle', group: 'drizzle' },
  53: { label: 'Drizzle', group: 'drizzle' },
  55: { label: 'Heavy drizzle', group: 'drizzle' },
  56: { label: 'Freezing drizzle', group: 'drizzle' },
  57: { label: 'Freezing drizzle', group: 'drizzle' },
  61: { label: 'Light rain', group: 'rain' },
  63: { label: 'Rain', group: 'rain' },
  65: { label: 'Heavy rain', group: 'rain' },
  66: { label: 'Freezing rain', group: 'rain' },
  67: { label: 'Freezing rain', group: 'rain' },
  71: { label: 'Light snow', group: 'rain' },
  73: { label: 'Snow', group: 'rain' },
  75: { label: 'Heavy snow', group: 'rain' },
  77: { label: 'Snow grains', group: 'rain' },
  80: { label: 'Light showers', group: 'rain' },
  81: { label: 'Showers', group: 'rain' },
  82: { label: 'Violent showers', group: 'rain' },
  85: { label: 'Snow showers', group: 'rain' },
  86: { label: 'Snow showers', group: 'rain' },
  95: { label: 'Thunderstorm', group: 'storm' },
  96: { label: 'Thunderstorm with hail', group: 'storm' },
  99: { label: 'Thunderstorm with hail', group: 'storm' },
};

export function describeWeatherCode(code: number): { label: string; group: WeatherGroup } {
  return WEATHER_CODES[code] ?? { label: 'Unknown', group: 'cloudy' };
}

/** Rain chance for a given day: use the model probability when present, else derive from volume. */
export function rainChance(day: WeatherDay): number {
  if (typeof day.precipitationProbabilityMax === 'number') return day.precipitationProbabilityMax;
  const mm = day.precipitationSum;
  if (mm <= 0) return 0;
  if (mm < 1) return 20;
  if (mm < 5) return 45;
  if (mm < 15) return 70;
  return 90;
}

export interface UmbrellaAdvice {
  level: 'needed' | 'possible' | 'none';
  headline: string;
  detail: string;
}

/** Plain-language "do I need an umbrella" answer for a day. */
export function umbrellaAdvice(day: WeatherDay): UmbrellaAdvice {
  const chance = rainChance(day);
  if (chance >= 60) {
    return {
      level: 'needed',
      headline: 'Bring an umbrella',
      detail: `Rain chance about ${chance}%, expected ${day.precipitationSum.toFixed(1)} mm — a folding umbrella or light raincoat is worth carrying.`,
    };
  }
  if (chance >= 25) {
    return {
      level: 'possible',
      headline: 'A light raincoat helps',
      detail: `Rain chance about ${chance}%; tropical showers usually stop within 20–30 min, so wait under the corridor's cover.`,
    };
  }
  return {
    level: 'none',
    headline: 'No rain gear needed',
    detail: `Rain chance about ${chance}%; you won't really need rain gear — sun protection matters more.`,
  };
}

export function uvLabel(uv: number | null): string {
  if (uv === null) return 'Moderate UV';
  if (uv >= 11) return 'Extreme UV';
  if (uv >= 8) return 'Very high UV';
  if (uv >= 6) return 'High UV';
  if (uv >= 5) return 'Rather high UV';
  if (uv >= 3) return 'Moderate UV';
  return 'Low UV';
}

export function sunAdvice(uv: number | null): string {
  if (uv === null) return 'Bring a hat, sunglasses and sunscreen.';
  if (uv >= 11) return `${uv.toFixed(0)} (extreme) — avoid midday sun, reapply sunscreen often.`;
  if (uv >= 8) return `${uv.toFixed(0)} (very high) — sunscreen, hat and shaded breaks are essential.`;
  if (uv >= 6) return `${uv.toFixed(0)} (high) — sunscreen plus a sun hat recommended.`;
  if (uv >= 3) return `${uv.toFixed(0)} (moderate) — light sun protection is enough.`;
  return `${uv.toFixed(0)} (low) — no special sun protection needed.`;
}

const BEAUFORT_LIMITS = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
const BEAUFORT_NAMES = [
  'Calm',
  'Light air',
  'Light breeze',
  'Gentle breeze',
  'Moderate breeze',
  'Fresh breeze',
  'Strong breeze',
  'Near gale',
  'Gale',
  'Strong gale',
  'Storm',
  'Violent storm',
  'Hurricane',
];

/** Convert km/h to the Beaufort scale visitors actually understand. */
export function beaufort(speedKmh: number): { level: number; name: string } {
  let level = BEAUFORT_LIMITS.findIndex((limit) => speedKmh < limit);
  if (level < 0) level = 12;
  return { level, name: BEAUFORT_NAMES[level] };
}

export function humidityLabel(humidity: number): string {
  if (humidity >= 85) return 'Very humid';
  if (humidity >= 75) return 'Humid';
  if (humidity >= 60) return 'Slightly humid';
  if (humidity >= 40) return 'Comfortable';
  return 'Dry';
}

const HEAVY_RAIN_CODES = new Set([65, 67, 82, 86]);
const STORM_CODES = new Set([95, 96, 99]);
const DRIZZLE_CODES = new Set([51, 53, 55, 56, 57]);
const LIGHT_RAIN_CODES = new Set([61, 80]);

export interface AdviceItem {
  id: string;
  text: string;
}

export interface AdviceBundle {
  level: 'risk' | 'caution' | 'good';
  risks: AdviceItem[];
  outfit: AdviceItem[];
  plan: AdviceItem[];
  packing: AdviceItem[];
}

function dedupe(items: AdviceItem[]): AdviceItem[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (seen.has(i.id)) return false;
    seen.add(i.id);
    return true;
  });
}

/**
 * Turn raw numbers into plain-language, actionable advice.
 * Only matching rules are returned — the UI hides everything else.
 */
export function buildAdvice(snapshot: WeatherSnapshot): AdviceBundle {
  const today = snapshot.daily[0];
  const current = snapshot.current;
  const chance = rainChance(today);
  const tmax = today.tempMax;
  const tmin = today.tempMin;
  const diff = Math.round(tmax - tmin);
  const uv = today.uvIndexMax;
  const windSpeed = Math.max(current.windSpeed, today.windSpeedMax, current.windGusts * 0.8);
  const wind = beaufort(windSpeed);
  const group = describeWeatherCode(current.weatherCode).group;
  const groupToday = describeWeatherCode(today.weatherCode).group;

  const risks: AdviceItem[] = [];
  const outfit: AdviceItem[] = [];
  const plan: AdviceItem[] = [];
  const packing: AdviceItem[] = [];

  // --- risks (highest priority) ---
  if (STORM_CODES.has(current.weatherCode) || STORM_CODES.has(today.weatherCode)) {
    risks.push({
      id: 'storm',
      text: 'Thunderstorms possible today: do not linger on open shore, under trees or on the seawall; water and open-air activities are likely closed.',
    });
  }
  if (wind.level >= 7) {
    risks.push({
      id: 'wind-risk',
      text: `Wind up to ${wind.level} (${wind.name}): stay away from signs, temporary structures and seaside rocks; boat trips are likely suspended.`,
    });
  }
  if (today.precipitationSum >= 15 || HEAVY_RAIN_CODES.has(current.weatherCode) || HEAVY_RAIN_CODES.has(today.weatherCode)) {
    risks.push({
      id: 'heavy-rain',
      text: 'Heavy rain: avoid low-lying roads, seaside rocks and slippery steps; watch for urban flooding and ponding.',
    });
  }
  if (group === 'fog' || groupToday === 'fog') {
    risks.push({
      id: 'fog',
      text: 'Fog, poor visibility: ferries and flights are easily delayed, and views or sunset scenes will suffer.',
    });
  }
  if (tmax >= 35) {
    risks.push({
      id: 'heat',
      text: `High of ${Math.round(tmax)}°C: take heat precautions; the elderly, children and those with chronic illness should avoid midday outdoors.`,
    });
  }

  // --- what to wear ---
  if (tmax >= 32) {
    outfit.push({
      id: 'hot',
      text: `High of ${Math.round(tmax)}°C — wear breathable light summer clothes and stay in shade at midday.`,
    });
  } else if (tmax >= 27) {
    outfit.push({
      id: 'warm-day',
      text: `${Math.round(tmin)}–${Math.round(tmax)}°C — short sleeves are fine; a light jacket for the cooler evening sea breeze.`,
    });
  } else if (tmax <= 10) {
    outfit.push({
      id: 'cold',
      text: `High only ${Math.round(tmax)}°C — keep warm; a thick coat and scarf come in handy.`,
    });
  }
  if (diff > 8) {
    outfit.push({ id: 'swing', text: `Day-night swing about ${diff}°C — add a light jacket morning and evening, easy to layer.` });
  }
  if (chance >= 60) {
    outfit.push({ id: 'rain-outfit', text: 'Likely rain — a waterproof outer layer over everything is easiest.' });
  }
  if (wind.level >= 5 && wind.level <= 6) {
    outfit.push({ id: 'windy-outfit', text: 'Breezy — avoid loose long skirts; hats can blow off.' });
  }
  if (current.humidity >= 80) {
    outfit.push({ id: 'humid', text: `Humidity about ${current.humidity}% (${humidityLabel(current.humidity)}) — prefer quick-dry fabrics.` });
  }

  // --- how to plan the visit ---
  if (chance >= 60) {
    plan.push({
      id: 'rain-plan',
      text: 'Prioritise indoor venues (museums, galleries, malls); postpone the shore and open-air plans.',
    });
  } else if (
    DRIZZLE_CODES.has(current.weatherCode) ||
    LIGHT_RAIN_CODES.has(current.weatherCode) ||
    (chance >= 25 && chance < 60)
  ) {
    plan.push({
      id: 'light-rain-plan',
      text: 'Light rain — the open-air experience is so-so: shorten time at the shore, move indoors or to a café.',
    });
  }
  if (STORM_CODES.has(current.weatherCode) || STORM_CODES.has(today.weatherCode)) {
    plan.push({ id: 'storm-plan', text: 'During thunderstorms do not swim or linger by the sea; wait for clearing before going out.' });
  }
  if (current.isDay && (group === 'clear' || (groupToday === 'clear' && group !== 'rain'))) {
    plan.push({
      id: 'clear-plan',
      text: `Clear weather, best for sunset — today's sunset ${today.sunset.slice(11, 16)}, arrive 30–40 min early to claim a spot.`,
    });
  }
  if (current.isDay && (group === 'cloudy' || (groupToday === 'cloudy' && group === 'partly'))) {
    plan.push({
      id: 'cloudy-plan',
      text: 'Soft light, great for photos; no harsh sun, good for a slow stroll along the corridor.',
    });
  }
  if (!current.isDay) {
    plan.push({
      id: 'night-plan',
      text: 'It is nighttime: the corridor is lit but quiet — go with company on the main path; plan sunset for 40 min before tomorrow\'s sunset.',
    });
  }
  if (tmax >= 32) {
    plan.push({ id: 'heat-plan', text: 'Push outdoor plans to early morning or after 17:00; rest in shade at midday.' });
  }
  if (current.isDay && (uv ?? 0) >= 5) {
    plan.push({ id: 'uv-plan', text: `${uvLabel(uv)} — strong reflection off the sea and white sand, reapply sunscreen.` });
  }
  if (wind.level >= 5) {
    plan.push({ id: 'wind-plan', text: 'Breezy — seaside boat rides and some open-air activities may be suspended.' });
  }

  // --- what to bring ---
  if (STORM_CODES.has(current.weatherCode) || HEAVY_RAIN_CODES.has(current.weatherCode) || wind.level >= 7) {
    packing.push({ id: 'raincoat', text: 'Raincoat (long-handle umbrellas are awkward in wind)' });
  } else if (chance >= 60) {
    packing.push({ id: 'umbrella', text: 'Folding umbrella or light raincoat' });
  } else if (chance >= 25) {
    packing.push({ id: 'mini-umbrella', text: 'Folding umbrella (showers usually stop in 20–30 min)' });
  }
  if ((uv ?? 0) >= 5) {
    packing.push({ id: 'sun-kit', text: 'Sunscreen, sunglasses, sun hat' });
  }
  if (tmax >= 32) {
    packing.push({ id: 'water', text: 'Plenty of drinking water and electrolytes' });
  }
  if (group === 'fog' || groupToday === 'fog') {
    packing.push({ id: 'mask', text: 'Face mask' });
  }
  packing.push({ id: 'bottle', text: 'Reusable water bottle (single-use plastic limited on the beach)' });
  packing.push({ id: 'shoes', text: 'Comfortable flat shoes (corridor and seawall have slippery spots)' });

  const level: AdviceBundle['level'] = risks.length
    ? 'risk'
    : chance >= 25 || wind.level >= 5 || tmax >= 32 || (uv ?? 0) >= 8
      ? 'caution'
      : 'good';

  return {
    level,
    risks: dedupe(risks),
    outfit: dedupe(outfit),
    plan: dedupe(plan),
    packing: dedupe(packing),
  };
}
