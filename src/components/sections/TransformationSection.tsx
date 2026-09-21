import React from 'react';
import { ArrowRight, FileSpreadsheet, Layers, MessageSquare, Check, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

interface TransformationSectionProps {
  onOpenContact: () => void;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="transformation" className="relative py-16 md:py-24 border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          category="THE ARCHITECTURAL MORPH"
          title="We Don’t Sell Features."
          titleAccent="We Solve Friction."
          subtitle="Business complexity, disconnected spreadsheets, and manual handoffs reorganized—engineered clarity emerges."
        />

        {/* 1-to-2 Viewport Cinematic Transformation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          
          {/* Left Column: Fragmented Complexity In */}
          <div className="lg:col-span-4 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-rose-900/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>INFLOW // BUSINESS FRICTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                What Goes In.
              </h3>
              <p className="text-xs text-slate-300 font-mono mb-6">
                The daily operational drag slowing your company down.
              </p>

              <div className="space-y-3 font-sans text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-black/40 border border-rose-900/30 flex items-start space-x-3">
                  <FileSpreadsheet className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Fragile Spreadsheets</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Siloed Google Sheets & Excel workarounds.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-rose-900/30 flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Manual Handoffs</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Scattered WhatsApp & email approval chains.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-rose-900/30 flex items-start space-x-3">
                  <Layers className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Rigid SaaS Tools</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Paying for bloated seats that don't fit workflow.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/60 text-[11px] font-mono text-rose-400/80">
              RESULT: Operational friction & lost momentum
            </div>
          </div>

          {/* Center Column: System Synthesis & Transformation */}
          <div className="lg:col-span-4 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-cyan-500/30 flex flex-col justify-between text-center">
            <div className="my-auto py-6">
              <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-[0_0_24px_rgba(25,211,230,0.3)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                SYSTEM SYNTHESIS
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Architectural Reorganization.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs mx-auto">
                Disconnected tools and manual silos deconstruct and reorganize into one fluid, bespoke operating architecture.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/60">
              <button
                onClick={onOpenContact}
                className="w-full py-3 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-orange-600/30 hover:scale-105"
              >
                <span>Solve Your Friction</span>
              </button>
            </div>
          </div>

          {/* Right Column: Engineered Clarity Out (What emerges from the Singularity) */}
          <div className="lg:col-span-4 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-emerald-900/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>EMERGENCE // STRUCTURED CLARITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                What Emerges.
              </h3>
              <p className="text-xs text-slate-300 font-mono mb-6">
                A custom operating system that runs your company seamlessly.
              </p>

              <div className="space-y-3 font-sans text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/30 flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Single Source of Truth</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Real-time live data across every team member.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/30 flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Zero-Click Automations</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Workflows trigger automatically between departments.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/30 flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">100% Tailored & Owned</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Zero per-seat licensing. Complete proprietary IP.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/60 text-[11px] font-mono text-emerald-400/80">
              RESULT: Uncapped operational throughput
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
