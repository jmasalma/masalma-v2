import React, { useState } from 'react';
import { Layers, ArrowRight, ExternalLink, RefreshCw, Sliders } from 'lucide-react';

export const FlooringQuickDemo: React.FC<{ onLaunchFull: () => void }> = ({ onLaunchFull }) => {
  const [roomLength, setRoomLength] = useState<number>(144); // inches
  const [plankLength, setPlankLength] = useState<number>(48); // inches
  const [minOverlap, setMinOverlap] = useState<number>(8); // inches

  // Compute a sample 5-row stagger pattern
  const rows = [0, 1, 2, 3, 4].map((rowIndex) => {
    // Stagger offset calculation
    const offset = (rowIndex * (plankLength / 3)) % plankLength;
    const pieces: { widthPercent: number; lengthInches: number; isCut: boolean }[] = [];
    let remaining = roomLength;

    if (offset > 0) {
      const firstPiece = Math.min(offset, remaining);
      pieces.push({
        widthPercent: (firstPiece / roomLength) * 100,
        lengthInches: Math.round(firstPiece),
        isCut: firstPiece < plankLength
      });
      remaining -= firstPiece;
    }

    while (remaining > 0) {
      const piece = Math.min(plankLength, remaining);
      pieces.push({
        widthPercent: (piece / roomLength) * 100,
        lengthInches: Math.round(piece),
        isCut: piece < plankLength
      });
      remaining -= piece;
    }

    return pieces;
  });

  return (
    <div className="rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>Algorithmic Construction Engine</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Flooring Stagger & Waste Minimizer
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Generates random staggered plank layouts while respecting minimum joint overlap constraints and re-using end cuts to minimize expensive flooring waste.
          </p>
        </div>

        <a
          href="/Flooring/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors shadow-xs whitespace-nowrap self-start lg:self-auto cursor-pointer"
        >
          <span>Launch Full Generator</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Interactive Controls Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between mb-1.5">
            <span>Room Span (Inches)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{roomLength}" ({Math.round(roomLength / 12)} ft)</span>
          </label>
          <input
            type="range"
            min={96}
            max={360}
            step={12}
            value={roomLength}
            onChange={(e) => setRoomLength(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between mb-1.5">
            <span>Plank Length (Inches)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{plankLength}"</span>
          </label>
          <input
            type="range"
            min={24}
            max={72}
            step={6}
            value={plankLength}
            onChange={(e) => setPlankLength(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between mb-1.5">
            <span>Min Joint Overlap</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{minOverlap}"</span>
          </label>
          <input
            type="range"
            min={4}
            max={16}
            step={2}
            value={minOverlap}
            onChange={(e) => setMinOverlap(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Stagger Layout Canvas */}
      <div className="space-y-2 p-4 rounded-xl bg-slate-100/90 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
          <span>Stagger Simulation Preview (5 Sample Rows)</span>
          <span>Room Length: {roomLength}"</span>
        </div>

        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex h-8 w-full gap-1 overflow-hidden rounded">
            {row.map((piece, pIdx) => (
              <div
                key={pIdx}
                style={{ width: `${piece.widthPercent}%` }}
                className={`h-full flex items-center justify-center text-[10px] font-mono font-semibold transition-all border ${
                  piece.isCut
                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
                title={`Length: ${piece.lengthInches}" ${piece.isCut ? '(Cut piece)' : '(Full plank)'}`}
              >
                <span className="truncate px-1">{piece.lengthInches}"</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 inline-block" />
            <span>Full plank</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 inline-block" />
            <span>Cut off / stagger start</span>
          </div>
        </div>

        <button
          onClick={onLaunchFull}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Open Full Interactive Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
