import React from 'react';
import { Sun, Moon, Github, Smartphone } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  activeView: 'home' | 'android' | 'tools' | 'about' | 'contact';
  onNavigate: (view: 'home' | 'android' | 'tools' | 'about' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  activeView,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md py-1 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-mono text-sm font-semibold shadow-xs group-hover:scale-105 transition-transform duration-200">
              JM
            </span>
            <span className="font-semibold tracking-tight">Masalma</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line typography) */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          aria-label="Main navigation"
        >
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
              activeView === 'home'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('android')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
              activeView === 'android'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
            <span>Android Apps</span>
          </button>
          <button
            onClick={() => onNavigate('tools')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
              activeView === 'tools'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Web Tools
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
              activeView === 'about'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
              activeView === 'contact'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Theme Toggle & GitHub Link */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a
            href="https://github.com/jmasalma/masalma"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source repository on GitHub"
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
