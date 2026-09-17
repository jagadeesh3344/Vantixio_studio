import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send, CheckCircle2, Sparkles, ShieldCheck, Clock, Calendar } from 'lucide-react';

interface FinalCTASectionProps {
  initialCategory?: string;
  onOpenContactModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ initialCategory, onOpenContactModal }) => {
  const [selectedType, setSelectedType] = useState(initialCategory || 'Web Platform');
  const [selectedTimeline, setSelectedTimeline] = useState('4-8 weeks');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 border-t border-slate-800/80 bg-[#060A14] overflow-hidden">
      {/* Background radiant ambient light */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Call to Action + Right Architectural Interactive Scope Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Architectural Statement & Direct Actions */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#FF5722] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              <span>START YOUR BUILD</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-white tracking-tight leading-[1.08]">
              Ready to Build <br />
              <span className="font-serif italic font-normal text-slate-100">Something Made</span> <br />
              <span className="text-[#FF5722] relative inline-block font-display">
                Just for You?
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FF5722]/40 rounded-full" />
              </span>
            </h2>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 font-heading font-medium">
              “You bring the problem. We build the answer.”
            </p>

            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
              No rigid templates. No forced workflows. Schedule a technical architecture session with our engineering directors.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContactModal}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-sm tracking-wide shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>NDA & Direct Partner Access</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="text-white font-bold block mb-1">AVERAGE KICKOFF TIME</span>
                <span>Within 5 business days</span>
              </div>
              <div>
                <span className="text-white font-bold block mb-1">CODE OWNERSHIP</span>
                <span>100% Client IP Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scope Estimator & Instant Direct Inquiry */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#090F1E]/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-black/80 relative">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>INTERACTIVE SCOPE CONFIGURATOR</span>
                <span className="text-[10px] text-slate-500">ESTIMATOR v2.4</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Define Your Architecture
              </h3>

              {submitted ? (
                <div className="p-8 rounded-xl bg-cyan-950/30 border border-cyan-400/50 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white">Discovery Blueprint Initiated</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto font-mono">
                    We have received your scope configuration for a <span className="text-cyan-300 font-bold">{selectedType}</span>. Our lead architect will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full text-xs font-mono text-slate-400 hover:text-white border border-slate-700"
                  >
                    Submit Another Scope
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Select System Type */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      1. What type of system do you need?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Web Platform', 'Mobile App', 'AI Copilot', 'ERP & Ops', 'API Sync', 'Bespoke Tool'].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`p-2.5 rounded-lg border text-xs font-mono text-center transition-all ${
                            selectedType === type
                              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Launch Timeframe */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      2. Target Timeframe
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['4-8 weeks', '8-16 weeks', 'Flexible'].map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTimeline(time)}
                          className={`p-2 rounded-lg border text-xs font-mono text-center transition-all ${
                            selectedTimeline === time
                              ? 'bg-[#FF5722]/20 border-[#FF5722] text-orange-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Operational Problem Statement */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      3. Describe the problem your software should solve:
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Replace 3 spreadsheets and automate client dispatch approvals..."
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      4. Your Work Email:
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@company.com"
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs font-mono tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.01]"
                  >
                    <span>Request Technical Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
