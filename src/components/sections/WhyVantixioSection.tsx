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
                  className={`group relative rounded-xl p-5 transition-all duration-300 cursor-pointer border flex items-center justify-between ${
                    isActive
                      ? 'bg-[#0E1628] border-cyan-400 shadow-xl shadow-cyan-950/30 translate-x-1.5'
                      : 'bg-[#080D1A]/90 hover:bg-[#0C1222] border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Glowing Orange Marker Cube matching PDF 1 Page 9 */}
                    <div className={`w-3.5 h-3.5 rounded-sm transition-all ${
                      isActive ? 'bg-[#FF5722] shadow-[0_0_12px_#FF5722] scale-125' : 'bg-slate-700 group-hover:bg-[#FF5722]/50'
                    }`} />

                    <div>
                      <div className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors uppercase">
                        {principle.title}
                      </div>
                      <div className="text-sm sm:text-base font-display font-semibold text-white mt-0.5">
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
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#090F1E] border border-cyan-500/30 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-3 border-b border-slate-800">
                <span className="text-[#FF5722] font-semibold">PRINCIPLE 0{activePrinciple.number} // TELEMETRY</span>
                <span className="text-cyan-300">ACTIVE STANDARD</span>
              </div>

              <h4 className="text-2xl font-display font-bold text-white mb-2">
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
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architectural Guarantee</span>
              </div>
              <p className="text-xs font-mono text-slate-300">
                {activePrinciple.technicalImplication}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
