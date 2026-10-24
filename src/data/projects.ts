export interface ProjectItem {
  id: string;
  title: string;
  category: 'islamic' | 'construction' | 'utilities';
  categoryLabel: string;
  type: string;
  description: string;
  highlights: string[];
  url: string;
  isExternal?: boolean;
  isDownload?: boolean;
  hasPreview?: boolean;
  previewUrl?: string;
  status: string;
  year: string;
  iconName: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'islamic', label: 'Islamic Suite' },
  { id: 'construction', label: 'Construction & Design' },
  { id: 'utilities', label: 'Utilities & Timers' },
] as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: 'prayer-suite',
    title: 'Prayer Times & Islamic Suite',
    category: 'islamic',
    categoryLabel: 'Islamic Suite',
    type: 'React / TypeScript Application',
    description: 'Precision prayer calculation engine featuring real-time daily prayer times, Qibla compass bearing, Quranic Verse of the Day, and the interactive 99 Names of Allah (Asmaul Husna).',
    highlights: [
      'Aladhan API with automatic GPS geolocation',
      'Interactive Qibla compass with Kaaba heading angle',
      'Asmaul Husna grid with meanings and reflection modals',
      'Daily curated Ayah with authentic translation'
    ],
    url: '/pray/index.html',
    previewUrl: '/pray/index.html',
    hasPreview: true,
    status: 'Active',
    year: '2026',
    iconName: 'Compass'
  },
  {
    id: 'ramadan-countdown',
    title: 'Ramadan Countdown & Adhan',
    category: 'islamic',
    categoryLabel: 'Islamic Suite',
    type: 'Interactive Countdown',
    description: 'Real-time countdown to Ramadan and prayer intervals with Adhan audio alerts, localized astronomical calculations, and dynamic dawn/dusk tracking.',
    highlights: [
      'Astronomical Adhan calculation engine',
      'Audio alert integration for prayer calls',
      'Timezone-aware dynamic dusk/dawn calculations',
      'Optimized for mobile & desktop screens'
    ],
    url: '/pray/index.html',
    previewUrl: '/pray/index.html',
    hasPreview: true,
    status: 'Active',
    year: '2026',
    iconName: 'Moon'
  },
  {
    id: 'islam-adhan-apk',
    title: 'Islam Adhan Alarm APK',
    category: 'islamic',
    categoryLabel: 'Islamic Suite',
    type: 'Android Native Application',
    description: 'Standalone Android package (.apk) for reliable, offline-ready Adhan prayer alarms and reminders directly on mobile devices without store telemetry.',
    highlights: [
      'Direct APK package download',
      'Zero invasive tracking or ads',
      'Background alarm scheduler for Android',
      'Reliable prayer audio notifications'
    ],
    url: '/Islam Adhan Alarm.apk',
    isDownload: true,
    hasPreview: false,
    status: 'Distribution',
    year: '2025',
    iconName: 'Smartphone'
  },
  {
    id: 'flooring-calculator',
    title: 'Flooring Stagger & Waste Engine',
    category: 'construction',
    categoryLabel: 'Construction & Design',
    type: 'Algorithmic Layout Calculator',
    description: 'Construction layout generator designed to compute optimal staggered room plank configurations, enforce minimum joint overlap rules, and minimize unusable off-cut ends.',
    highlights: [
      'Dynamic room dimension & plank dimension inputs',
      'Enforces minimum joint overlap constraints',
      'Calculates usable end cut re-usage for subsequent rows',
      'Live visual CSS stagger matrix rendering'
    ],
    url: '/Flooring/index.html',
    previewUrl: '/Flooring/index.html',
    hasPreview: true,
    status: 'Active',
    year: '2025',
    iconName: 'Layers'
  },
  {
    id: 'sun-tracker',
    title: 'Solar Azimuth & Sun Tracker',
    category: 'utilities',
    categoryLabel: 'Utilities & Timers',
    type: 'Astronomical Utility',
    description: 'Real-time celestial sun path calculation tool displaying solar elevation angle, azimuth direction, true solar noon, and exact sunrise/sunset intervals.',
    highlights: [
      'Accurate solar position trigonometry',
      'Real-time day/night angle transitions',
      'Clean interface for solar study & outdoor timing',
      'Lightweight vanilla JavaScript implementation'
    ],
    url: '/tools/suntracker.html',
    previewUrl: '/tools/suntracker.html',
    hasPreview: true,
    status: 'Active',
    year: '2025',
    iconName: 'Sun'
  },
  {
    id: 'precision-stopwatch',
    title: 'Precision Stopwatch & Lap Timer',
    category: 'utilities',
    categoryLabel: 'Utilities & Timers',
    type: 'High-Precision Timer',
    description: 'Millisecond-accurate browser stopwatch with split-lap time logging, zero-drift timing loops, and keyboard shortcuts for rapid interval recording.',
    highlights: [
      'High-resolution performance.now() timing',
      'Split lap breakdown with differential analysis',
      'Zero external dependencies & instant load time',
      'Clean, distraction-free display'
    ],
    url: '/tools/stopwatch.html',
    previewUrl: '/tools/stopwatch.html',
    hasPreview: true,
    status: 'Active',
    year: '2024',
    iconName: 'Timer'
  },
  {
    id: 'countdown-tool',
    title: 'Precision Countdown Timer',
    category: 'utilities',
    categoryLabel: 'Utilities & Timers',
    type: 'Productivity Timer',
    description: 'Customizable target interval countdown timer with audio chime alerts, pause/resume state handling, and persistent session memory.',
    highlights: [
      'Quick presets for common productivity blocks',
      'Audible reminder when target duration elapses',
      'Large readable display for presentation mode',
      'Lightweight and battery friendly'
    ],
    url: '/tools/countdown.html',
    previewUrl: '/tools/countdown.html',
    hasPreview: true,
    status: 'Active',
    year: '2024',
    iconName: 'Hourglass'
  },
  {
    id: 'world-clock',
    title: 'Multi-Zone Precision Clock',
    category: 'utilities',
    categoryLabel: 'Utilities & Timers',
    type: 'Time Utility',
    description: 'Digital and analog multi-timezone clock system designed for monitoring global synchronization and precise UTC offsets.',
    highlights: [
      'Synchronized timezone offset calculations',
      'Dual analog/digital time representations',
      'Fast client-side rendering with zero latency'
    ],
    url: '/tools/clock/index.html',
    previewUrl: '/tools/clock/index.html',
    hasPreview: true,
    status: 'Active',
    year: '2024',
    iconName: 'Clock'
  }
];
