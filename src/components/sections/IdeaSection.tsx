import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface IdeaSectionProps {
  onOpenContact?: () => void;
}

export const IdeaSection: React.FC<IdeaSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="idea" className="relative min-h-[90vh] flex flex-col justify-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Open Spatial Typography - The Reshaping Architectural World Is Front-and-Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pure Open Typography */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400">
              <span className="w-1.5 h-1.5 bg-cyan-400" />
              <span>THE CORE PRINCIPLE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Most Software <br />
              <span className="font-serif italic font-normal text-rose-300">Forces You</span> <br />
              To Adapt.
            </h2>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#FF5722] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Vantixio Flips the Model.
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Traditional software traps unique companies in standardized, rigid cages. Vantixio starts with your workflows and dynamic business reality—the architecture unlatches and continuously reshapes itself around you.
            </p>

            <div className="pt-4 flex items-center space-x-6 text-xs font-mono text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-rose-400" />
                <span className="text-slate-400">Standard SaaS: Inflexible</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-cyan-400" />
                <span className="text-white font-semibold">Vantixio: Responsive Architecture</span>
              </div>
            </div>

            {onOpenContact && (
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-[#FF5722] hover:text-orange-400 font-semibold transition-colors"
                >
                  <span>Build software around your business</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Spatial Readout */}
          <div className="lg:col-span-5 flex flex-col items-end justify-center pointer-events-none">
            <div className="text-right space-y-2 max-w-xs font-mono text-xs">
              <div className="text-[10px] tracking-widest text-[#FF5722] uppercase font-semibold">
                SYSTEM 02 // CONTINUOUS ADAPTATION
              </div>
              <div className="text-sm font-display font-light text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                The rigid modular grid unlatches its joints, sliding its components along the organic business spline.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
