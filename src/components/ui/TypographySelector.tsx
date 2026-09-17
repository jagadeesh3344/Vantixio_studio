import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ChevronDown, Type } from 'lucide-react';

export interface FontPreset {
  id: 'editorial' | 'haute-modern' | 'imperial' | 'avant-garde';
  name: string;
  tagline: string;
  displayFont: string;
  headingFont: string;
  bodyFont: string;
  sampleLetter: string;
  badge: string;
}

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'editorial',
    name: 'Atelier Editorial',
    tagline: 'Instrument Serif + Outfit + Jakarta',
    displayFont: "'Instrument Serif', Georgia, serif",
    headingFont: "'Outfit', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    sampleLetter: 'Aa',
    badge: 'LUXURY CLASSIC',
  },
  {
    id: 'haute-modern',
    name: 'Haute Modernist',
    tagline: 'Outfit + Plus Jakarta Sans',
    displayFont: "'Outfit', sans-serif",
    headingFont: "'Outfit', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    sampleLetter: 'Aa',
    badge: 'ARCHITECTURAL',
  },
  {
    id: 'imperial',
    name: 'Imperial Heritage',
    tagline: 'Cormorant Garamond + Space Grotesk',
    displayFont: "'Cormorant Garamond', Georgia, serif",
    headingFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    sampleLetter: 'Aa',
    badge: 'REGAL SERIF',
  },
  {
    id: 'avant-garde',
    name: 'Avant-Garde Studio',
    tagline: 'Syne + Space Grotesk',
    displayFont: "'Syne', sans-serif",
    headingFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    sampleLetter: 'Aa',
    badge: 'CONTEMPORARY',
  },
];

export const TypographySelector: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>('editorial');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedPreset = localStorage.getItem('vantixio-font-preset') || 'editorial';
    setActivePreset(savedPreset);
    document.documentElement.setAttribute('data-font-preset', savedPreset);
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setActivePreset(presetId);
    document.documentElement.setAttribute('data-font-preset', presetId);
    localStorage.setItem('vantixio-font-preset', presetId);
    setIsOpen(false);
  };

  const current = FONT_PRESETS.find((p) => p.id === activePreset) || FONT_PRESETS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 hover:bg-slate-800/90 text-xs text-slate-300 hover:text-white transition-all shadow-sm group"
        title="Change typography styling (Classy, Unique & Attractive fonts)"
        aria-label="Typography styling switcher"
      >
        <span className="w-5 h-5 rounded-full bg-[#FF5722]/15 border border-[#FF5722]/40 text-[#FF5722] flex items-center justify-center text-[10px] font-serif italic">
          Aa
        </span>
        <span className="text-[11px] font-medium tracking-wide hidden xl:inline">
          {current.name.split(' ')[0]}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Dropdown Selector */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-[#0B1020]/95 backdrop-blur-2xl border border-slate-700/80 shadow-2xl shadow-black/80 z-50 p-3 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 px-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
                  <Type className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span className="tracking-wider uppercase text-[10px]">TYPOGRAPHY ARCHITECTURE</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">4 SUITES</span>
              </div>

              {/* Preset Cards */}
              <div className="space-y-1.5">
                {FONT_PRESETS.map((preset) => {
                  const isSelected = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-800/90 border-cyan-400/80 shadow-md ring-1 ring-cyan-400/30'
                          : 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-9 h-9 rounded-lg bg-black/60 border border-slate-700 flex items-center justify-center text-lg text-slate-100 flex-shrink-0"
                          style={{ fontFamily: preset.displayFont }}
                        >
                          <span className={preset.id === 'editorial' ? 'italic' : ''}>Aa</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span
                              className="text-sm font-semibold text-white tracking-tight"
                              style={{ fontFamily: preset.displayFont }}
                            >
                              {preset.name}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate max-w-[170px]">
                            {preset.tagline}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 px-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Classy, Unique & Attractive</span>
                <span className="text-[#FF5722] flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Instant Live Switch</span>
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
