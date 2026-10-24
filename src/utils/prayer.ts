export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface PrayerInfo {
  name: string;
  timeStr: string;
  date: Date;
  isNext: boolean;
}

export const DEFAULT_CITIES = [
  { name: 'Mecca', lat: 21.4225, lon: 39.8262 },
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 }
];

// Fallback timings for immediate render before API returns
export const FALLBACK_TIMINGS: Record<string, string> = {
  Fajr: '05:22',
  Sunrise: '06:44',
  Dhuhr: '12:45',
  Asr: '16:02',
  Maghrib: '18:46',
  Isha: '20:08'
};

export async function fetchLivePrayerTimes(lat: number, lon: number): Promise<{ timings: Record<string, string>; dateReadable: string; hijriDate: string }> {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lon}&method=2`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Prayer API response failed');
  }
  const json = await response.json();
  if (json.code !== 200) {
    throw new Error('Invalid prayer data response');
  }

  const t = json.data.timings;
  const timings: Record<string, string> = {
    Fajr: t.Fajr.split(' ')[0],
    Sunrise: t.Sunrise.split(' ')[0],
    Dhuhr: t.Dhuhr.split(' ')[0],
    Asr: t.Asr.split(' ')[0],
    Maghrib: t.Maghrib.split(' ')[0],
    Isha: t.Isha.split(' ')[0]
  };

  const dateReadable = json.data.date?.readable || today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const hijri = json.data.date?.hijri;
  const hijriDate = hijri ? `${hijri.day} ${hijri.month.en} ${hijri.year} AH` : 'Islamic Calendar';

  return { timings, dateReadable, hijriDate };
}

export function getNextPrayer(timings: Record<string, string>): { nextPrayerName: string; nextPrayerTime: string; secondsRemaining: number } {
  const now = new Date();
  const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  for (const name of prayerOrder) {
    const timeStr = timings[name];
    if (!timeStr) continue;

    const [h, m] = timeStr.split(':').map(Number);
    const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);

    if (prayerDate.getTime() > now.getTime()) {
      const diffSec = Math.floor((prayerDate.getTime() - now.getTime()) / 1000);
      return {
        nextPrayerName: name,
        nextPrayerTime: timeStr,
        secondsRemaining: diffSec
      };
    }
  }

  // If all prayers passed today, next is Fajr tomorrow
  const fajrStr = timings['Fajr'] || '05:00';
  const [fh, fm] = fajrStr.split(':').map(Number);
  const tomorrowFajr = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, fh, fm, 0);
  const diffSec = Math.floor((tomorrowFajr.getTime() - now.getTime()) / 1000);

  return {
    nextPrayerName: 'Fajr (Tomorrow)',
    nextPrayerTime: fajrStr,
    secondsRemaining: diffSec
  };
}

export function formatDuration(seconds: number): string {
  if (seconds < 0) return '00:00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
}
