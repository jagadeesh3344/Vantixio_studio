import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WhatWeBuildSectionProps {
  onOpenContact: (capTitle?: string) => void;
  onHoverCapability?: (id: string | null) => void;
}

const CAPABILITY_ECOSYSTEM = [
  {
    id: 'web-apps',
    number: '01',
    name: 'CUSTOM WEB APPS',
    behavior: 'A connected interface-like architectural surface with modular responsive planes.',
  },
  {
    id: 'mobile-products',
    number: '02',
    name: 'MOBILE PRODUCTS',
    behavior: 'A compact responsive structure that folds and reorganizes its physical footprint.',
  },
  {
    id: 'business-systems',
    number: '03',
    name: 'BUSINESS SYSTEMS',
    behavior: 'Multiple operational structural blocks connecting into one synchronized network.',
  },
  {
    id: 'ai-products',
    number: '04',
    name: 'AI PRODUCTS',
    behavior: 'A dynamic structural matrix that predicts and routes intelligent connections.',
  },
  {
    id: 'integrations',
    number: '05',
    name: 'INTEGRATIONS',
    behavior: 'Separate architectural towers physically bridging and synchronizing data layers.',
  },
  {
    id: 'automation',
    number: '06',
    name: 'AUTOMATION',
    behavior: 'Repetitive components moving steadily through a continuous precision workflow.',
  },
];

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({
  onOpenContact,
  onHoverCapability,
}) => {
  const [activeCap, setActiveCap] = useState(CAPABILITY_ECOSYSTEM[0]);

  return (
    <section id="capabilities" className="relative min-h-[90vh] flex flex-col justify-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Header - Open Spatial Typography */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#FF5722] mb-3">
            <span className="w-1.5 h-1.5 bg-[#FF5722]" />
            <span>03 // ARCHITECTURAL ECOSYSTEM</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            If Software Can Solve It, <br />
            <span className="font-display font-bold text-cyan-400">Vantixio Can Build It.</span>
          </h2>

          <p className="mt-4 text-base text-slate-300 font-sans max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            One continuous architectural ecosystem where each capability is expressed as a living structural behavior.
          </p>
        </div>

        {/* The 6 Capabilities: Open Architectural Command List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CAPABILITY_ECOSYSTEM.map((cap) => {
            const isActive = activeCap.id === cap.id;
            return (
              <div
                key={cap.id}
                onMouseEnter={() => {
                  setActiveCap(cap);
                  onHoverCapability?.(cap.id);
                }}
                onMouseLeave={() => onHoverCapability?.(activeCap.id)}
                onClick={() => {
                  setActiveCap(cap);
                  onHoverCapability?.(cap.id);
                }}
                className={`group cursor-pointer p-4 sm:p-5 rounded-xl border transition-all duration-300 relative ${
                  isActive
                    ? 'border-cyan-400/80 bg-cyan-950/20 shadow-lg shadow-cyan-950/30'
                    : 'border-slate-800/60 hover:border-slate-700 bg-slate-900/30 backdrop-blur-[2px]'
                }`}
              >
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className={`tracking-widest ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                    {cap.number} // CAPABILITY
                  </span>
                  <span className={`w-1.5 h-1.5 transition-colors ${isActive ? 'bg-[#FF5722]' : 'bg-slate-700'}`} />
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  {cap.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans min-h-[40px]">
                  {cap.behavior}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {isActive ? '● ACTIVE STRUCTURAL FOCUS' : '○ HOVER TO FOCUS'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContact(cap.name);
                    }}
                    className="text-[#FF5722] hover:text-orange-400 font-semibold flex items-center space-x-1"
                  >
                    <span>Engineer</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Minimal Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-slate-800/60 font-mono text-xs text-slate-400 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Zero pre-built templates. 100% custom-coded architectural solutions.</span>
          </div>

          <button
            onClick={() => onOpenContact('Architectural Ecosystem')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-600/30"
          >
            <span>Start Architectural Build</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
