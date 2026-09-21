import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock, GitCommit, Layers, Orbit, Cpu, Compass } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { PROCESS_STAGES } from '../../data/siteData';
import { ProcessStage } from '../../types';
import { ProcessStageVisual } from '../ui/ProcessStageVisual';

export const ProcessSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<ProcessStage>(PROCESS_STAGES[0]);
  const [visualMode, setVisualMode] = useState<'schematic' | 'portal'>('schematic');

  return (
    <section id="process" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="04"
          category="PROCESS"
          title="A Deliberate Process"
          titleAccent="Designed to Remove Guesswork."
          subtitle="From “I wish our software did this...” to “exactly.”"
        />

        {/* Dual Layout: Left Architectural Stage Schematic + Right Process Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Architectural Stage Visual & Portal Bay */}
          <div className="lg:col-span-5 border border-slate-800/60 bg-slate-950/20 relative flex flex-col justify-between p-6 sm:p-8 min-h-[440px]">
            
            {/* Background SVG Artwork or Interactive Schematic */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {visualMode === 'portal' ? (
                <svg className="w-full h-full object-cover opacity-60" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFA26B" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#FF5722" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#080D1A" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Dark Concrete Archway Rings */}
                  {[...Array(9)].map((_, i) => {
                    const scale = 1 - i * 0.08;
                    const rx = 240 * scale;
                    const ry = 300 * scale;
                    return (
                      <ellipse
                        key={i}
                        cx="250"
                        cy="300"
                        rx={rx}
                        ry={ry}
                        fill="none"
                        stroke={i % 2 === 0 ? '#1E293B' : '#0F172A'}
                        strokeWidth="10"
                      />
                    );
                  })}

                  {/* Central Warm Glowing Horizon Portal */}
                  <ellipse cx="250" cy="300" rx="90" ry="120" fill="url(#portalGlow)" />

                  {/* Figure Standing in Center of Portal */}
                  <g transform="translate(250, 315)">
                    <circle cx="0" cy="-22" r="4.5" fill="#0A0E1A" />
                    <path d="M-3.5,-17 L3.5,-17 L4.5,4 L-4.5,4 Z" fill="#0A0E1A" />
                    <line x1="-2" y1="4" x2="-3" y2="24" stroke="#0A0E1A" strokeWidth="3" />
                    <line x1="2" y1="4" x2="3" y2="24" stroke="#0A0E1A" strokeWidth="3" />
                  </g>
                </svg>
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full flex items-center justify-center relative z-0 pt-8 pb-16 opacity-75"
                    >
                      <ProcessStageVisual stage={activeStage} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Top Text / Controls */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-[#FF5722] uppercase">
                  PIPELINE {activeStage.number}
                </span>
                <span className="text-xs font-mono text-slate-300 font-bold">
                  {activeStage.name}
                </span>
              </div>

              {/* View Switcher: Schematic vs Portal */}
              <div className="flex items-center space-x-1 p-1 border border-slate-800 text-[10px] font-mono">
                <button
                  onClick={() => setVisualMode('schematic')}
                  className={`px-2 py-0.5 transition-colors flex items-center space-x-1 ${
                    visualMode === 'schematic'
                      ? 'bg-[#FF5722] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="View stage architectural schematic"
                >
                  <Cpu className="w-3 h-3" />
                  <span>SCHEMATIC</span>
                </button>
                <button
                  onClick={() => setVisualMode('portal')}
                  className={`px-2 py-0.5 transition-colors flex items-center space-x-1 ${
                    visualMode === 'portal'
                      ? 'bg-[#FF5722] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="View architectural portal artwork"
                >
                  <Compass className="w-3 h-3" />
                  <span>PORTAL</span>
                </button>
              </div>
            </div>

            {/* Bottom Stage Callout Banner */}
            <div className="relative z-10 pt-36">
              <div className="inline-block mb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                ARCHITECTURE PIPELINE // DELIBERATE EXECUTION
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {activeStage.tagline}
              </h3>
              <p className="mt-2 text-xs text-slate-300 font-mono drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Stage {activeStage.number} delivers fully verifiable milestones with zero black-box ambiguity.
              </p>
            </div>
          </div>

          {/* Right Column: 6 Stages Timeline / Journey */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Linear Stage Selector Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 border border-slate-800/80">
              {PROCESS_STAGES.map((stage) => {
                const isActive = activeStage.id === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage)}
                    className={`py-2.5 px-1 text-center transition-all flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-[#FF5722] text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-80">{stage.number}</span>
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider">{stage.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Card */}
            <div className="p-6 sm:p-8 border border-slate-800/60 bg-slate-950/20 relative flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-[#FF5722] font-semibold tracking-wide">STAGE {activeStage.number} // {activeStage.name}</span>
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{activeStage.duration}</span>
                  </span>
                </div>

                <h4 className="text-2xl font-display font-bold text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {activeStage.tagline}
                </h4>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
                  {activeStage.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <div className="text-xs font-mono uppercase text-slate-400 mb-2.5 flex items-center justify-between">
                  <span>Verified Stage Deliverables:</span>
                  <span className="text-[10px] text-emerald-400 font-semibold font-mono">100% SPEC DEFINED</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeStage.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
