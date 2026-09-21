import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Truck, Layers, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

interface ClientWorldsSectionProps {
  onOpenContact: (project: string) => void;
}

export const ClientWorldsSection: React.FC<ClientWorldsSectionProps> = ({ onOpenContact }) => {
  const [activeProject, setActiveProject] = useState<'ashtonava' | 'yesdhobi'>('ashtonava');

  // YesDhobi lifecycle loop
  const [activeLifecycle, setActiveLifecycle] = useState<number>(0);
  const stages = ['Customer Request', 'Dispatch', 'Pickup', 'Processing', 'Delivery'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLifecycle((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="work" className="relative py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Project Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#FF5722] uppercase font-semibold mb-2">
              <span>05</span>
              <span className="text-slate-600">//</span>
              <span>PROVEN IMPACT & WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white tracking-tight">
              Software Engineered for <span className="font-serif italic text-slate-100">Real World</span> <span className="text-[#FF5722]">Scale.</span>
            </h2>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setActiveProject('ashtonava')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                activeProject === 'ashtonava'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              01 ASHTONAVA // LUXURY
            </button>
            <button
              onClick={() => setActiveProject('yesdhobi')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                activeProject === 'yesdhobi'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              02 YESDHOBI // LOGISTICS
            </button>
          </div>
        </div>

        {/* Project Content Container */}
        <AnimatePresence mode="wait">
          {activeProject === 'ashtonava' ? (
            <motion.div
              key="ashtonava"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Project Overview */}
              <div className="lg:col-span-6 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-amber-500/20 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                    <span className="font-bold">CLIENT: ASHTONAVA</span>
                    <span className="text-slate-400">DOMAIN: LUXURY COMMERCE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-light text-white leading-snug">
                    The Tactile Digital <span className="font-serif italic text-amber-200">Flagship.</span>
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    High-ticket couture buyers demand tactile digital luxury. We built a bespoke digital flagship with real-time GPU fabric physics, invite-only VIP clienteling, and edge-rendered customization.
                  </p>

                  <div className="space-y-2 font-mono text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                    <div className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold mb-1">
                      WHAT VANTIXIO BUILT:
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span><strong className="text-white">GPU Cloth Drape Shader:</strong> Real-time WebGL fabric simulation rendering weave weight.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span><strong className="text-white">Private VIP Salon:</strong> Invite-only digital reservations with concierge video.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span><strong className="text-white">Bespoke Atelier:</strong> Precision tailoring measurement recorder with instant order relay.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenContact('Ashtonava Luxury Commerce')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-semibold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-md shadow-amber-500/20"
                  >
                    <span>Request Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono text-slate-400">STACK: NEXT.JS + WEBGL</span>
                </div>
              </div>

              {/* Right Column: Spatial Visual Focus */}
              <div className="lg:col-span-6 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-amber-300 font-semibold">// INTERACTIVE SHADER ACTIVE</span>
                  <span>60 FPS GPU PIPELINE</span>
                </div>

                <div className="my-auto py-8 text-center sm:text-left">
                  <div className="text-xs font-mono text-amber-400/80 uppercase tracking-widest mb-1">
                    BESPOKE DIGITAL PRODUCT
                  </div>
                  <div className="text-2xl font-display font-light text-amber-100">
                    Tactile luxury meets edge performance.
                  </div>
                  <p className="mt-2 text-xs font-mono text-slate-400">
                    Engineered without restrictive Shopify templates or standard checkout funnels.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>OUTCOME: 100% BESPOKE EXPERIENCE</span>
                  <span className="text-amber-300 font-semibold">CUSTOM DIGITAL FLAGSHIP</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="yesdhobi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Project Overview */}
              <div className="lg:col-span-6 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-emerald-500/20 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                    <span className="font-bold">CLIENT: YESDHOBI</span>
                    <span className="text-slate-400">DOMAIN: OPERATIONS & LOGISTICS</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
                    High-Velocity Logistics. <span className="text-emerald-400 font-normal font-serif italic">Zero Bottlenecks.</span>
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    Full-stack operating platform powering on-demand laundry logistics from doorstep pickup to industrial wash processing and automated dispatch in an uninterrupted loop.
                  </p>

                  <div className="space-y-2 font-mono text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                    <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold mb-1">
                      WHAT VANTIXIO BUILT:
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span><strong className="text-white">TSP Route Clustering:</strong> Dynamic routing grouping pickups by geographical density.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span><strong className="text-white">QR Barcode Traceability:</strong> Every garment tracked individually from handover to return.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span><strong className="text-white">Automated Lifecycle Engine:</strong> Self-triggering state changes with zero manual intervention.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenContact('YesDhobi Business Operations')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>Explore Ops Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono text-slate-400">STACK: REACT NATIVE + NODE.JS</span>
                </div>
              </div>

              {/* Right Column: Dynamic Lifecycle Stepper */}
              <div className="lg:col-span-6 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-emerald-400 font-semibold">// REAL-TIME DISPATCH ENGINE</span>
                  <span>UNINTERRUPTED CYCLE</span>
                </div>

                {/* Stepper display */}
                <div className="my-auto py-6">
                  <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                    OPERATIONAL PIPELINE CYCLE:
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {stages.map((st, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-center font-mono text-[10px] transition-all ${
                          activeLifecycle === idx
                            ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-950/40 scale-105'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                        <div className="text-white mt-0.5 truncate">{st}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>OUTCOME: ZERO MANUAL SPREADSHEETS</span>
                  <span className="text-emerald-400 font-semibold">100% AUTOMATED PLATFORM</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
