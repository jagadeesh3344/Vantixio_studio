import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Layers, Smartphone, Database, Cpu, Network, Zap, CheckCircle, Code, X } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { CAPABILITIES } from '../../data/siteData';
import { CapabilityItem } from '../../types';

interface CapabilitiesSectionProps {
  onOpenContact: (prefillCategory?: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenContact }) => {
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem>(CAPABILITIES[0]);
  const [activeModalCapability, setActiveModalCapability] = useState<CapabilityItem | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'web':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-colors">
            {/* 3D Wireframe Cube icon */}
            <div className="w-6 h-6 border-2 border-cyan-400 rotate-12 transform group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none" />
          </div>
        );
      case 'mobile':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-[#FF5722] transition-colors">
            {/* Cylinder / Mobile geometry */}
            <div className="w-4 h-7 border-2 border-[#FF5722] rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-1 h-1 rounded-full bg-[#FF5722]" />
            </div>
          </div>
        );
      case 'business':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-blue-400 transition-colors">
            {/* Pyramid / Triangle node */}
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-blue-400 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        );
      case 'ai':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-purple-400 transition-colors">
            {/* 4 Connected Spheres / Neural cluster */}
            <div className="grid grid-cols-2 gap-1 group-hover:rotate-90 transition-transform duration-500">
              <div className="w-2 h-2 rounded-full bg-[#FF5722]" />
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-400 transition-colors">
            {/* Hexagonal Hub */}
            <div className="w-6 h-6 border-2 border-emerald-400 rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-2 h-2 bg-emerald-400 rounded-sm" />
            </div>
          </div>
        );
      case 'automation':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400 transition-colors">
            {/* Sliced Circle / Gear arc */}
            <div className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 group-hover:rotate-180 transition-transform duration-700" />
          </div>
        );
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="capabilities" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Action Button */}
        <SectionHeader
          number="02"
          category="CAPABILITIES"
          title="If Software Can Solve It, Vantixio Can Build It."
          subtitle="Custom digital products engineered across web, mobile, AI, and core business infrastructure."
          align="between"
          actionButton={
            <button
              onClick={() => onOpenContact('Capabilities')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-medium hover:text-white transition-colors"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5722]" />
            </button>
          }
        />

        {/* Six Interactive Cards Grid (matching image.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap) => {
            const isSelected = selectedCapability.id === cap.id;
            return (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(cap)}
                className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#0E1628] border-cyan-400/80 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                    : 'bg-[#0A0F1D]/80 hover:bg-[#0D1424] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Top: Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {getIcon(cap.iconType)}
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 font-semibold px-2 py-1 rounded bg-slate-900 border border-slate-800">
                      {cap.number} // {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[48px]">
                    {cap.summary}
                  </p>
                </div>

                {/* Bottom: Learn More Trigger */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalCapability(cap);
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-[#FF5722] hover:text-orange-400 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] font-mono text-slate-500">
                    {isSelected ? '● ACTIVE NODE' : '○ CLICK TO MAP'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Architecture Deep Dive for Selected Capability */}
        <div className="mt-12 rounded-2xl bg-[#080D1A] border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                SYSTEM ARCHITECTURE MAP // {selectedCapability.badge}
              </div>
              <h4 className="text-2xl font-display font-bold text-white">
                {selectedCapability.title} Engineering Blueprint
              </h4>
            </div>

            <button
              onClick={() => onOpenContact(`Capability: ${selectedCapability.title}`)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold hover:bg-orange-600 transition-all self-start lg:self-auto shadow-md shadow-orange-600/30"
            >
              <span>Build This Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Column 1: Core Description */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase mb-2">Architectural Intent</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedCapability.description}
              </p>
              <div className="mt-4 p-3 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono text-cyan-300">
                {selectedCapability.architectureDetails}
              </div>
            </div>

            {/* Column 2: Specific Features */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase mb-2">Engineered Modules</div>
              <ul className="space-y-2 text-sm text-slate-300">
                {selectedCapability.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Tech Stack Badges */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase mb-2">Production Stack</div>
              <div className="flex flex-wrap gap-2">
                {selectedCapability.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Deep-Dive */}
      <AnimatePresence>
        {activeModalCapability && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0C1322] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveModalCapability(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                MODULE SPECIFICATION // {activeModalCapability.number}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                {activeModalCapability.title}
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {activeModalCapability.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="text-xs font-mono uppercase text-slate-400">Included Deliverables:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalCapability.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveModalCapability(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-mono text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeModalCapability.title;
                    setActiveModalCapability(null);
                    onOpenContact(`Request custom ${title}`);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-600/30"
                >
                  Configure This Module
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
