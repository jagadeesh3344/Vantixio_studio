import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Building2, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { CLIENT_PROFILES } from '../../data/siteData';
import { ClientProfile } from '../../types';

interface WhoWeBuildForSectionProps {
  onOpenContact: (profile: string) => void;
}

export const WhoWeBuildForSection: React.FC<WhoWeBuildForSectionProps> = ({ onOpenContact }) => {
  const [activeProfile, setActiveProfile] = useState<ClientProfile>(CLIENT_PROFILES[0]);
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'startups': return <Rocket className="w-5 h-5 text-cyan-400" />;
      case 'smes': return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'enterprises': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'brands': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Rocket className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="who-we-build-for" className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="07"
          category="WHO WE BUILD FOR"
          title="Engineered for Ambitious Organizations of Every Scale."
          subtitle="From visionary zero-to-one startups to high-throughput enterprises."
        />

        {/* The 4 Architectural Gateway Doors + Right Mountain Artwork Layout (matching image.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 4 Architectural Vertical Gateway Doors */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 perspective-[1000px]">
            {CLIENT_PROFILES.map((profile) => {
              const isSelected = activeProfile.id === profile.id;
              const isHovered = hoveredProfile === profile.id;

              return (
                <div
                  key={profile.id}
                  onMouseEnter={() => {
                    setHoveredProfile(profile.id);
                    setActiveProfile(profile);
                  }}
                  onMouseLeave={() => setHoveredProfile(null)}
                  onClick={() => setActiveProfile(profile)}
                  className={`group relative rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#0E1628] border-cyan-400/90 shadow-2xl shadow-cyan-950/40'
                      : 'bg-[#090E1A]/90 hover:bg-[#0C1222] border-slate-800/80'
                  }`}
                  style={{
                    transform: isHovered ? 'translateY(-6px) rotateY(-4deg)' : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Top Glass Door Frame Line */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      {getIcon(profile.id)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                      {profile.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {profile.headline}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[50px]">
                      {profile.subheadline}
                    </p>
                  </div>

                  {/* Bottom Blueprint Link */}
                  <div className="mt-8 pt-4 border-t border-slate-800/70 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#FF5722] group-hover:text-orange-400 flex items-center space-x-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">GATE // 0{profile.id === 'startups' ? 1 : profile.id === 'smes' ? 2 : profile.id === 'enterprises' ? 3 : 4}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Atmospheric Mountain Road Visual (matching image.png) */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 bg-[#070A12] relative flex flex-col justify-end p-8 min-h-[380px]">
            {/* SVG Winding Mountain Highway / Landscape */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2E3547" />
                    <stop offset="60%" stopColor="#1B2232" />
                    <stop offset="100%" stopColor="#080C16" />
                  </linearGradient>
                  <linearGradient id="mountainSun" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#FFA26B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#080C16" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Sky */}
                <rect width="400" height="600" fill="url(#skyGrad)" />

                {/* Sun Glow in Valley */}
                <circle cx="200" cy="220" r="140" fill="url(#mountainSun)" />

                {/* Background Mountain Peaks */}
                <polygon points="0,320 120,180 240,320" fill="#141C2B" opacity="0.9" />
                <polygon points="160,320 280,160 400,320" fill="#192336" opacity="0.9" />

                {/* Foreground Ridge */}
                <polygon points="0,420 180,260 360,420 400,600 0,600" fill="#0D131F" />

                {/* Winding Hairpin Road */}
                <path
                  d="M 60,600 C 140,540 220,530 260,480 C 300,430 240,390 180,360 C 120,330 160,290 220,270"
                  fill="none"
                  stroke="#FF5722"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                />
                <circle cx="220" cy="270" r="4" fill="#FFA26B" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent" />
            </div>

            {/* Overlay Text matching image.png */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-[#FF5722] uppercase">
                TAILORED COMPLEXITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Different <br />
                Businesses. <br />
                A Higher Standard.
              </h3>
              <p className="mt-2 text-xs text-slate-400 font-mono">
                From 1 to 10,000 operators, we calibrate the architecture to your stage.
              </p>
            </div>
          </div>

        </div>

        {/* Selected Profile Detail Drawer */}
        <div className="mt-12 rounded-2xl bg-[#090F1E] border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                ORGANIZATIONAL BLUEPRINT // {activeProfile.category}
              </div>
              <h4 className="text-2xl font-display font-bold text-white">
                {activeProfile.headline}
              </h4>
            </div>

            <button
              onClick={() => onOpenContact(`Profile: ${activeProfile.category}`)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold hover:bg-orange-600 transition-all self-start lg:self-auto shadow-md shadow-orange-600/30"
            >
              <span>Build For {activeProfile.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <div className="text-xs font-mono text-rose-400 uppercase mb-2">Common Operational Traps</div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {activeProfile.challenges.map((chal, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">×</span>
                    <span>{chal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Vantixio Bespoke Solution</div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {activeProfile.solutions.map((sol, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
