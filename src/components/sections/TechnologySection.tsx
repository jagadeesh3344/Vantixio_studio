import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Cloud, Database, Network, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { TECH_ZONES } from '../../data/siteData';
import { TechZone } from '../../types';

export const TechnologySection: React.FC = () => {
  const [activeZone, setActiveZone] = useState<TechZone>(TECH_ZONES[0]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'ai': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'data': return <Database className="w-5 h-5 text-blue-400" />;
      case 'integrations': return <Network className="w-5 h-5 text-emerald-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="technology" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          category="TECHNOLOGY & PHILOSOPHY"
          title="Modern Technology."
          titleAccent="Real Business Outcomes."
          subtitle="Principle: Use technology to make the business better — not merely more complicated."
        />

        {/* The Grid: 4 Technology Zones on Left + Rock Monolith Artwork on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 4 Interactive Technology Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH_ZONES.map((zone) => {
              const isActive = activeZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isActive
                      ? 'bg-[#0E1628] border-cyan-400/80 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-400/40'
                      : 'bg-[#090E1A]/80 hover:bg-[#0C1222] border-slate-800/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                        {getIcon(zone.id)}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                        {zone.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-1.5">
                      {zone.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {zone.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800/60">
                    {zone.specs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[11px] font-mono text-cyan-300/90">
                        <Check className="w-3 h-3 text-cyan-400" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Architectural Monolith Artwork (matching image.png) */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#070A12] relative flex flex-col justify-end p-8 min-h-[380px]">
            {/* SVG Basalt Rock Monolith with Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="monolithShading" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E384D" />
                    <stop offset="40%" stopColor="#1B2335" />
                    <stop offset="100%" stopColor="#080C16" />
                  </linearGradient>
                  <linearGradient id="rockHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8A9BB8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#080C16" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Layered Angular Rock Strata */}
                <polygon points="120,0 380,0 420,600 80,600" fill="url(#monolithShading)" />
                <polygon points="120,0 240,0 220,600 80,600" fill="#121A2A" />
                <polygon points="240,0 380,0 420,600 220,600" fill="#1C263C" />

                {/* Chiseled Facets */}
                {[...Array(12)].map((_, i) => {
                  const y1 = 40 + i * 45;
                  const y2 = y1 + 35;
                  return (
                    <polygon
                      key={i}
                      points={`140,${y1} 230,${y1 + 10} 210,${y2} 130,${y2 - 5}`}
                      fill="#303E58"
                      stroke="#485B80"
                      strokeWidth="0.5"
                      opacity="0.8"
                    />
                  );
                })}

                {/* Rim Light along edge */}
                <line x1="240" y1="0" x2="220" y2="600" stroke="#FF5722" strokeWidth="1.5" opacity="0.4" />
                <line x1="380" y1="0" x2="420" y2="600" stroke="#19D3E6" strokeWidth="1" strokeDasharray="6 8" opacity="0.5" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/50 to-transparent" />
            </div>

            {/* Monolith Overlay Text matching image.png */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                ENGINEERED FOR ENDURANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 uppercase tracking-tight">
                Technology <br />
                That Moves <br />
                Business Forward
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-2">
                Deterministic architectures without brittle dependencies.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
