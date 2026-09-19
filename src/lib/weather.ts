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
      detail: `Rain chance around ${chance}%. Expect ${day.precipitationSum.toFixed(1)} mm of rain — a compact umbrella or light rain jacket is worth packing.`,
    };
  }
  if (chance >= 25) {
    return {
      level: 'possible',
      headline: 'Pack a light rain cover',
      detail: `Rain chance around ${chance}%. Short tropical showers usually pass within 20–30 minutes — wait it out under the promenade shelters.`,
    };
  }
  return {
    level: 'none',
    headline: 'No rain gear needed',
    detail: `Rain chance around ${chance}%. Sun protection matters more than an umbrella on a day like this.`,
  };
}

export function sunAdvice(uv: number | null): string {
  if (uv === null) return 'Sun protection: hat, sunglasses and sunscreen.';
  if (uv >= 11) return `UV index ${uv.toFixed(0)} (extreme) — avoid midday exposure, reapply sunscreen often.`;
  if (uv >= 8) return `UV index ${uv.toFixed(0)} (very high) — sunscreen, hat and shade breaks are essential.`;
  if (uv >= 6) return `UV index ${uv.toFixed(0)} (high) — sunscreen and a hat are recommended.`;
  if (uv >= 3) return `UV index ${uv.toFixed(0)} (moderate) — light sun protection is enough.`;
  return `UV index ${uv.toFixed(0)} (low) — minimal sun protection needed.`;
}
