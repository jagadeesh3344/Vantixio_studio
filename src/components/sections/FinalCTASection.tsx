import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FinalCTASectionProps {
  initialCategory?: string;
  onOpenContactModal: () => void;
  onFormSubmitted?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  initialCategory,
  onOpenContactModal,
  onFormSubmitted,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    if (onFormSubmitted) {
      onFormSubmitted();
    }
  };

  return (
    <section id="contact" className="relative min-h-[90vh] flex flex-col justify-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Minimal Eyebrow */}
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#FF5722] mb-6">
          <span className="w-1.5 h-1.5 bg-[#FF5722]" />
          <span>05 // THE FINISHED SYSTEM</span>
        </div>

        {/* Main Grid: Left Core Statement & Right Direct Fast Conversation Intake */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Pure Open Typography */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-[1.06] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              What would you build <br />
              <span className="font-serif italic font-normal text-slate-100">if software had</span> <br />
              <span className="text-[#FF5722] font-display font-bold">no limits?</span>
            </h2>

            <p className="text-xl sm:text-2xl text-slate-200 font-display font-light max-w-lg leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              You bring the problem. <br />
              <span className="text-cyan-400 font-medium">We build the answer.</span>
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenContactModal}
                className="group inline-flex items-center space-x-2.5 px-9 py-4 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-xs font-mono tracking-wider uppercase shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="pt-4 flex items-center space-x-6 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-emerald-400" />
                <span>Senior software architects only</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-cyan-400" />
                <span>Zero vendor lock-in</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Fast Intake */}
          <div className="lg:col-span-5 relative z-10">
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Conversation Initialized
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto font-sans">
                    We received your notes and will reply directly from our engineering team within 24 hours.
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-cyan-400">
                    DISPATCHED TO TEAM.VANTIXIOSTUDIO@GMAIL.COM
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                    DIRECT ARCHITECTURAL INTAKE
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      What problem are you solving?
                    </label>
                    <textarea
                      rows={3}
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      placeholder="Tell us what you want to build or streamline..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500 font-sans transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-[#FF5722] hover:bg-[#E64A19] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md shadow-orange-600/30 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Start a Conversation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
