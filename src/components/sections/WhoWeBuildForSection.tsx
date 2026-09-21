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

        {/* The 4 Architectural Gateway Doors + Right Spatial Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 4 Architectural Vertical Gateway Doors */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className={`group relative p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/20'
                      : 'border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-1.5 rounded border border-slate-700/60">
                      {getIcon(profile.id)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                      {profile.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {profile.headline}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[48px]">
                      {profile.subheadline}
                    </p>
                  </div>

                  {/* Bottom Blueprint Link */}
                  <div className="mt-6 pt-3 border-t border-slate-800/40 flex items-center justify-between">
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

          {/* Right Column: Open Spatial Window into 3D World */}
          <div className="lg:col-span-4 relative flex flex-col justify-between p-6 sm:p-8 pointer-events-none">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="text-[#FF5722] tracking-widest text-[10px] uppercase">// SCALE MATRIX</span>
              <span>1 TO 10,000</span>
            </div>

            <div className="my-auto py-8">
              <span className="text-[10px] font-mono tracking-widest text-[#FF5722] uppercase">
                TAILORED COMPLEXITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Different <br />
                Businesses. <br />
                A Higher Standard.
              </h3>
              <p className="mt-3 text-xs text-slate-300 font-mono drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                From 1 to 10,000 operators, we calibrate the architecture to your stage.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/40 flex justify-between items-center text-[10px] font-mono text-slate-400 pointer-events-auto">
              <span>ZERO PRE-BUILT CEILINGS</span>
              <button
                onClick={() => onOpenContact(`Scale: ${activeProfile.category}`)}
                className="text-[#FF5722] hover:text-orange-400 font-semibold flex items-center space-x-1"
              >
                <span>Initiate</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
