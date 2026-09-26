import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

interface SelectedWorkSectionProps {
  activeProject: 'ashtonava' | 'yesdhobi';
  onSelectProject: (project: 'ashtonava' | 'yesdhobi') => void;
  onOpenContact: (projectName: string) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  activeProject,
  onSelectProject,
  onOpenContact,
}) => {
  return (
    <section id="work" className="relative min-h-[90vh] flex flex-col justify-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Header & Project Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-800/60 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#FF5722] mb-3">
              <span className="w-1.5 h-1.5 bg-[#FF5722]" />
              <span>04 // PHYSICAL ARCHITECTURAL REASSEMBLY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              One Architecture. <br />
              <span className="font-display font-bold text-[#FF5722]">Completely Different Products.</span>
            </h2>
          </div>

          {/* Minimal Project Switcher */}
          <div className="flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-800 font-mono text-xs">
            <button
              onClick={() => onSelectProject('ashtonava')}
              className={`px-5 py-2 rounded-full transition-all flex items-center space-x-2 ${
                activeProject === 'ashtonava'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ASHTONAVA</span>
            </button>
            <button
              onClick={() => onSelectProject('yesdhobi')}
              className={`px-5 py-2 rounded-full transition-all flex items-center space-x-2 ${
                activeProject === 'yesdhobi'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>YESDHOBI</span>
            </button>
          </div>
        </div>

        {/* Selected Project Display - Open Spatial Typography */}
        <AnimatePresence mode="wait">
          {activeProject === 'ashtonava' ? (
            <motion.div
              key="ashtonava"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Project Copy */}
              <div className="lg:col-span-7 space-y-6 relative z-10">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>E-COMMERCE PLATFORM // CLOTHING BRAND</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  ASHTONAVA
                </h3>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Bespoke digital commerce platform engineered for an exclusive clothing brand. Features a tactile digital flagship with custom real-time fabric rendering, invite-only salon reservations, and made-to-measure tailoring intake.
                </p>

                <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-slate-400">
                  <span>ARCHITECTURE: SCULPTURAL ATELIER</span>
                  <span>ZERO TEMPLATES</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenContact('Ashtonava E-Commerce Project')}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-semibold text-xs font-mono tracking-wider uppercase hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
                  >
                    <span>Start Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Spatial Indication of the Physical Component Reassembly */}
              <div className="lg:col-span-5 flex flex-col items-end justify-center pointer-events-none">
                <div className="text-right space-y-2 max-w-xs font-mono text-xs">
                  <div className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold">
                    PHYSICAL REASSEMBLY // ASHTONAVA
                  </div>
                  <div className="text-sm font-display font-light text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Notice how the same architectural modules unlock, re-orient, and construct the flowing luxury sculptural drape.
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="yesdhobi"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Project Copy */}
              <div className="lg:col-span-7 space-y-6 relative z-10">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>LAUNDRY SERVICE PLATFORM // CRM SYSTEMS</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  YESDHOBI
                </h3>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Comprehensive laundry service platform and multi-hub CRM system. Coordinates rider logistics, facility processing queues, customer status tracking, and automated inventory routing without manual disconnects.
                </p>

                <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-slate-400">
                  <span>ARCHITECTURE: REAL-TIME OPERATIONAL MATRIX</span>
                  <span>UNIFIED DATAFLOW</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenContact('YesDhobi Platform & CRM Project')}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-semibold text-xs font-mono tracking-wider uppercase hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Start Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Spatial Indication */}
              <div className="lg:col-span-5 flex flex-col items-end justify-center pointer-events-none">
                <div className="text-right space-y-2 max-w-xs font-mono text-xs">
                  <div className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold">
                    PHYSICAL REASSEMBLY // YESDHOBI
                  </div>
                  <div className="text-sm font-display font-light text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    The components unlock once more, forming a high-throughput operational network with live synchronized conduit paths.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
