/**
 * Server-side tide retrieval for the Manila Bay Beach guide.
 * Fetched on the server (SSR / Cloudflare Workers) and cached,
 * so every visitor gets the same short-lived snapshot.
 */

export interface TideHour {
  time: string;
  height: number;
}

export interface TideEvent extends TideHour {
  type: 'high' | 'low';
}

export interface TideSnapshot {
  hours: TideHour[];
  events: TideEvent[];
  current: {
    height: number;
    rising: boolean;
    next: TideEvent | null;
    minutesToNext: number;
  };
  today: TideHour[];
  range: number;
  updatedAt: number;
}

const ENDPOINT = 'https://marine-api.open-meteo.com/v1/marine';
const TIMEZONE = 'Asia/Manila';
const CACHE_TTL_MS = 30 * 60 * 1000;

let cache: { data: TideSnapshot; expiresAt: number } | null = null;

function manilaHourIso(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '01';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:00`;
}

function findExtremes(hours: TideHour[], window = 2): TideEvent[] {
  const raw: TideEvent[] = [];
  for (let i = window; i < hours.length - window; i++) {
    let isMax = true;
    let isMin = true;
    for (let j = i - window; j <= i + window; j++) {
      if (j === i) continue;
      if (hours[j].height > hours[i].height) isMax = false;
      if (hours[j].height < hours[i].height) isMin = false;
    }
    if (isMax) raw.push({ ...hours[i], type: 'high' });
    else if (isMin) raw.push({ ...hours[i], type: 'low' });
  }

  const events: TideEvent[] = [];
  for (const e of raw) {
    const last = events[events.length - 1];
    if (last && last.type === e.type) {
      const stronger = e.type === 'high' ? e.height > last.height : e.height < last.height;
      if (stronger) events[events.length - 1] = e;
    } else {
      events.push(e);
    }
  }
  return events;
}

export async function getTideSnapshot(latitude: number, longitude: number): Promise<TideSnapshot | null> {
  if (cache && cache.expiresAt > Date.now()) return cache.data;

  try {
    const url = new URL(ENDPOINT);
    url.searchParams.set('latitude', String(latitude));
    url.searchParams.set('longitude', String(longitude));
    url.searchParams.set('hourly', 'sea_level_height_msl');
    url.searchParams.set('timezone', TIMEZONE);
    url.searchParams.set('forecast_days', '3');

    const response = await fetch(url.toString(), { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error(`tide request failed: ${response.status}`);

    const json = (await response.json()) as Record<string, any>;
    const times: string[] = json?.hourly?.time ?? [];
    const levels: (number | null)[] = json?.hourly?.sea_level_height_msl ?? [];

    const hours: TideHour[] = [];
    for (let i = 0; i < times.length; i++) {
      const h = levels[i];
      if (typeof h === 'number' && Number.isFinite(h)) {
        hours.push({ time: String(times[i]).slice(0, 16), height: h });
      }
    }
    if (hours.length < 12) throw new Error('tide payload too short');

    const events = findExtremes(hours);
    const nowIso = manilaHourIso();
    const todayKey = nowIso.slice(0, 10);
    const today = hours.filter((h) => h.time.startsWith(todayKey));
    const series = today.length ? today : hours.slice(0, 24);

    let index = hours.findIndex((h) => h.time > nowIso) - 1;
    if (index < 0) index = 0;
    if (index >= hours.length - 1) index = hours.length - 2;

    const next = events.find((e) => e.time > nowIso) ?? null;
    const minutesToNext = next
      ? Math.max(
          0,
          Math.round((Date.parse(`${next.time}:00+08:00`) - Date.parse(`${nowIso}:00+08:00`)) / 60000)
        )
      : 0;

    const heights = series.map((s) => s.height);
    const snapshot: TideSnapshot = {
      hours,
      events,
      current: {
        height: hours[index]?.height ?? 0,
        rising: (hours[index + 1]?.height ?? 0) >= (hours[index]?.height ?? 0),
        next,
        minutesToNext,
      },
      today: series,
      range: heights.length ? Math.max(...heights) - Math.min(...heights) : 0,
      updatedAt: Date.now(),
    };

    cache = { data: snapshot, expiresAt: Date.now() + CACHE_TTL_MS };
    return snapshot;
  } catch {
    return cache?.data ?? null;
  }
}

export function tideAdvice(snapshot: TideSnapshot): string {
  const { current, range } = snapshot;
  if (current.next?.type === 'low') {
    return `正在退潮，约 ${Math.round(current.minutesToNext / 60)} 小时后到达低潮。低潮前后一小时是观察潮间带蟹类、贝类与滩涂纹理的最佳窗口，请始终留意回程路线，别被上涨的潮水切断退路。`;
  }
  return `正在涨潮，下一次高潮约在 ${Math.round(current.minutesToNext / 60)} 小时后。高潮时水面更靠近海堤，适合拍摄船影与倒影；潮间带观察则要等退潮后再来。`;
}
