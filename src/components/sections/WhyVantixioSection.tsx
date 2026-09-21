import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckSquare, Sparkles, Terminal, Code2, ShieldCheck, Box } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { PRINCIPLES } from '../../data/siteData';
import { PrincipleItem } from '../../types';

export const WhyVantixioSection: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<PrincipleItem>(PRINCIPLES[0]);

  return (
    <section id="why-vantixio" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="08"
          category="WHY VANTIXIO"
          title="Software Should Feel Like It Was Made for You."
          titleAccent="That Feeling Is the Product."
          subtitle="Five core engineering principles that separate handcrafted bespoke software from disposable SaaS."
        />

        {/* The Vertical Interactive Principle Stack (matching image.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 5 Principles Vertical List */}
          <div className="lg:col-span-7 space-y-3">
            {PRINCIPLES.map((principle) => {
              const isActive = activePrinciple.id === principle.id;
              return (
                <div
                  key={principle.id}
                  onMouseEnter={() => setActivePrinciple(principle)}
                  onClick={() => setActivePrinciple(principle)}
                  className={`group relative p-4 transition-all duration-300 cursor-pointer border flex items-center justify-between ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/20 translate-x-1.5'
                      : 'border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Glowing Orange Marker Cube matching PDF 1 Page 9 */}
                    <div className={`w-3 h-3 rounded-sm transition-all ${
                      isActive ? 'bg-[#FF5722] shadow-[0_0_12px_#FF5722] scale-125' : 'bg-slate-700 group-hover:bg-[#FF5722]/50'
                    }`} />

                    <div>
                      <div className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors uppercase">
                        {principle.title}
                      </div>
                      <div className="text-sm sm:text-base font-display font-semibold text-white mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        {principle.tagline}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    0{principle.number}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Technical Blueprint Inspector for Active Principle */}
          <div className="lg:col-span-5 p-6 sm:p-8 border border-cyan-500/30 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-3 border-b border-slate-800/60">
                <span className="text-[#FF5722] font-semibold">PRINCIPLE 0{activePrinciple.number} // TELEMETRY</span>
                <span className="text-cyan-300">ACTIVE STANDARD</span>
              </div>

              <h4 className="text-2xl font-display font-bold text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {activePrinciple.title}
              </h4>
              <p className="text-sm font-mono text-cyan-400 mb-4">
                "{activePrinciple.tagline}"
              </p>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activePrinciple.description}
              </p>
            </div>

            {/* Technical Execution Box */}
            <div className="p-4 border-l-2 border-cyan-400 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architectural Guarantee</span>
              </div>
              <p className="text-xs font-mono text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {activePrinciple.technicalImplication}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
