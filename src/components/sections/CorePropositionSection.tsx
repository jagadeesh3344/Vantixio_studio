import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, ArrowRight, Cog, Layers, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { ComparisonCube } from '../3d/ComparisonCube';

export const CorePropositionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'gear-mesh'>('comparison');

  return (
    <section id="problem" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="01"
          category="THE CORE PROPOSITION"
          title="Most software forces you to adapt."
          subtitle="There is no standard business. So there should be no standard software."
          titleAccent="Vantixio flips the model."
        />

        {/* The Dual Column + Center 3D Isometric Visual Layout (matching image.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Traditional SaaS & Templates */}
          <div className="lg:col-span-4 rounded-2xl p-6 sm:p-8 bg-[#0C1220]/80 border border-rose-900/30 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
            
            <div className="text-[11px] font-mono tracking-widest text-rose-400 uppercase font-semibold mb-2">
              TRADITIONAL SAAS & TEMPLATES
            </div>
            
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              “Here’s how our product works.”
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
              Forces your business to bend workflows into rigid pre-made templates.
            </p>

            <ul className="space-y-4">
              {[
                { title: 'Rigid templates & forced workflows', desc: 'Teams waste hours adapting to unchangeable UI paradigms.' },
                { title: 'Disconnected tools & workaround spreadsheets', desc: 'Spreadsheet duct-tape and lost records across apps.' },
                { title: 'Pay for features you never use', desc: 'Paying enterprise seat licenses for 80% unused SaaS bloat.' },
                { title: 'Limits scalability when you need more', desc: 'Hard API limits and vendor lock-in choking growth.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-600/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-rose-400">
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column: 3D Isometric Block System / Transformation */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-4">
            <ComparisonCube />
          </div>

          {/* Right Column: The Vantixio Model */}
          <div className="lg:col-span-4 rounded-2xl p-6 sm:p-8 bg-[#0C1220]/80 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden shadow-xl shadow-cyan-950/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-[#FF5722]" />

            <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-2">
              THE VANTIXIO MODEL
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              “We build software around you.”
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
              Engineered from the ground up around your exact people, workflows, and habits.
            </p>

            <ul className="space-y-4">
              {[
                { title: 'Engineered around your real workflows', desc: 'Every button, transition, and status reflects how your team works.' },
                { title: 'Consolidates fragmented tools into one platform', desc: 'One cohesive operating system replacing 8 disparate subscriptions.' },
                { title: '100% custom logic, automation & branding', desc: 'Proprietary business logic and native company visual identity.' },
                { title: 'Built to evolve as your business grows', desc: 'Zero vendor lock-in; code that scales with your ambitions.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-300">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Blueprint Mathematical Footnote */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-semibold">CORE AXIOM:</span>
            <span>Software should conform to the business, not the business to the software.</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 sm:mt-0">
            CALCULATED FRICTION REDUCTION // 84.6%
          </div>
        </div>

      </div>
    </section>
  );
};
