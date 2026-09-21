import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Layers, Smartphone, Database, Cpu, Network, Zap, CheckCircle, Code, X, Check } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { CAPABILITIES, TECH_ZONES } from '../../data/siteData';
import { CapabilityItem } from '../../types';

interface CapabilitiesSectionProps {
  onOpenContact: (prefillCategory?: string) => void;
  onHoverCapability?: (id: string | null) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ 
  onOpenContact,
  onHoverCapability 
}) => {
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem>(CAPABILITIES[0]);
  const [activeModalCapability, setActiveModalCapability] = useState<CapabilityItem | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'web':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-colors">
            <div className="w-5 h-5 border-2 border-cyan-400 rotate-12 transform group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none" />
          </div>
        );
      case 'mobile':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-[#FF5722] transition-colors">
            <div className="w-3.5 h-6 border-2 border-[#FF5722] rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-1 h-1 rounded-full bg-[#FF5722]" />
            </div>
          </div>
        );
      case 'business':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-blue-400 transition-colors">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-blue-400 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        );
      case 'ai':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-purple-400 transition-colors">
            <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-90 transition-transform duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-400 transition-colors">
            <div className="w-5 h-5 border-2 border-emerald-400 rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-sm" />
            </div>
          </div>
        );
      case 'automation':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400 transition-colors">
            <div className="w-5 h-5 rounded-full border-2 border-dashed border-amber-400 group-hover:rotate-180 transition-transform duration-700" />
          </div>
        );
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="capabilities" className="relative py-20 md:py-28 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Action Button */}
        <SectionHeader
          number="03"
          category="WHAT VANTIXIO BUILDS"
          title="If Software Can Solve It,"
          titleAccent="Vantixio Can Build It."
          subtitle="Custom digital products engineered across web, mobile, AI, and core business infrastructure."
          align="between"
          actionButton={
            <button
              onClick={() => onOpenContact('Capabilities')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-medium hover:text-white transition-colors"
            >
              <span>Explore Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5722]" />
            </button>
          }
        />

        {/* Compact Spatial System: Six Connected Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap) => {
            const isSelected = selectedCapability.id === cap.id;
            return (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(cap)}
                onMouseEnter={() => onHoverCapability?.(cap.id)}
                onMouseLeave={() => onHoverCapability?.(null)}
                data-cursor="pointer"
                className={`group relative p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border atmospheric-clear-soft rounded-2xl ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-950/30'
                    : 'border-slate-800/60 hover:border-slate-700'
                }`}
              >
                {/* Top: Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {getIcon(cap.iconType)}
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      {cap.number} // {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-[40px]">
                    {cap.summary}
                  </p>
                </div>

                {/* Bottom: Learn More Trigger */}
                <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalCapability(cap);
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-[#FF5722] hover:text-orange-400 transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] font-mono text-slate-500">
                    {isSelected ? '● CONNECTED' : '○ HOVER'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated Technology Philosophy Bar */}
        <div className="mt-10 p-6 rounded-2xl border border-slate-800/70 atmospheric-clear-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              TECHNOLOGY PHILOSOPHY // PRACTICAL BUSINESS OUTCOMES
            </div>
            <div className="text-sm sm:text-base font-display font-semibold text-white">
              “Use technology to make the business better — not merely more complicated.”
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Deterministic architectures: Next.js, React, Node.js, Distributed SQL, Redis, and AI copilot integrations built for high reliability.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300">
            {['Distributed SQL', 'Real-Time WebSockets', 'Vector Pipelines', 'Zero Bloat'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30">
                {tag}
              </span>
            ))}
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
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                {activeModalCapability.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {activeModalCapability.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Engineered Capabilities
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalCapability.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  <span className="text-slate-500">Stack:</span> {activeModalCapability.techStack.join(' • ')}
                </div>
                <button
                  onClick={() => {
                    const capTitle = activeModalCapability.title;
                    setActiveModalCapability(null);
                    onOpenContact(capTitle);
                  }}
                  className="px-5 py-2 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-orange-600/30"
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
