import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Layers, GitBranch, Shield, Zap, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { VANTIXIO_PILLARS } from '../../data/siteData';
import { PillarItem } from '../../types';

export const VantixioStandardSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<PillarItem>(VANTIXIO_PILLARS[0]);

  return (
    <section id="standard" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="03"
          category="THE VANTIXIO STANDARD"
          title="Customization Isn’t a Feature."
          titleAccent="It Is the Foundation."
          subtitle="Five non-negotiable architectural pillars engineered into every software product we deliver."
        />

        {/* The 5 Pillar Column Cards (matching PDF 2 Page 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {VANTIXIO_PILLARS.map((pillar) => {
            const isActive = activePillar.id === pillar.id;
            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(pillar)}
                onClick={() => setActivePillar(pillar)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? 'bg-[#0E1628] border-cyan-400 shadow-xl shadow-cyan-950/30 translate-y-[-4px]'
                    : 'bg-[#090E1A]/90 hover:bg-[#0C1222] border-slate-800/80'
                }`}
              >
                {/* Top Accent Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl transition-all ${
                    isActive ? 'bg-gradient-to-r from-cyan-400 to-[#FF5722]' : 'bg-slate-800'
                  }`}
                />

                {/* Pillar Header & Code */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                    <span>{pillar.number}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${isActive ? 'text-cyan-300 bg-cyan-950/60' : ''}`}>
                      {pillar.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {pillar.title}
                  </h3>

                  <div className="text-xs font-mono text-[#FF5722] mb-3">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Status */}
                <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono">
                  <span className={isActive ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>
                    {pillar.metrics}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Blueprint Circuit Interactive Visual Diagram (matching PDF 3 Page 5) */}
        <div className="mt-12 rounded-2xl bg-[#090F1E] border border-slate-800 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Circuit Visual Scheme */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[260px]">
              <svg className="w-full max-w-md h-64" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
                {/* Circuit Traces */}
                <g stroke="#1E293B" strokeWidth="2" fill="none">
                  <path d="M 200,130 L 70,60" />
                  <path d="M 200,130 L 330,60" />
                  <path d="M 200,130 L 200,220" />
                  <path d="M 200,130 L 70,200" />
                  <path d="M 200,130 L 330,200" />
                </g>

                {/* Active Trace to Current Pillar */}
                {activePillar.id === 'workflow' && (
                  <path d="M 200,130 L 70,60" stroke="#19D3E6" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" fill="none" />
                )}
                {activePillar.id === 'interface' && (
                  <path d="M 200,130 L 330,60" stroke="#19D3E6" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" fill="none" />
                )}
                {activePillar.id === 'logic' && (
                  <path d="M 200,130 L 200,220" stroke="#FF5722" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" fill="none" />
                )}
                {activePillar.id === 'brand' && (
                  <path d="M 200,130 L 70,200" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" fill="none" />
                )}
                {activePillar.id === 'scale' && (
                  <path d="M 200,130 L 330,200" stroke="#19D3E6" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" fill="none" />
                )}

                {/* Central Vantixio Node */}
                <polygon points="200,105 225,120 225,150 200,165 175,150 175,120" fill="#0C1322" stroke="#19D3E6" strokeWidth="2" />
                <circle cx="200" cy="135" r="8" fill="#FF5722" />
                <text x="200" y="140" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">V</text>

                {/* 5 Outer Branch Nodes */}
                <circle cx="70" cy="60" r="14" fill="#0E1626" stroke={activePillar.id === 'workflow' ? '#19D3E6' : '#334155'} strokeWidth="2" />
                <text x="70" y="64" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="monospace">01</text>

                <circle cx="330" cy="60" r="14" fill="#0E1626" stroke={activePillar.id === 'interface' ? '#19D3E6' : '#334155'} strokeWidth="2" />
                <text x="330" y="64" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="monospace">02</text>

                <circle cx="200" cy="220" r="14" fill="#0E1626" stroke={activePillar.id === 'logic' ? '#FF5722' : '#334155'} strokeWidth="2" />
                <text x="200" y="224" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="monospace">03</text>

                <circle cx="70" cy="200" r="14" fill="#0E1626" stroke={activePillar.id === 'brand' ? '#8B5CF6' : '#334155'} strokeWidth="2" />
                <text x="70" y="204" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="monospace">04</text>

                <circle cx="330" cy="200" r="14" fill="#0E1626" stroke={activePillar.id === 'scale' ? '#19D3E6' : '#334155'} strokeWidth="2" />
                <text x="330" y="204" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="monospace">05</text>
              </svg>
            </div>

            {/* Right: Detailed Pillar Telemetry & Architecture Specification */}
            <div className="lg:col-span-6">
              <div className="text-xs font-mono text-[#FF5722] uppercase tracking-wider mb-1">
                PILLAR DEEP-DIVE // {activePillar.code}
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-3">
                {activePillar.title} — {activePillar.subtitle}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {activePillar.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
                <div className="text-slate-500 uppercase text-[10px]">Technical Implementation:</div>
                <div>{activePillar.techHighlight}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
