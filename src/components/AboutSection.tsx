import React from 'react';
import { Terminal, Shield, Zap, Heart, CheckCircle2, Code2, Globe2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
            Engineering & Background
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Crafting Focused, High-Utility Digital Tools
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            I am JM, a software engineer with a passion for building lightweight, focused web applications and tools. 
            Masalma.com began as a collection of personal utility scripts and has evolved into an open, community-ready 
            portal of precision Islamic timing software, construction math generators, and productivity tools.
          </p>
        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Instant & Frictionless
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every tool executes immediately in your browser without paywalls, sign-up requirements, or heavyweight tracking scripts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Privacy by Design
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculations, coordinates, and timings are processed client-side. Your location is strictly used in-memory for prayer angles and solar calculations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Clean Modern Stack
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered with modern React, TypeScript, and Tailwind CSS, deployed statically on GitHub Pages with sub-second response times.
            </p>
          </div>
        </div>

        {/* Technical Registry Overview */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Technology & Standards
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Modern frontend architecture adhering to strict web performance metrics.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Globe2 className="w-4 h-4 text-blue-500" />
              <span>Hosted on GitHub Pages</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="space-y-1">
              <div className="font-semibold text-slate-900 dark:text-white">Core Framework</div>
              <div>React 19 & TypeScript</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-slate-900 dark:text-white">Styling Engine</div>
              <div>Tailwind CSS v4</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-slate-900 dark:text-white">APIs & Data</div>
              <div>Aladhan & AlQuran Cloud</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-slate-900 dark:text-white">Hosting & CDN</div>
              <div>GitHub Pages & Cloudflare</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
