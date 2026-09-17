import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileSpreadsheet, MessageSquare, RefreshCw, Layers, CheckCircle2, XCircle, Play, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

interface TransformationSectionProps {
  onOpenContact: () => void;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({ onOpenContact }) => {
  const [funnelActive, setFunnelActive] = useState(true);

  return (
    <section id="transformation" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with [See Real Impact ->] button */}
        <SectionHeader
          number="05"
          category="OPERATIONAL TRANSFORMATION"
          title="We Don’t Sell Features."
          titleAccent="We Solve Friction."
          subtitle="Consolidating fragmented tools into one intelligent custom operating system."
          align="between"
          actionButton={
            <button
              onClick={onOpenContact}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-semibold tracking-wide shadow-lg shadow-orange-600/30 transition-all hover:scale-105"
            >
              <span>See Real Impact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
        />

        {/* The Main Layout: Left/Center Before-Funnel-After + Right Ribbon Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left & Center: Before vs Central Processor vs After (matching image.png) */}
          <div className="lg:col-span-8 rounded-2xl p-6 sm:p-8 bg-[#0A0F1D] border border-slate-800/90 flex flex-col justify-between relative overflow-hidden">
            
            {/* Interactive Data Funnel Processor Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
              <div className="text-xs font-mono text-slate-400">
                ARCHITECTURE PIPELINE // <span className="text-cyan-400 font-semibold">CHAOS → HARMONY</span>
              </div>
              <button
                onClick={() => setFunnelActive(!funnelActive)}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center space-x-1.5 hover:bg-slate-800"
              >
                <RefreshCw className={`w-3 h-3 ${funnelActive ? 'animate-spin' : ''}`} />
                <span>{funnelActive ? 'RUNNING RECONCILIATION' : 'PAUSE DATA STREAM'}</span>
              </button>
            </div>

            {/* Before vs Funnel vs After Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 items-center relative">
              
              {/* BEFORE COLUMN */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>BEFORE VANTIXIO // FRAGMENTED FRICTION</span>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: FileSpreadsheet, title: 'Disconnected Spreadsheets', desc: 'Critical data trapped in static Excel & Google Sheets.' },
                    { icon: MessageSquare, title: 'WhatsApp & Email Groups', desc: 'Unstructured communication & lost approvals.' },
                    { icon: RefreshCw, title: 'Manual Reconciliation', desc: 'Hours wasted copying numbers between unintegrated systems.' },
                    { icon: Layers, title: 'Siloed Software', desc: 'Paying for multiple apps that don’t talk to each other.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start space-x-3">
                      <item.icon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER COLUMN */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>AFTER VANTIXIO // ONE CONNECTED SYSTEM</span>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'One Unified Platform', desc: 'All operations, metrics, and user roles consolidated.' },
                    { title: 'Automated Workflows', desc: 'Background code handles data sync, triggers & reports.' },
                    { title: 'Real-Time Visibility', desc: 'Live executive dashboards and instant operational metrics.' },
                    { title: 'Engineered for Your Team', desc: 'Zero training friction—built around how your people work.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 flex items-start space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">{item.title}</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Telemetry Bar */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-cyan-400">✓ 100% AUDITABLE LOGS</span>
              <span className="text-emerald-400">✓ 0 WORKAROUND SPREADSHEETS</span>
              <span className="text-[#FF5722]">✓ 3.4X FASTER CYCLE SPEED</span>
            </div>

          </div>

          {/* Right Column: Glowing Energy Ribbon Graphic (matching image.png) */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 bg-[#070A12] relative flex flex-col justify-end p-8 min-h-[380px]">
            {/* SVG Glowing Ribbon Flow */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 400 600" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8A65" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FF5722" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D84315" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Multiple sinuous ribbons */}
                <path
                  d="M 50,0 Q 250,150 180,300 T 350,600"
                  fill="none"
                  stroke="url(#ribbonGrad)"
                  strokeWidth="38"
                  opacity="0.3"
                  filter="blur(16px)"
                />
                <path
                  d="M 100,0 Q 280,180 150,320 T 320,600"
                  fill="none"
                  stroke="url(#ribbonGrad)"
                  strokeWidth="12"
                  opacity="0.8"
                />
                <path
                  d="M 120,0 Q 290,190 160,330 T 300,600"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <path
                  d="M 80,0 Q 260,170 140,310 T 340,600"
                  fill="none"
                  stroke="#FFAB91"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  opacity="0.6"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent" />
            </div>

            {/* Text Overlay matching image.png */}
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
                Smoother <br />
                Operations. <br />
                <span className="text-[#FF5722]">Stronger</span> <br />
                Growth.
              </h3>
              <p className="mt-3 text-xs text-slate-400 font-mono">
                Reclaim lost hours and scale your real business model with software that actually fits.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
