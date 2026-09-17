import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, RefreshCw, CheckCircle2, Sparkles, Database, FileSpreadsheet, Users, Wrench, Shield, Zap } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const CHAOS_ITEMS = [
  { id: 'spreadsheets', label: '14 Broken Spreadsheets', category: 'DATA' },
  { id: 'slack', label: 'Manual Slack Pings', category: 'COMMUNICATION' },
  { id: 'tools', label: '7 Disconnected SaaS Tools', category: 'SOFTWARE' },
  { id: 'rules', label: 'Unwritten Tribal Rules', category: 'LOGIC' },
  { id: 'apis', label: 'Unintegrated Legacy APIs', category: 'SYSTEM' },
  { id: 'people', label: 'Frustrated Operators', category: 'PEOPLE' },
];

const CORE_STAGES = ['DISCOVER', 'ARCHITECT', 'DESIGN', 'ENGINEER', 'LAUNCH', 'EVOLVE'];

export const SignatureTransformationSection: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [processing, setProcessing] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [outputReady, setOutputReady] = useState(true);

  const handleRunProcessing = () => {
    if (processing) return;
    setProcessing(true);
    setOutputReady(false);
    setCurrentStageIdx(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < CORE_STAGES.length) {
        setCurrentStageIdx(stage);
      } else {
        clearInterval(interval);
        setProcessing(false);
        setOutputReady(true);
      }
    }, 450);
  };

  return (
    <section className="relative py-24 md:py-36 border-t border-slate-800/80 overflow-hidden bg-[#060913]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest text-[#FF5722] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIGNATURE ARCHITECTURAL PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Your Business <span className="text-cyan-400">→</span> Vantixio <span className="text-[#FF5722]">→</span> Your Software.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Watch chaotic operational friction transform into clean, scalable, bespoke digital software.
          </p>
        </div>

        {/* 3-Stage Pipeline Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Stage 1: YOUR BUSINESS (Chaos / Inputs) */}
          <div className="lg:col-span-4 rounded-2xl p-6 bg-[#090E1A] border border-rose-900/40 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500/60" />
            
            <div>
              <div className="text-[10px] font-mono tracking-widest text-rose-400 uppercase mb-2">
                STAGE 01 // INPUT
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Your Operational Reality
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                The unstructured, chaotic sprawl of modern business.
              </p>

              <div className="space-y-2">
                {CHAOS_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    animate={processing ? { x: [0, 8, 0], opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 0.8, repeat: processing ? Infinity : 0, delay: idx * 0.1 }}
                    className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-rose-300 font-semibold">{item.label}</span>
                    <span className="text-[9px] text-rose-400/80 px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-900/50">
                      {item.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-rose-400/80 flex items-center justify-between">
              <span>FRICTION LEVEL: HIGH</span>
              <span>6 INPUT STREAMS</span>
            </div>
          </div>

          {/* Stage 2: VANTIXIO CORE PROCESSOR */}
          <div className="lg:col-span-4 rounded-2xl p-6 bg-[#0B1222] border border-cyan-500/40 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl shadow-cyan-950/40">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-[#FF5722]" />

            <div>
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2 flex items-center justify-between">
                <span>STAGE 02 // VANTIXIO ENGINE</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2">
                Bespoke Processing Core
              </h3>
              <p className="text-xs text-slate-300 font-mono mb-6">
                Filtering, structuring, and engineering custom logic.
              </p>

              {/* Internal Stages Stepper */}
              <div className="space-y-2">
                {CORE_STAGES.map((stage, idx) => {
                  const isCurrent = processing && currentStageIdx === idx;
                  const isDone = !processing && outputReady;

                  return (
                    <div
                      key={stage}
                      className={`p-2.5 rounded-lg border transition-all flex items-center justify-between text-xs font-mono ${
                        isCurrent
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                          : isDone
                            ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                            : 'bg-slate-900/30 border-slate-800/40 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] opacity-70">0{idx + 1}</span>
                        <span className="font-semibold">{stage}</span>
                      </div>
                      <span className="text-[10px]">
                        {isCurrent ? 'PROCESSING...' : isDone ? '✓ VERIFIED' : 'WAITING'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Run Pipeline Button */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={handleRunProcessing}
                disabled={processing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${processing ? 'animate-spin' : ''}`} />
                <span>{processing ? 'ENGINEERING YOUR SOFTWARE...' : 'RE-SIMULATE TRANSFORMATION'}</span>
              </button>
            </div>
          </div>

          {/* Stage 3: YOUR SOFTWARE (Clean, Custom Output) */}
          <div className="lg:col-span-4 rounded-2xl p-6 bg-[#090E1A] border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between min-h-[360px] shadow-xl shadow-emerald-950/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />

            <div>
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-2">
                STAGE 03 // DELIVERABLE
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Your Custom Platform
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                One unified, beautiful, high-speed operating system.
              </p>

              {/* Clean Output Interface Preview */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-emerald-300 font-bold">CORE OPERATING SYSTEM</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 text-[10px]">99.99% HEALTH</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-500 text-[9px]">LIVE METRICS</div>
                    <div className="text-white font-bold mt-0.5">Real-time Stream</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-500 text-[9px]">APPROVALS</div>
                    <div className="text-white font-bold mt-0.5">Automated Rules</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero off-the-shelf compromises</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Native company branding & permissions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">STATUS: EXACT FIT</span>
              <button
                onClick={onOpenContact}
                className="text-xs font-mono text-[#FF5722] hover:text-orange-400 flex items-center space-x-1"
              >
                <span>Request Blueprint</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
