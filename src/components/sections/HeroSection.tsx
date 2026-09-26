import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenStory }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Open Spatial Typography Layout - 3D Architecture is fully visible */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pure Open Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            {/* Minimal Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#FF5722] mb-5"
            >
              <span className="w-1.5 h-1.5 bg-[#FF5722]" />
              <span>CUSTOM SOFTWARE ENGINEERING</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-display text-white tracking-tight leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
            >
              Software. <br />
              <span className="font-serif italic font-normal text-slate-100">Built Around</span> <br />
              <span className="text-[#FF5722] inline-block font-display font-bold">
                You.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              Custom software products, engineered from the ground up for the exact way you work, operate, and grow.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onOpenContact}
                className="group relative inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-xs font-mono tracking-wider uppercase shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Build Something</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenStory}
                className="group inline-flex items-center space-x-2.5 px-6 py-4 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all backdrop-blur-sm"
              >
                <Play className="w-3 h-3 text-cyan-400 fill-current" />
                <span>Our Philosophy</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Open spatial view framing the assembling 3D architecture */}
          <div className="lg:col-span-5 relative flex flex-col items-end justify-center pointer-events-none">
            <div className="text-right space-y-2 max-w-xs font-mono text-xs">
              <div className="text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">
                SYSTEM 01 // ADAPTIVE ARCHITECTURE
              </div>
              <div className="text-sm font-display font-light text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Thousands of precision components assembling continuously around the business workflow.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
