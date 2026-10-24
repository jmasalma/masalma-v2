import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SimpleHome } from './components/SimpleHome';
import { AndroidAppsPage } from './components/AndroidAppsPage';
import { ToolsCatalog } from './components/ToolsCatalog';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToolPreviewModal } from './components/ToolPreviewModal';
import { IslamicModal } from './components/IslamicModal';
import { ProjectItem } from './data/projects';

type ViewMode = 'home' | 'android' | 'tools' | 'about' | 'contact';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('masalma_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [activeView, setActiveView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'android' || hash === 'android-apps' || hash === 'testing') return 'android';
      if (hash === 'tools' || hash === 'apps') return 'tools';
      if (hash === 'about') return 'about';
      if (hash === 'contact') return 'contact';
    }
    return 'home';
  });

  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);
  const [islamicModalOpen, setIslamicModalOpen] = useState<boolean>(false);

  // Sync hash changes (e.g. back/forward navigation or direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'android' || hash === 'android-apps' || hash === 'testing') {
        setActiveView('android');
      } else if (hash === 'tools' || hash === 'apps') {
        setActiveView('tools');
      } else if (hash === 'about') {
        setActiveView('about');
      } else if (hash === 'contact') {
        setActiveView('contact');
      } else if (hash === 'islamic') {
        setIslamicModalOpen(true);
      } else {
        setActiveView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('masalma_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('masalma_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleNavigate = (view: ViewMode) => {
    setActiveView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {activeView === 'home' && (
          <SimpleHome
            onNavigateToAndroid={() => handleNavigate('android')}
            onNavigateToTools={() => handleNavigate('tools')}
            onOpenIslamicModal={() => setIslamicModalOpen(true)}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {activeView === 'android' && (
          <AndroidAppsPage onBackToHome={() => handleNavigate('home')} />
        )}

        {activeView === 'tools' && (
          <div className="py-6">
            <ToolsCatalog
              onOpenPreview={(project) => setPreviewProject(project)}
              onOpenIslamicModal={() => setIslamicModalOpen(true)}
            />
          </div>
        )}

        {activeView === 'about' && (
          <div className="py-6">
            <AboutSection />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="py-6">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Clean Quiet Footer */}
      <Footer onNavigate={(v) => handleNavigate(v as ViewMode)} />

      {/* Live Tool Preview Lightbox Modal */}
      <ToolPreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />

      {/* Islamic Suite Multi-Tab Interactive Modal */}
      <IslamicModal
        isOpen={islamicModalOpen}
        onClose={() => setIslamicModalOpen(false)}
      />
    </div>
  );
}
