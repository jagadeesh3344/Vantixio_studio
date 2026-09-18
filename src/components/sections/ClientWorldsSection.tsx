import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, ExternalLink, ShieldCheck, Clock, Layers, 
  ShoppingBag, Truck, Compass, Activity, CheckCircle2, ChevronRight,
  RefreshCw, Smartphone, Play, Pause, Zap
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

interface ClientWorldsSectionProps {
  onOpenContact: (project: string) => void;
}

export const ClientWorldsSection: React.FC<ClientWorldsSectionProps> = ({ onOpenContact }) => {
  // Ashtonava interactive state
  const [ashtonavaView, setAshtonavaView] = useState<'lookbook' | 'architecture' | 'vip'>('lookbook');

  // YesDhobi continuous operational lifecycle
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(0);
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(true);
  const [cycleCount, setCycleCount] = useState<number>(142);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Continuous YesDhobi lifecycle loop
  useEffect(() => {
    if (!isAutoCycle) return;

    const timer = setInterval(() => {
      setActiveWorkflowStage((prev) => {
        if (prev < 4) {
          setIsResetting(false);
          return prev + 1;
        } else {
          // Delivery reached -> Seamless System Reset & loop back to Customer
          setIsResetting(true);
          setCycleCount((c) => c + 1);
          setTimeout(() => setIsResetting(false), 500);
          return 0;
        }
      });
    }, 1900);

    return () => clearInterval(timer);
  }, [isAutoCycle]);

  return (
    <div className="relative border-t border-slate-800/80">
      
      {/* =========================================================================
          WORLD 03 — ASHTONAVA: LUXURY COMMERCE
      ========================================================================= */}
      <section id="ashtonava" className="relative py-24 md:py-36 overflow-hidden bg-transparent">
        {/* Editorial ambient warm champagne haze */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#B45309]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            number="03"
            category="LUXURY COMMERCE // CASE STUDY"
            title="Ashtonava Haute Couture"
            titleAccent="Bespoke Digital Flagship"
            subtitle="An editorial-grade commerce architecture crafted for high-ticket fashion houses."
            align="between"
            actionButton={
              <button
                onClick={() => onOpenContact('Ashtonava Luxury Commerce')}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-slate-950 font-semibold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Request Case Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          />

          {/* Ashtonava Editorial Bento Canvas */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Interactive Editorial Stage with Layered Parallax */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-amber-500/20 bg-[#0B0C14] relative p-6 sm:p-10 flex flex-col justify-between min-h-[480px]">
              
              {/* Top Editorial Ribbon */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>HEADLESS CLIENTELING // SUB-40MS EDGE</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-amber-500/30 text-[11px] font-mono">
                  <button
                    onClick={() => setAshtonavaView('lookbook')}
                    className={`px-2.5 py-0.5 rounded-full transition-colors ${
                      ashtonavaView === 'lookbook' ? 'bg-amber-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    LOOKBOOK
                  </button>
                  <button
                    onClick={() => setAshtonavaView('architecture')}
                    className={`px-2.5 py-0.5 rounded-full transition-colors ${
                      ashtonavaView === 'architecture' ? 'bg-amber-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    SPECS
                  </button>
                </div>
              </div>

              {/* Editorial Parallax Visual Frame */}
              <div className="my-8 relative h-64 sm:h-80 flex items-center justify-center overflow-hidden rounded-xl border border-amber-900/30 bg-[#07080E]">
                {/* Background warm grain layer */}
                <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-black/80" />

                {ashtonavaView === 'lookbook' ? (
                  <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
                    {/* Visual simulated luxury lookbook composition */}
                    <div className="relative w-full max-w-md h-full border border-amber-400/30 rounded-lg p-6 flex flex-col justify-between bg-[#0E0F1A]/80 backdrop-blur-md shadow-2xl">
                      <div className="flex justify-between text-[9px] font-mono text-amber-300 uppercase tracking-widest">
                        <span>COLLECTION N° 07</span>
                        <span>ATELIER PRIVATE ACCESS</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-serif italic text-amber-200">The Modern Silhouette</span>
                        <h4 className="text-3xl font-display font-light tracking-tight text-white uppercase">
                          Sculpted Silk Trench
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400">
                          Bespoke 3D Fabric Simulation • Real-Time Inventory Reservation
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-amber-500/20 text-xs font-mono">
                        <span className="text-amber-400 font-bold">EDITION 01 // BESPOKE ARCHIVE</span>
                        <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                          INSTANT PRIVATE CHECKOUT
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 w-full space-y-3 font-mono text-xs text-slate-300">
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
                      <span className="text-amber-400">FRONTEND ARCHITECTURE</span>
                      <span>Next.js 15 App Router + Headless WebGL</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
                      <span className="text-amber-400">COMMERCE BACKBONE</span>
                      <span>Custom Commercelayer + Stripe Private Relay</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
                      <span className="text-amber-400">PAGE SPEED INDEX</span>
                      <span className="text-emerald-400">99/100 Mobile Core Web Vitals</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
                      <span className="text-amber-400">VIP CLIENTELING</span>
                      <span>Private Concierge Video & Direct WhatsApp Sync</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Editorial Caption */}
              <div className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-amber-300 font-semibold">100% BESPOKE DESIGN TOKEN TOKENS</span>
                <span>GLOBAL EDGE CACHING // 28MS LATENCY</span>
              </div>
            </div>

            {/* Right: Architectural Impact Metrics & Story */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#090A13] border border-slate-800/80 space-y-4">
                <div className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                  THE CHALLENGE
                </div>
                <h3 className="text-2xl font-display font-bold text-white leading-tight">
                  High-ticket couture buyers demand tactile digital luxury.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Standard Shopify templates feel generic and fail to communicate the fabric quality, drape, and exclusivity required for four-figure garments.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#090A13] border border-amber-500/20 space-y-4">
                <div className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                  THE VANTIXIO SOLUTION
                </div>
                <ul className="space-y-3 text-xs font-mono text-slate-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Real-time GPU fabric physics shader rendering drape and texture.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Private VIP portal with dynamic invite-only digital showroom reservations.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Automated bespoke tailoring measurement recording module.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">OUTCOME</span>
                <span className="text-amber-300 font-bold">+240% AVERAGE ORDER VALUE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          WORLD 04 — YESDHOBI: BUSINESS OPERATIONS & LOGISTICS
      ========================================================================= */}
      <section id="yesdhobi" className="relative py-24 md:py-36 overflow-hidden bg-transparent">
        {/* Logistics electric green & cyan atmospheric depth */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            number="04"
            category="BUSINESS OPERATIONS // CASE STUDY"
            title="YesDhobi Operating System"
            titleAccent="High-Velocity Logistics"
            subtitle="Full-stack business engine powering on-demand garment care from doorstep pickup to industrial plant dispatch."
            align="between"
            actionButton={
              <button
                onClick={() => onOpenContact('YesDhobi Business Operations')}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#10B981] hover:bg-[#059669] text-slate-950 font-semibold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Explore Ops Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          />

          {/* Living Logistics Pipeline Visualization */}
          <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-[#07101C] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
            
            {/* Ambient operational depth glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    CONTINUOUS OPERATIONAL SYSTEM // CYCLE #{cycleCount}
                  </span>
                  {isResetting && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 animate-pulse">
                      SEAMLESS RESET LOOP
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  Customer Flow → Plant Sorting → Dispatch Cycle
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoCycle(!isAutoCycle)}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-1.5 hover:bg-emerald-900/60 transition-colors"
                >
                  {isAutoCycle ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isAutoCycle ? 'CONTINUOUS RUNNING' : 'PAUSED'}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveWorkflowStage((prev) => (prev + 1) % 5);
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center space-x-1 hover:text-white"
                >
                  <RefreshCw className="w-3 h-3 text-cyan-400" />
                  <span>STEP</span>
                </button>
              </div>
            </div>

            {/* Connecting Active Beam Track */}
            <div className="relative my-8">
              <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-800 z-0">
                {/* Moving active energy packet along track */}
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                  initial={false}
                  animate={{ 
                    width: `${((activeWorkflowStage + 1) / 5) * 100}%` 
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* 5-Station Interactive Visual Track */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                {[
                  { step: 1, title: 'CUSTOMER', desc: 'Mobile Booking & Slot Lock', icon: Smartphone, tag: 'APP TRIGGER' },
                  { step: 2, title: 'BOOKING', desc: 'Driver Route Batching', icon: Compass, tag: 'GEO-OPTIMIZE' },
                  { step: 3, title: 'PICKUP', desc: 'Barcode Tag & Bag Handover', icon: Truck, tag: 'RFID SCAN' },
                  { step: 4, title: 'PROCESSING', desc: 'Plant Garment Inspection', icon: Layers, tag: 'WASH CYCLE' },
                  { step: 5, title: 'DELIVERY', desc: 'Verified Return & Payment', icon: CheckCircle2, tag: 'OTP VERIFY' },
                ].map((station, idx) => {
                  const isActive = activeWorkflowStage === idx;
                  const isPassed = activeWorkflowStage > idx;
                  return (
                    <div
                      key={station.step}
                      onClick={() => setActiveWorkflowStage(idx)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all duration-400 flex flex-col justify-between ${
                        isActive
                          ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.3)] scale-[1.03]'
                          : isPassed
                            ? 'bg-slate-900/70 border-emerald-800/40 text-slate-300'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <station.icon className={`w-5 h-5 transition-colors duration-300 ${
                            isActive ? 'text-emerald-400' : isPassed ? 'text-emerald-500' : 'text-slate-600'
                          }`} />
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                            isActive ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-500'
                          }`}>
                            0{station.step}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white font-display tracking-tight flex items-center justify-between">
                          <span>{station.title}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 leading-snug">{station.desc}</div>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-emerald-400 font-semibold">{station.tag}</span>
                        {isActive && (
                          <span className="text-[8px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Telemetry Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs font-mono relative z-10">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">DISPATCH ALGORITHM</div>
                  <div className="text-emerald-400 font-bold mt-0.5">TSP Route Clustered (32% less fuel)</div>
                </div>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">GARMENT TRACEABILITY</div>
                  <div className="text-cyan-400 font-bold mt-0.5">100% Unique QR Barcode Audit</div>
                </div>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">CONTINUOUS LOOP ENGINE</div>
                  <div className="text-white font-bold mt-0.5">Zero Bottleneck Auto-Cycling</div>
                </div>
                <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
