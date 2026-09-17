import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock, GitCommit, Layers, Orbit } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { PROCESS_STAGES } from '../../data/siteData';
import { ProcessStage } from '../../types';

export const ProcessSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<ProcessStage>(PROCESS_STAGES[0]);
  const [viewMode, setViewMode] = useState<'linear' | 'orbital'>('linear');

  return (
    <section id="process" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="04"
          category="PROCESS"
          title="From “I wish our software did this...”"
          titleAccent="to “exactly.”"
          subtitle="A deliberate six-stage engineering process designed to eliminate guesswork and risk."
        />

        {/* Dual Layout: Left Architectural Tunnel + Right Process Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Architectural Tunnel & Portal Artwork (matching image.png) */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#0A0F1E] relative flex flex-col justify-between p-6 sm:p-8 min-h-[420px]">
            {/* Background SVG Artwork of the Arched Architectural Portal */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFA26B" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#FF5722" stopOpacity="0.5" />
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
                      strokeWidth="12"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent" />
            </div>

            {/* Top Text / Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#FF5722] uppercase bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                ARCHITECTURE PIPELINE
              </span>
              <span className="text-xs font-mono text-slate-400">
                ACTIVE: {activeStage.name}
              </span>
            </div>

            {/* Bottom Caption matching image.png */}
            <div className="relative z-10 pt-36">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                A clear process. <br />
                A powerful outcome.
              </h3>
              <p className="mt-2 text-xs text-slate-300 font-mono">
                Continuous two-week sprints with full visibility at every checkpoint.
              </p>
            </div>
          </div>

          {/* Right Column: 6 Stages Timeline / Journey */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Linear Stage Selector Buttons (matching image.png) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-[#090E1B] border border-slate-800/80">
              {PROCESS_STAGES.map((stage) => {
                const isActive = activeStage.id === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage)}
                    className={`py-3 px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-80">{stage.number}</span>
                    <span className="text-xs font-heading font-bold uppercase tracking-wider">{stage.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-[#0B1120] border border-slate-800 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-[#FF5722] font-semibold">STAGE {activeStage.number} // {activeStage.name}</span>
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeStage.duration}</span>
                  </span>
                </div>

                <h4 className="text-2xl font-display font-bold text-white mb-2">
                  {activeStage.tagline}
                </h4>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-4">
                  {activeStage.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase text-slate-400 mb-3">
                  Verified Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStage.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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
