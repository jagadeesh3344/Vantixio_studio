import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { VANTIXIO_PILLARS, PROCESS_STAGES } from '../../data/siteData';
import { PillarItem, ProcessStage } from '../../types';
import { Check, ArrowRight } from 'lucide-react';

export const VantixioStandardSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<PillarItem>(VANTIXIO_PILLARS[0]);
  const [activeStage, setActiveStage] = useState<ProcessStage>(PROCESS_STAGES[0]);

  return (
    <section id="architecture" className="relative py-20 md:py-28 border-t border-slate-800/80">
      <div id="standard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="04"
          category="THE VANTIXIO ARCHITECTURE"
          title="Customization Isn’t a Feature."
          titleAccent="It Is the Foundation."
          subtitle="Five architectural pillars assembling into one unified structural foundation, executed through a deliberate engineering process."
        />

        {/* The 5 Pillar Column Cards (Floating architectural columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {VANTIXIO_PILLARS.map((pillar) => {
            const isActive = activePillar.id === pillar.id;
            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(pillar)}
                onClick={() => setActivePillar(pillar)}
                className={`relative p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border atmospheric-clear-soft rounded-2xl ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-950/30 -translate-y-1'
                    : 'border-slate-800/60 hover:border-slate-700'
                }`}
              >
                {/* Pillar Header & Code */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span>{pillar.number}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold ${isActive ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40' : 'text-slate-500'}`}>
                      {pillar.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {pillar.title}
                  </h3>

                  <div className="text-xs font-mono text-[#FF5722] mb-2 font-medium">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Technical Spec */}
                <div className="mt-5 pt-3 border-t border-slate-800/40 text-[11px] font-mono">
                  <span className={isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400'}>
                    {pillar.techHighlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated 6-Stage Deliberate Engineering Process */}
        <div className="mt-12 pt-10 border-t border-slate-800/60 atmospheric-clear-soft rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF5722] font-semibold">
                EXECUTION PIPELINE // DELIBERATE PROCESS
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                Designed to Remove Guesswork.
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                From “I wish our software did this...” to “exactly.”
              </p>
            </div>

            <div className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-full bg-cyan-950/20">
              STAGE 0{activeStage.number} // {activeStage.name.toUpperCase()}
            </div>
          </div>

          {/* 6-Stage Horizontal Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROCESS_STAGES.map((stage) => {
              const isSelected = activeStage.id === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(stage)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-md shadow-cyan-950/40'
                      : 'border-slate-800/60 hover:border-slate-700 bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                    <span>0{stage.number}</span>
                    <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                      {isSelected ? '● ACTIVE' : '○'}
                    </span>
                  </div>
                  <div className="text-xs font-bold font-display text-white">
                    {stage.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {stage.tagline}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#090E1A]/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono text-cyan-300 font-semibold flex items-center space-x-2">
                <span>0{activeStage.number} — {activeStage.name}:</span>
                <span className="text-white">{activeStage.tagline}</span>
              </div>
              <div className="text-xs text-slate-300 font-sans leading-relaxed">
                {activeStage.description}
              </div>
            </div>

            <div className="flex-shrink-0 text-xs font-mono text-amber-400/90 bg-amber-950/30 border border-amber-500/30 px-3 py-1.5 rounded-full">
              DELIVERABLES: {activeStage.deliverables.join(' • ')}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
