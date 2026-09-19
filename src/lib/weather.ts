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
      headline: '建议带伞',
      detail: `降水概率约 ${chance}%，预计降雨 ${day.precipitationSum.toFixed(1)} mm —— 折叠伞或轻便雨衣值得带上。`,
    };
  }
  if (chance >= 25) {
    return {
      level: 'possible',
      headline: '可备轻便雨衣',
      detail: `降水概率约 ${chance}%，热带阵雨通常 20–30 分钟就停，可在长廊遮雨处等一等。`,
    };
  }
  return {
    level: 'none',
    headline: '无需雨具',
    detail: `降水概率约 ${chance}%，雨具基本用不上，防晒反而更重要。`,
  };
}

export function uvLabel(uv: number | null): string {
  if (uv === null) return '紫外线中等';
  if (uv >= 11) return '紫外线极强';
  if (uv >= 8) return '紫外线很强';
  if (uv >= 6) return '紫外线强';
  if (uv >= 5) return '紫外线偏强';
  if (uv >= 3) return '紫外线中等';
  return '紫外线弱';
}

export function sunAdvice(uv: number | null): string {
  if (uv === null) return '建议备好帽子、墨镜与防晒霜。';
  if (uv >= 11) return `${uv.toFixed(0)} 级（极强）—— 正午尽量别在户外暴晒，防晒霜要勤补涂。`;
  if (uv >= 8) return `${uv.toFixed(0)} 级（很强）—— 防晒霜、帽子与遮阴休息都很必要。`;
  if (uv >= 6) return `${uv.toFixed(0)} 级（强）—— 建议防晒霜 + 遮阳帽。`;
  if (uv >= 3) return `${uv.toFixed(0)} 级（中等）—— 轻度防晒即可。`;
  return `${uv.toFixed(0)} 级（弱）—— 基本不需要特别防晒。`;
}

const BEAUFORT_LIMITS = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
const BEAUFORT_NAMES = [
  '无风',
  '软风',
  '轻风',
  '微风',
  '和风',
  '清风',
  '强风',
  '疾风',
  '大风',
  '烈风',
  '狂风',
  '暴风',
  '飓风',
];

/** Convert km/h to the Beaufort scale visitors actually understand. */
export function beaufort(speedKmh: number): { level: number; name: string } {
  let level = BEAUFORT_LIMITS.findIndex((limit) => speedKmh < limit);
  if (level < 0) level = 12;
  return { level, name: BEAUFORT_NAMES[level] };
}

export function humidityLabel(humidity: number): string {
  if (humidity >= 85) return '非常闷湿';
  if (humidity >= 75) return '偏闷热';
  if (humidity >= 60) return '略潮湿';
  if (humidity >= 40) return '体感舒适';
  return '偏干燥';
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
      text: '今天可能出现雷暴：不要在海边开阔地、树下或海堤上停留，水上与露天项目大概率关闭。',
    });
  }
  if (wind.level >= 7) {
    risks.push({
      id: 'wind-risk',
      text: `风力可达 ${wind.level} 级（${wind.name}）：远离广告牌、临时搭建物与海边礁石，海上项目大概率停航。`,
    });
  }
  if (today.precipitationSum >= 15 || HEAVY_RAIN_CODES.has(current.weatherCode) || HEAVY_RAIN_CODES.has(today.weatherCode)) {
    risks.push({
      id: 'heavy-rain',
      text: '雨势较大：避开低洼路段、海边礁石区与湿滑台阶，注意城市内涝与道路积水。',
    });
  }
  if (group === 'fog' || groupToday === 'fog') {
    risks.push({
      id: 'fog',
      text: '有雾、能见度差：轮渡与航班容易延误，观景、看日落的效果会明显打折。',
    });
  }
  if (tmax >= 35) {
    risks.push({
      id: 'heat',
      text: `最高气温 ${Math.round(tmax)}°C：注意防暑，老人、儿童与慢性病患者尽量避开正午户外。`,
    });
  }

  // --- what to wear ---
  if (tmax >= 32) {
    outfit.push({
      id: 'hot',
      text: `最高 ${Math.round(tmax)}°C，穿透气轻薄的夏装，正午尽量待在阴凉处。`,
    });
  } else if (tmax >= 27) {
    outfit.push({
      id: 'warm-day',
      text: `${Math.round(tmin)}–${Math.round(tmax)}°C，短袖夏装即可；傍晚海风偏凉，可备一件薄外套。`,
    });
  } else if (tmax <= 10) {
    outfit.push({
      id: 'cold',
      text: `最高仅 ${Math.round(tmax)}°C，注意保暖，厚外套与围巾都派得上用场。`,
    });
  }
  if (diff > 8) {
    outfit.push({ id: 'swing', text: `昼夜温差约 ${diff}°C，早晚加一件薄外套，方便随时增减。` });
  }
  if (chance >= 60) {
    outfit.push({ id: 'rain-outfit', text: '大概率有雨，外面套一件防水外套更省心。' });
  }
  if (wind.level >= 5 && wind.level <= 6) {
    outfit.push({ id: 'windy-outfit', text: '风偏大，不建议穿宽松长裙，帽子容易被吹落。' });
  }
  if (current.humidity >= 80) {
    outfit.push({ id: 'humid', text: `湿度约 ${current.humidity}%（${humidityLabel(current.humidity)}），优选速干面料。` });
  }

  // --- how to plan the visit ---
  if (chance >= 60) {
    plan.push({
      id: 'rain-plan',
      text: '优先安排室内场馆（博物馆、美术馆、商场），海边与露天行程建议延后。',
    });
  } else if (
    DRIZZLE_CODES.has(current.weatherCode) ||
    LIGHT_RAIN_CODES.has(current.weatherCode) ||
    (chance >= 25 && chance < 60)
  ) {
    plan.push({
      id: 'light-rain-plan',
      text: '有小雨，露天体验一般：可缩短海边停留，转去室内或咖啡馆歇脚。',
    });
  }
  if (STORM_CODES.has(current.weatherCode) || STORM_CODES.has(today.weatherCode)) {
    plan.push({ id: 'storm-plan', text: '雷暴时段不要下水或在海边逗留，等天气转好再安排户外。' });
  }
  if (current.isDay && (group === 'clear' || (groupToday === 'clear' && group !== 'rain'))) {
    plan.push({
      id: 'clear-plan',
      text: `天气晴好，最适合看日落 —— 今天日落 ${today.sunset.slice(11, 16)}，提前 30–40 分钟去占位。`,
    });
  }
  if (current.isDay && (group === 'cloudy' || (groupToday === 'cloudy' && group === 'partly'))) {
    plan.push({
      id: 'cloudy-plan',
      text: '光线柔和，很适合拍照；没有暴晒，适合沿长廊慢慢逛。',
    });
  }
  if (!current.isDay) {
    plan.push({
      id: 'night-plan',
      text: '现在是夜间时段：长廊有照明但人少，建议结伴、走主道，看日落请安排在明天日落前 40 分钟到场。',
    });
  }
  if (tmax >= 32) {
    plan.push({ id: 'heat-plan', text: '把户外行程压到清晨或 17:00 之后，正午安排在阴凉处休息。' });
  }
  if (current.isDay && (uv ?? 0) >= 5) {
    plan.push({ id: 'uv-plan', text: `${uvLabel(uv)}，海面与白沙反射强烈，注意补涂防晒。` });
  }
  if (wind.level >= 5) {
    plan.push({ id: 'wind-plan', text: '风力偏大，海边游船与部分露天项目可能停航停运。' });
  }

  // --- what to bring ---
  if (STORM_CODES.has(current.weatherCode) || HEAVY_RAIN_CODES.has(current.weatherCode) || wind.level >= 7) {
    packing.push({ id: 'raincoat', text: '雨衣（风大时不建议长柄伞）' });
  } else if (chance >= 60) {
    packing.push({ id: 'umbrella', text: '折叠伞或轻便雨衣' });
  } else if (chance >= 25) {
    packing.push({ id: 'mini-umbrella', text: '折叠伞（阵雨通常 20–30 分钟就停）' });
  }
  if ((uv ?? 0) >= 5) {
    packing.push({ id: 'sun-kit', text: '防晒霜、墨镜、遮阳帽' });
  }
  if (tmax >= 32) {
    packing.push({ id: 'water', text: '充足饮用水与电解质补充' });
  }
  if (group === 'fog' || groupToday === 'fog') {
    packing.push({ id: 'mask', text: '口罩' });
  }
  packing.push({ id: 'bottle', text: '可重复使用的水杯（沙滩段限制一次性塑料）' });
  packing.push({ id: 'shoes', text: '好走的平底鞋（长廊与海堤有湿滑段）' });

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
