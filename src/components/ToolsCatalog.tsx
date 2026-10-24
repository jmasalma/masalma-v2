import React, { useState, useMemo } from 'react';
import {
  Compass,
  Moon,
  Smartphone,
  Layers,
  Sun,
  Timer,
  Hourglass,
  Clock,
  Calendar,
  Wrench,
  ExternalLink,
  Eye,
  Download,
  Search,
  CheckCircle2
} from 'lucide-react';
import { ProjectItem, CATEGORIES, PROJECTS } from '../data/projects';

interface ToolsCatalogProps {
  onOpenPreview: (project: ProjectItem) => void;
  onOpenIslamicModal: () => void;
}

export const ToolsCatalog: React.FC<ToolsCatalogProps> = ({
  onOpenPreview,
  onOpenIslamicModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-orange-500" />;
      case 'Timer':
        return <Timer className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Hourglass':
        return <Hourglass className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-rose-500" />;
      case 'Wrench':
      default:
        return <Wrench className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <section id="tools" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
              Application & Utility Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              The Masalma Digital Suite
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Every tool runs fast, without third-party tracker scripts or paywalls. Test them directly in the browser or open standalone.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools & utilities..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/60 rounded-xl overflow-x-auto mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[11px] opacity-60 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No tools matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
              >
                <div>
                  {/* Top Bar inside Card: Icon + Category unboxed metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 group-hover:scale-105 transition-transform duration-200">
                      {getIcon(project.iconName)}
                    </div>

                    {/* Unboxed text metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span>{project.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-6 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    {project.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
                  {project.id === 'prayer-suite' ? (
                    <button
                      onClick={onOpenIslamicModal}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Live Suite</span>
                    </button>
                  ) : project.hasPreview ? (
                    <button
                      onClick={() => onOpenPreview(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  ) : null}

                  {project.isDownload ? (
                    <div className="flex-1 flex items-center gap-2">
                      <a
                        href="#android"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 rounded-lg transition-colors text-center"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Beta Testers</span>
                      </a>
                      <a
                        href={project.url}
                        download
                        title="Direct APK Download"
                        className="flex items-center justify-center p-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors ${
                        project.hasPreview || project.id === 'prayer-suite' ? '' : 'flex-1 font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                      }`}
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
