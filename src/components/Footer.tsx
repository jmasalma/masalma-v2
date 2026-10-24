import React from 'react';
import { ArrowUp, Github, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/70 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-mono font-semibold">
                JM
              </span>
              <span>Masalma.com</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Personal developer portfolio & digital tools suite.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('android')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Android Apps
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Web Tools
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <a
              href="https://github.com/jmasalma/masalma"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quiet Copyright & Unboxed Version Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Masalma.com · Built and maintained by JM.
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>masalma.com</span>
            <span aria-hidden="true">·</span>
            <span>Static GitHub Pages</span>
            <span aria-hidden="true">·</span>
            <span>v2026.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
