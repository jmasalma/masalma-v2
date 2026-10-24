import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  BookOpen,
  Sparkles,
  RefreshCw,
  MapPin,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { ASMA_UL_HUSNA, AsmaulHusna } from '../data/asmaulHusna';
import {
  DEFAULT_CITIES,
  FALLBACK_TIMINGS,
  fetchLivePrayerTimes,
  getNextPrayer,
  formatDuration
} from '../utils/prayer';

interface IslamicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuranVerse {
  text: string;
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  translation: string;
}

export const IslamicModal: React.FC<IslamicModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'prayers' | 'qibla' | 'quran' | 'names'>('prayers');
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITIES[0]);
  const [timings, setTimings] = useState<Record<string, string>>(FALLBACK_TIMINGS);
  const [hijriDate, setHijriDate] = useState<string>('Islamic Calendar');
  const [nextPrayerInfo, setNextPrayerInfo] = useState({
    nextPrayerName: 'Asr',
    nextPrayerTime: '16:02',
    secondsRemaining: 3600
  });

  // Verse of the day state
  const [verse, setVerse] = useState<QuranVerse | null>({
    text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    surahName: 'Al-Fatihah (The Opening)',
    surahNumber: 1,
    ayahNumber: 1,
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
  });
  const [verseLoading, setVerseLoading] = useState(false);

  // Names filter & selected name modal
  const [nameSearch, setNameSearch] = useState('');
  const [selectedName, setSelectedName] = useState<AsmaulHusna | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedName) {
          setSelectedName(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedName, onClose]);

  // Load prayer timings
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetchLivePrayerTimes(selectedCity.lat, selectedCity.lon);
        if (isMounted) {
          setTimings(res.timings);
          setHijriDate(res.hijriDate);
        }
      } catch (err) {
        console.warn('Prayer fetch error:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedCity]);

  // Next prayer timer tick
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setNextPrayerInfo(getNextPrayer(timings));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timings]);

  // Fetch random verse
  const fetchRandomVerse = async () => {
    setVerseLoading(true);
    try {
      const ayahNum = Math.floor(Math.random() * 6236) + 1;
      const [arRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${ayahNum}`),
        fetch(`https://api.alquran.cloud/v1/ayah/${ayahNum}/en.asad`)
      ]);
      const arData = await arRes.json();
      const enData = await enRes.json();

      if (arData.code === 200 && enData.code === 200) {
        setVerse({
          text: arData.data.text,
          surahName: `${enData.data.surah.englishName} (${enData.data.surah.englishNameTranslation})`,
          surahNumber: enData.data.surah.number,
          ayahNumber: enData.data.numberInSurah,
          translation: enData.data.text
        });
      }
    } catch (err) {
      console.warn('Verse fetch failed', err);
    } finally {
      setVerseLoading(false);
    }
  };

  // Qibla calculation from selectedCity
  const calculateQibla = (lat: number, lon: number) => {
    const meccaLat = 21.4225 * (Math.PI / 180);
    const meccaLon = 39.8262 * (Math.PI / 180);
    const phi1 = lat * (Math.PI / 180);
    const lambda1 = lon * (Math.PI / 180);

    const deltaLambda = meccaLon - lambda1;
    const y = Math.sin(deltaLambda);
    const x = Math.cos(phi1) * Math.tan(meccaLat) - Math.sin(phi1) * Math.cos(deltaLambda);
    let qiblaBearing = Math.atan2(y, x) * (180 / Math.PI);
    qiblaBearing = (qiblaBearing + 360) % 360;
    return Math.round(qiblaBearing);
  };

  const qiblaAngle = calculateQibla(selectedCity.lat, selectedCity.lon);

  const filteredNames = ASMA_UL_HUSNA.filter(
    (n) =>
      n.transliteration.toLowerCase().includes(nameSearch.toLowerCase()) ||
      n.meaning.toLowerCase().includes(nameSearch.toLowerCase()) ||
      n.name.includes(nameSearch)
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="islamic-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="islamic-modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
              >
                Islamic Precision Suite
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{hijriDate}</span>
                <span aria-hidden="true">·</span>
                <span>Aladhan & AlQuran Cloud</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/pray/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Ramadan App</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close Islamic Suite"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls (Segmented Tabs with click handlers) */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-100/60 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('prayers')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'prayers'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Prayer Timings & Countdown
          </button>
          <button
            onClick={() => setActiveTab('qibla')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'qibla'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Qibla Compass
          </button>
          <button
            onClick={() => setActiveTab('quran')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'quran'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Verse of the Day
          </button>
          <button
            onClick={() => setActiveTab('names')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'names'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            99 Names of Allah
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PRAYER TIMINGS */}
          {activeTab === 'prayers' && (
            <div className="space-y-6">
              {/* City selector row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Calculation Coordinates:</span>
                  <span className="font-semibold">{selectedCity.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="modal-city-select" className="text-xs text-slate-500">
                    City Preset:
                  </label>
                  <select
                    id="modal-city-select"
                    value={selectedCity.name}
                    onChange={(e) => {
                      const c = DEFAULT_CITIES.find((item) => item.name === e.target.value);
                      if (c) setSelectedCity(c);
                    }}
                    className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer"
                  >
                    {DEFAULT_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Countdown Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
                    Next Prayer Interval
                  </div>
                  <div className="text-2xl font-extrabold mt-1">
                    {nextPrayerInfo.nextPrayerName} · {nextPrayerInfo.nextPrayerTime}
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-xs text-blue-100">Countdown Remaining</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums mt-1">
                    {formatDuration(nextPrayerInfo.secondsRemaining)}
                  </div>
                </div>
              </div>

              {/* Prayer Times Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Fajr', label: 'Dawn', time: timings.Fajr },
                  { name: 'Sunrise', label: 'Sunrise', time: timings.Sunrise },
                  { name: 'Dhuhr', label: 'Noon', time: timings.Dhuhr },
                  { name: 'Asr', label: 'Afternoon', time: timings.Asr },
                  { name: 'Maghrib', label: 'Sunset', time: timings.Maghrib },
                  { name: 'Isha', label: 'Night', time: timings.Isha }
                ].map((p) => {
                  const isCurrent = nextPrayerInfo.nextPrayerName === p.name;
                  return (
                    <div
                      key={p.name}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-xs'
                          : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {p.label}
                      </div>
                      <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {p.name}
                      </div>
                      <div className="text-lg font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400 mt-2">
                        {p.time || '--:--'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: QIBLA COMPASS */}
          {activeTab === 'qibla' && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="max-w-md w-full mb-6 text-center">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  Kaaba Direction Calculator
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Qibla Heading: <span className="text-blue-600 dark:text-blue-400 font-mono">{qiblaAngle}°</span> from True North
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Calculated from {selectedCity.name} ({selectedCity.lat.toFixed(2)}° N, {selectedCity.lon.toFixed(2)}° E) toward the Holy Kaaba in Mecca.
                </p>
              </div>

              {/* Compass Graphic */}
              <div className="relative w-64 h-64 rounded-full border-4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center shadow-inner my-4">
                {/* Cardinal markers */}
                <span className="absolute top-2 font-bold text-xs font-mono text-rose-500">N</span>
                <span className="absolute bottom-2 font-bold text-xs font-mono text-slate-400">S</span>
                <span className="absolute right-2 font-bold text-xs font-mono text-slate-400">E</span>
                <span className="absolute left-2 font-bold text-xs font-mono text-slate-400">W</span>

                {/* Rotating Qibla needle */}
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                  style={{ transform: `rotate(${qiblaAngle}deg)` }}
                >
                  <div className="relative w-1 h-48 flex flex-col items-center justify-between pointer-events-none">
                    {/* Top needle head pointing to Kaaba */}
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[24px] border-b-blue-600" />
                    <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-white border-2 border-blue-600" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[18px] border-t-slate-400" />
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Face {qiblaAngle}° clockwise from North on your physical compass.
              </div>
            </div>
          )}

          {/* TAB 3: QURAN VERSE */}
          {activeTab === 'quran' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Quranic Ayah & Translation
                </div>
                <button
                  onClick={fetchRandomVerse}
                  disabled={verseLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${verseLoading ? 'animate-spin' : ''}`} />
                  <span>New Ayah</span>
                </button>
              </div>

              {verse ? (
                <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center space-y-6">
                  {/* Arabic Text */}
                  <div
                    className="text-2xl sm:text-3xl leading-[2.2] font-serif text-slate-900 dark:text-white font-medium"
                    dir="rtl"
                  >
                    {verse.text}
                  </div>

                  {/* English Translation */}
                  <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic leading-relaxed pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                    "{verse.translation}"
                  </div>

                  {/* Metadata unboxed text */}
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono pt-2">
                    <span>Surah {verse.surahName}</span>
                    <span aria-hidden="true">·</span>
                    <span>Ayah {verse.ayahNumber}</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 4: 99 NAMES OF ALLAH */}
          {activeTab === 'names' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Explore the 99 Beautiful Divine Names (Asmaul Husna). Click any name for full meaning.
                </div>
                <input
                  type="text"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                  placeholder="Filter by transliteration or meaning..."
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 w-full sm:w-64"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredNames.map((n, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedName(n)}
                    className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="text-xl font-serif text-slate-900 dark:text-white text-right mb-2">
                      {n.name}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {n.transliteration}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {n.meaning}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Name Detail Sub-Modal */}
        {selectedName && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setSelectedName(null)}
          >
            <div
              className="max-w-md w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl font-serif text-blue-600 dark:text-blue-400">
                {selectedName.name}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedName.transliteration}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                "{selectedName.meaning}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSelectedName(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
