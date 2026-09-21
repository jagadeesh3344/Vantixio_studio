import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenStory: () => void;
}

const HERO_PERSPECTIVES = [
  {
    id: 1,
    title: 'TAILORED ARCHITECTURE',
    badge: 'PERSPECTIVE 01 // ARCHITECTURE',
    description: 'No forced SaaS templates or rigid workflows. Software engineered around your business logic.',
  },
  {
    id: 2,
    title: 'ZERO COMPROMISE',
    badge: 'PERSPECTIVE 02 // PRECISION',
    description: 'From complex internal platforms to AI copilots—built with precision to solve your exact friction.',
  },
  {
    id: 3,
    title: 'ONE ENGINEERING PARTNER',
    badge: 'PERSPECTIVE 03 // PARTNERSHIP',
    description: 'Discovery, system architecture, UI/UX design, full-stack engineering, and evolution under one roof.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenStory }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentPerspective = HERO_PERSPECTIVES[activeSlide];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_PERSPECTIVES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_PERSPECTIVES.length) % HERO_PERSPECTIVES.length);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Copy & Right Spatial Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content with Atmospheric Readability Layer */}
          <div className="lg:col-span-6 flex flex-col justify-center atmospheric-clear-soft rounded-3xl p-4 sm:p-8 -ml-4 sm:-ml-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#FF5722] mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>CUSTOM SOFTWARE ENGINEERING</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[4.85rem] font-display text-white tracking-tight leading-[1.04]"
            >
              Software. <br />
              <span className="font-serif italic font-normal text-slate-100">Built Around</span> <br />
              <span className="text-[#FF5722] inline-block relative font-display">
                You.
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FF5722]/40 rounded-full" />
              </span>
            </motion.h1>

            {/* Supporting Text - Exact approved wording */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl"
            >
              Custom software products, engineered from the ground up for the exact way you work, operate, and grow.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onOpenContact}
                className="group relative inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-sm tracking-wide shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Let's Build It</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenStory}
                className="group inline-flex items-center space-x-3 px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-sm font-medium transition-all"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FF5722]/20 group-hover:text-[#FF5722] transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>Our Philosophy</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Open Spatial Window into 3D WebGL Tech Monument */}
          <div className="lg:col-span-6 relative min-h-[380px] flex flex-col justify-between p-6 pointer-events-none">
            
            {/* Minimal floating coordinate */}
            <div className="flex justify-end pointer-events-auto">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {currentPerspective.badge}
              </span>
            </div>

            {/* Center Area: Open to 3D Scene */}
            <div className="my-auto py-8 relative flex flex-col items-end justify-center pointer-events-none">
              <div className="space-y-2 text-right font-mono text-xs max-w-xs">
                <div className="text-xs font-mono text-[#FF5722] tracking-wider uppercase font-semibold">
                  {currentPerspective.title}
                </div>
                <div className="text-sm font-display font-light text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {currentPerspective.description}
                </div>
              </div>
            </div>

            {/* Bottom Floating Perspective Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-between pt-4 border-t border-slate-800/40 pointer-events-auto"
            >
              <div className="flex items-center space-x-2 font-mono text-xs text-slate-300">
                <span className="text-cyan-400 font-bold">0{activeSlide + 1}</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-500">0{HERO_PERSPECTIVES.length}</span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">{currentPerspective.title}</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Previous Perspective"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Next Perspective"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
