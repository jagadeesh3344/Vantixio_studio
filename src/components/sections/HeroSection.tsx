import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, ChevronLeft, ChevronRight, Sparkles, Box, Compass, Layers } from 'lucide-react';
import { TRUSTED_COMPANIES } from '../../data/siteData';
import { VantixioCore3D } from '../3d/VantixioCore3D';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenStory: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'TAILORED. INTELLIGENT. EVOLVING.',
    caption: 'IDEAS // SYSTEMS // PEOPLE // IMPACT',
    badge: 'PERSPECTIVE 01 // ARCHITECTURE',
    description: 'Every software system is architected around your exact operational reality.',
    imageAlt: 'Architectural monolithic stairs with ambient warm lighting',
  },
  {
    id: 2,
    title: 'AUTONOMOUS WORKFLOWS.',
    caption: 'DATA // INTELLIGENCE // AGENTS // LOGIC',
    badge: 'PERSPECTIVE 02 // INTELLIGENCE',
    description: 'Custom AI copilots and background agents embedded directly into business logic.',
    imageAlt: 'Technical geometric blueprint system',
  },
  {
    id: 3,
    title: 'ENTERPRISE-GRADE RESILIENCE.',
    caption: 'CLOUD // POSTGRES // K8S // ZERO-DOWNTIME',
    badge: 'PERSPECTIVE 03 // INFRASTRUCTURE',
    description: 'High-availability infrastructure engineered to scale seamlessly as you grow.',
    imageAlt: 'Connected digital node architecture',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenStory }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'visual' | '3d-core'>('visual');

  const currentSlide = HERO_SLIDES[activeSlide];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Copy & Right Architectural Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
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

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl"
            >
              Custom software products, engineered from the ground up for the exact way your business works, operates, and grows.
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
                <span>Watch Our Story</span>
              </button>
            </motion.div>

            {/* Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">200+</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Solutions Built</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">98%</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-cyan-400 tracking-tight">∞</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Built to Scale</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Hero Visual / 3D Core */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-[#0A0F1E] shadow-2xl shadow-black/80 group"
            >
              {/* Mode Toggle Switch: Architectural vs 3D Core */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 bg-[#070A12]/80 backdrop-blur-md px-2 py-1 rounded-full border border-slate-700/60 text-[11px] font-mono">
                <button
                  onClick={() => setViewMode('visual')}
                  className={`px-2.5 py-1 rounded-full transition-colors ${
                    viewMode === 'visual' ? 'bg-[#FF5722] text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  EDITORIAL ARCHITECTURE
                </button>
                <button
                  onClick={() => setViewMode('3d-core')}
                  className={`px-2.5 py-1 rounded-full flex items-center space-x-1 transition-colors ${
                    viewMode === '3d-core' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>3D CORE</span>
                </button>
              </div>

              {/* Top Right Architectural Ticker */}
              <div className="absolute top-4 right-4 z-20 text-right pointer-events-none">
                <div className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  IDEAS
                </div>
                <div className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  SYSTEMS
                </div>
                <div className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  PEOPLE
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#FF5722] uppercase font-bold">
                  IMPACT
                </div>
              </div>

              {/* Display Area: Mode Dependent */}
              <div className="relative h-[420px] sm:h-[480px] md:h-[540px] w-full flex items-center justify-center">
                {viewMode === '3d-core' ? (
                  <div className="w-full h-full">
                    <VantixioCore3D />
                  </div>
                ) : (
                  /* Architectural Editorial View matching image.png */
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Architectural Atmospheric Artwork (SVG + Canvas Shader) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#070A12] via-[#0E1528] to-[#141E38]" />

                    {/* Brutalist Architectural Stairs & Warm Light Shafts */}
                    <svg
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                      viewBox="0 0 600 700"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="warmLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFA26B" stopOpacity="0.85" />
                          <stop offset="50%" stopColor="#FF5722" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#0B1020" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="concreteWall" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2A354D" />
                          <stop offset="50%" stopColor="#1B2335" />
                          <stop offset="100%" stopColor="#0A0E1A" />
                        </linearGradient>
                      </defs>

                      {/* Monolithic Angular Concrete Walls */}
                      <polygon points="0,0 260,0 180,700 0,700" fill="#12192A" />
                      <polygon points="260,0 480,0 360,700 180,700" fill="url(#concreteWall)" />
                      <polygon points="480,0 600,0 600,700 360,700" fill="#0D1424" />

                      {/* Angular Canyon Light Shaft from Above */}
                      <polygon points="320,0 400,0 440,700 240,700" fill="url(#warmLight)" style={{ mixBlendMode: 'screen' }} />

                      {/* Ascending Architectural Stairs */}
                      {[...Array(14)].map((_, i) => {
                        const y = 280 + i * 28;
                        const x1 = 220 + i * 8;
                        const x2 = 380 + i * 10;
                        return (
                          <g key={i}>
                            {/* Stair Tread */}
                            <polygon
                              points={`${x1},${y} ${x2},${y} ${x2 + 10},${y + 12} ${x1 + 10},${y + 12}`}
                              fill={i % 2 === 0 ? '#354360' : '#2A364E'}
                              stroke="#48597E"
                              strokeWidth="0.5"
                            />
                            {/* Stair Riser */}
                            <polygon
                              points={`${x1 + 10},${y + 12} ${x2 + 10},${y + 12} ${x2 + 10},${y + 24} ${x1 + 10},${y + 24}`}
                              fill="#141C2C"
                            />
                          </g>
                        );
                      })}

                      {/* Figure Ascending the Stairs Toward Light */}
                      <g transform="translate(310, 360)">
                        {/* Head */}
                        <circle cx="0" cy="-28" r="4" fill="#FF5722" />
                        {/* Body / Silhouette */}
                        <path d="M-3,-24 L3,-24 L4,-4 L-4,-4 Z" fill="#0B101E" />
                        {/* Legs in walking stance */}
                        <line x1="-2" y1="-4" x2="-5" y2="16" stroke="#0B101E" strokeWidth="2.5" />
                        <line x1="2" y1="-4" x2="6" y2="12" stroke="#0B101E" strokeWidth="2.5" />
                        {/* Aura glow behind figure */}
                        <circle cx="0" cy="-14" r="18" fill="#FFA26B" opacity="0.3" filter="blur(4px)" />
                      </g>

                      {/* Fine Blueprint Technical Overlay Lines */}
                      <line x1="180" y1="0" x2="180" y2="700" stroke="#19D3E6" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4" />
                      <line x1="360" y1="0" x2="360" y2="700" stroke="#FF5722" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
                      <circle cx="360" cy="280" r="4" fill="none" stroke="#19D3E6" strokeWidth="1" />
                      <text x="375" y="284" fill="#19D3E6" fontSize="9" fontFamily="monospace" opacity="0.8">NODE // 0x7E1</text>
                    </svg>

                    {/* Gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-black/30 pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Bottom Architectural Overlay & Slide Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#070A12] via-[#070A12]/90 to-transparent flex items-end justify-between z-20 pointer-events-auto">
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    {currentSlide.title}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {currentSlide.caption}
                  </div>
                </div>

                {/* Pagination and Arrows */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono text-slate-400">
                    0{activeSlide + 1} / 0{HERO_SLIDES.length}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handlePrevSlide}
                      className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                      aria-label="Previous Perspective"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                      aria-label="Next Perspective"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Proof / Trusted Companies Bar */}
        <div className="mt-20 pt-8 border-t border-slate-800/60">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 text-center mb-6">
            TRUSTED BY FORWARD-THINKING COMPANIES & INNOVATORS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            {TRUSTED_COMPANIES.map((company) => (
              <div
                key={company.name}
                className="text-lg sm:text-xl font-heading font-bold text-slate-400 hover:text-white transition-colors cursor-default tracking-tight flex items-center space-x-1.5"
              >
                <span className="w-2 h-2 rounded-sm bg-slate-600 inline-block" />
                <span>{company.name.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
