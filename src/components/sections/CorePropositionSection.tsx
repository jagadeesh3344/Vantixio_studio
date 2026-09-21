import React from 'react';
import { Check, X } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { ComparisonCube } from '../3d/ComparisonCube';

export const CorePropositionSection: React.FC = () => {
  return (
    <section id="problem" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="01"
          category="THE CORE PROPOSITION"
          title="Most Software Forces You to Adapt."
          titleAccent="Vantixio Flips the Model."
          subtitle="There is no standard business. So there should be no standard software."
        />

        {/* The Dual Column + Center 3D Isometric Visual Layout (Floating spatial layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Traditional SaaS & Templates */}
          <div className="lg:col-span-4 atmospheric-clear-soft rounded-2xl border-l-2 border-rose-500/40 pl-6 sm:pl-8 py-4 relative">
            <div className="text-[11px] font-mono tracking-widest text-rose-400 uppercase font-semibold mb-2">
              TRADITIONAL SAAS & TEMPLATES
            </div>
            
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              “Here’s how our product works.”
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
              Forces your business to bend workflows into rigid pre-made templates.
            </p>

            <ul className="space-y-4">
              {[
                { title: 'Forces your business to bend workflows', desc: 'Conforming unique business processes into rigid pre-made templates.' },
                { title: 'Creates friction & workaround spreadsheets', desc: 'Disconnected tools and spreadsheet workarounds to patch missing logic.' },
                { title: 'Charges for features you may never use', desc: 'Paying subscription seat costs for bloated, unused capabilities.' },
                { title: 'Limits scalability when logic demands more', desc: 'Hard constraints and vendor walls when unique operations need to scale.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-600/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-rose-400">
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{item.title}</div>
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
          <div className="lg:col-span-4 atmospheric-clear-soft rounded-2xl border-l-2 border-cyan-500/50 pl-6 sm:pl-8 py-4 relative">
            <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-2">
              THE VANTIXIO MODEL
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              “Tell us how you want it to work.”
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
              Engineered around your real people, daily workflows, and exact habits.
            </p>

            <ul className="space-y-4">
              {[
                { title: 'Engineered around your real people', desc: 'Daily workflows and exact operational habits modeled directly in software.' },
                { title: 'Consolidates operational friction into one platform', desc: 'Unified single-pane operating system removing manual handoffs.' },
                { title: '100% custom business logic & branding', desc: 'Automated rules, native design, and proprietary logic tailored to you.' },
                { title: 'Built to evolve continuously', desc: 'Scales without limits as your commercial ambitions expand.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-300">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Core Axiom Footnote */}
        <div className="mt-12 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-cyan-300 font-semibold">CORE AXIOM:</span>
            <span>Software should conform to the business, not the business to the software.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
