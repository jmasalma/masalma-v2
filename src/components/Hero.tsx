import React, { useState, useEffect } from 'react';
import { Compass, ArrowRight, Clock, MapPin, Sparkles, Navigation, Layers, ShieldCheck } from 'lucide-react';
import {
  DEFAULT_CITIES,
  FALLBACK_TIMINGS,
  fetchLivePrayerTimes,
  getNextPrayer,
  formatDuration
} from '../utils/prayer';

interface HeroProps {
  onExploreTools: () => void;
  onOpenIslamicSuite: () => void;
  onOpenFlooring: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreTools,
  onOpenIslamicSuite,
  onOpenFlooring
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDateStr, setCurrentDateStr] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITIES[0]);
  const [timings, setTimings] = useState<Record<string, string>>(FALLBACK_TIMINGS);
  const [hijriDate, setHijriDate] = useState<string>('Islamic Calendar');
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{
    nextPrayerName: string;
    nextPrayerTime: string;
    secondsRemaining: number;
  }>({
    nextPrayerName: 'Asr',
    nextPrayerTime: '16:02',
    secondsRemaining: 3600
  });
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoCityName, setGeoCityName] = useState<string | null>(null);

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setCurrentDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch prayer timings when selected city changes
  useEffect(() => {
    let isMounted = true;
    async function loadTimings() {
      try {
        const data = await fetchLivePrayerTimes(selectedCity.lat, selectedCity.lon);
        if (isMounted) {
          setTimings(data.timings);
          setHijriDate(data.hijriDate);
        }
      } catch (e) {
        console.warn('Could not fetch live prayer timings; using local fallback.', e);
      }
    }

    loadTimings();
    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Recalculate next prayer countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const next = getNextPrayer(timings);
      setNextPrayerInfo(next);
    }, 1000);

    return () => clearInterval(timer);
  }, [timings]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        const userLoc = {
          name: 'Your Location',
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        };
        setGeoCityName('Current Location');
        setSelectedCity(userLoc);
      },
      (err) => {
        setGeoLoading(false);
        console.warn('Geolocation error:', err.message);
      },
      { timeout: 10000 }
    );
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background ambient subtle gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Brand & Vision */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Unboxed natural editorial kicker with dot separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-4">
              <span>Developer & Digital Studio</span>
              <span aria-hidden="true">·</span>
              <span>By JM</span>
              <span aria-hidden="true">·</span>
              <span>masalma.com</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5 [text-wrap:balance]">
              Modern Digital Tools & Islamic Applications
            </h1>

            {/* Body lead copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              A curated suite of high-precision web utilities, astronomical prayer calculation
              systems, and construction layout generators—crafted for speed, accuracy, and zero bloat.
            </p>

            {/* Action buttons with strict single-line text and hover states */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onExploreTools}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenIslamicSuite}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Islamic Suite</span>
              </button>

              <button
                onClick={onOpenFlooring}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Layers className="w-4 h-4" />
                <span>Flooring Engine</span>
              </button>
            </div>

            {/* Subtle verification trust marker as unboxed text */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Client-Side & Private</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>Zero Tracking Ads</span>
              <span aria-hidden="true">·</span>
              <span>Fast Static GitHub Pages</span>
            </div>
          </div>

          {/* Right Column: Live Real-Time Glance Widget (Spatial Anchor) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Header of widget */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Live System Glance
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {currentDateStr || 'Today'}
                </div>
              </div>

              {/* Local Clock Display */}
              <div className="mb-5">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Local Time</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight text-slate-900 dark:text-white">
                  {currentTime || '12:00:00 PM'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <span>{hijriDate}</span>
                </div>
              </div>

              {/* Next Prayer Live Countdown Strip */}
              <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 mb-5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Upcoming Prayer</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                    {nextPrayerInfo.nextPrayerTime}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {nextPrayerInfo.nextPrayerName}
                  </div>
                  <div className="text-sm font-semibold font-mono tabular-nums text-blue-600 dark:text-blue-400">
                    in {formatDuration(nextPrayerInfo.secondsRemaining)}
                  </div>
                </div>
              </div>

              {/* Prayer Times Row mini-grid */}
              <div className="grid grid-cols-5 gap-1.5 text-center mb-5">
                {[
                  { name: 'Fajr', time: timings.Fajr },
                  { name: 'Dhuhr', time: timings.Dhuhr },
                  { name: 'Asr', time: timings.Asr },
                  { name: 'Maghrib', time: timings.Maghrib },
                  { name: 'Isha', time: timings.Isha }
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`py-2 px-1 rounded-lg border transition-colors ${
                      nextPrayerInfo.nextPrayerName === item.name
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="text-[10px] font-medium uppercase tracking-wider">{item.name}</div>
                    <div className="text-xs font-semibold font-mono tabular-nums mt-0.5">{item.time || '--:--'}</div>
                  </div>
                ))}
              </div>

              {/* Location Selector Bar */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{geoCityName || selectedCity.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={geoCityName ? 'custom' : selectedCity.name}
                    onChange={(e) => {
                      setGeoCityName(null);
                      const city = DEFAULT_CITIES.find((c) => c.name === e.target.value);
                      if (city) setSelectedCity(city);
                    }}
                    aria-label="Select location for prayer timings"
                    className="text-xs bg-transparent border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer"
                  >
                    {DEFAULT_CITIES.map((c) => (
                      <option key={c.name} value={c.name} className="dark:bg-slate-900">
                        {c.name}
                      </option>
                    ))}
                    {geoCityName && <option value="custom">GPS Location</option>}
                  </select>

                  <button
                    onClick={handleUseLocation}
                    disabled={geoLoading}
                    title="Detect current location"
                    aria-label="Use current geolocation"
                    className="p-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${geoLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
