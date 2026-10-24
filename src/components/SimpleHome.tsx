import React from 'react';
import {
  Smartphone,
  Compass,
  Layers,
  Wrench,
  ArrowRight,
  ExternalLink,
  Mail,
  ShieldCheck,
  Users
} from 'lucide-react';

interface SimpleHomeProps {
  onNavigateToAndroid: () => void;
  onNavigateToTools: () => void;
  onOpenIslamicModal: () => void;
  onNavigateToContact: () => void;
}

export const SimpleHome: React.FC<SimpleHomeProps> = ({
  onNavigateToAndroid,
  onNavigateToTools,
  onOpenIslamicModal,
  onNavigateToContact
}) => {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Simple & Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            <span>masalma.com</span>
            <span aria-hidden="true">·</span>
            <span>By JM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Simple, Focused Digital Tools
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Welcome to my personal website. A collection of lightweight, privacy-first web utilities, Islamic computing tools, and Android applications.
          </p>
        </div>

        {/* 4 Clean Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {/* Card 1: Android Apps & Testing (Prominently featured as requested) */}
          <div className="group rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-200/80 dark:border-emerald-900/50 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  Closed Testing
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Android Applications
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                <strong>Athan Alarm</strong> is currently in closed test mode on Google Play. Join our testers Google Group to get testing access or download the direct APK.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={onNavigateToAndroid}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 cursor-pointer"
              >
                <span>Tester Instructions & Links</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Islamic Suite */}
          <div className="group rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Web Suite
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Islamic Prayer Suite
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Accurate prayer calculation times, Qibla compass bearing, Ramadan countdown timer with Adhan audio, and the 99 Names of Allah.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={onOpenIslamicModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 cursor-pointer"
              >
                <span>Open Prayer Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/pray/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
              >
                <span>Ramadan App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3: Construction & Flooring */}
          <div className="group rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Calculator
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Flooring Stagger Calculator
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Algorithmic layout generator to compute staggered room plank placements, enforce minimum joint overlaps, and minimize unusable off-cut ends.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <a
                href="/Flooring/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500"
              >
                <span>Launch Flooring Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Web Tools & Timers */}
          <div className="group rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Utilities
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Web Utilities & Clocks
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Solar azimuth & sun position tracker, precision stopwatch with split laps, interval countdowns, and world clock.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={onNavigateToTools}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 cursor-pointer"
              >
                <span>Browse All Utilities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/tools/suntracker.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
              >
                <span>Sun Tracker</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Minimalist Footnote */}
        <div className="p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Fast static deployment · Zero tracking cookies · Built with care by JM</span>
          </div>

          <button
            onClick={onNavigateToContact}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline self-start sm:self-auto cursor-pointer"
          >
            Email: developer@masalma.com
          </button>
        </div>
      </div>
    </div>
  );
};
