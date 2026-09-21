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
          titleAccent="Practical Business Outcomes."
          subtitle="Principle: Use technology to make the business better — not merely more complicated."
        />

        {/* The Grid: 4 Technology Zones on Left + Rock Monolith Artwork on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 4 Interactive Technology Floating Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH_ZONES.map((zone) => {
              const isActive = activeZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  className={`p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isActive
                      ? 'bg-cyan-950/20 border-cyan-400/70 shadow-lg shadow-cyan-950/30'
                      : 'border-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-1.5 rounded border border-slate-700/60">
                        {getIcon(zone.id)}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                        {zone.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {zone.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {zone.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800/40">
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

          {/* Right Column: Open Spatial Window into 3D Geometry */}
          <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 pointer-events-none">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="text-cyan-400 tracking-widest text-[10px] uppercase">// TECH EMBODIMENT</span>
              <span>60 FPS ACTIVE</span>
            </div>

            <div className="my-auto py-8">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                ENGINEERED FOR ENDURANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Technology <br />
                That Moves <br />
                Business Forward
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-3 max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Deterministic architectures without brittle dependencies. Realized in living 3D space.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/40 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>CLOUD TOPOLOGY: ENTERPRISE</span>
              <span className="text-cyan-400 font-bold">STATE VERIFIED</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
