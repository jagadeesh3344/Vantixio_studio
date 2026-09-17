import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, Check, X, Layers, Sparkles } from 'lucide-react';

export const ComparisonCube: React.FC = () => {
  const [mode, setMode] = useState<'fragmented' | 'focused'>('focused');
  const [sliderValue, setSliderValue] = useState(75); // 0 = 100% fragmented, 100 = 100% focused

  // Calculate dynamic transformation values
  const isFocused = sliderValue > 50;

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* 3D Isometric Visualization Canvas */}
      <div className="relative w-full max-w-xl h-72 sm:h-96 flex items-center justify-center overflow-hidden rounded-2xl bg-[#090E1A]/80 border border-slate-800/80 backdrop-blur-md p-6">
        {/* Background technical coordinates */}
        <div className="absolute inset-0 bg-blueprint-grid-dense opacity-20 pointer-events-none" />
        
        {/* State Label overlay */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors ${
            sliderValue < 40 
              ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60' 
              : sliderValue > 60 
                ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60' 
                : 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
          }`}>
            {sliderValue < 40 ? 'FRAGMENTED BLOCKS (SAAS SPREAD)' : sliderValue > 60 ? 'FOCUSED ARCHITECTURE (VANTIXIO)' : 'REORGANIZING SYSTEM'}
          </span>
        </div>

        {/* The Isometric Cube Group */}
        <div className="relative w-64 h-64 perspective-[1000px] flex items-center justify-center">
          {/* Isometric Transform Container */}
          <div 
            className="relative w-48 h-48 transition-transform duration-700 ease-out"
            style={{
              transform: `rotateX(55deg) rotateZ(${45 + (sliderValue - 50) * 0.4}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 8 Modular Blocks */}
            {[
              { id: 1, base: { x: -40, y: -40, z: 0 }, frag: { x: -75, y: -65, z: 25, rot: 25 }, label: 'Spreadsheets' },
              { id: 2, base: { x: 40, y: -40, z: 0 }, frag: { x: 70, y: -60, z: -15, rot: -20 }, label: 'Email Groups' },
              { id: 3, base: { x: -40, y: 40, z: 0 }, frag: { x: -65, y: 70, z: -20, rot: -30 }, label: 'Manual Entry' },
              { id: 4, base: { x: 40, y: 40, z: 0 }, frag: { x: 60, y: 65, z: 30, rot: 35 }, label: 'Siloed Tools' },
              { id: 5, base: { x: -40, y: -40, z: 50 }, frag: { x: -80, y: -30, z: 70, rot: -15 }, label: 'Unused Seats' },
              { id: 6, base: { x: 40, y: -40, z: 50 }, frag: { x: 85, y: -40, z: 65, rot: 15 }, label: 'Workarounds' },
              { id: 7, base: { x: -40, y: 40, z: 50 }, frag: { x: -50, y: 80, z: 75, rot: 20 }, label: 'Rigid Limits' },
              { id: 8, base: { x: 40, y: 40, z: 50 }, frag: { x: 75, y: 70, z: 80, rot: -25 }, label: 'Sync Errors' },
            ].map((block) => {
              const blend = sliderValue / 100; // 0 = frag, 1 = base
              const currentX = block.frag.x * (1 - blend) + block.base.x * blend;
              const currentY = block.frag.y * (1 - blend) + block.base.y * blend;
              const currentZ = block.frag.z * (1 - blend) + block.base.z * blend;
              const currentRot = block.frag.rot * (1 - blend);

              const isConnected = blend > 0.6;

              return (
                <div
                  key={block.id}
                  className="absolute w-16 h-16 transition-all duration-300 pointer-events-none"
                  style={{
                    transform: `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateZ(${currentRot}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Top Face */}
                  <div
                    className={`absolute inset-0 border transition-all duration-300 ${
                      isConnected
                        ? 'bg-slate-900/90 border-cyan-400/80 shadow-[0_0_15px_rgba(25,211,230,0.3)]'
                        : 'bg-rose-950/40 border-rose-500/50'
                    }`}
                    style={{ transform: 'translateZ(32px)' }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[9px] font-mono opacity-80 font-bold text-slate-300">
                        {isConnected ? 'SYNC' : '×'}
                      </span>
                    </div>
                  </div>

                  {/* Front Face */}
                  <div
                    className={`absolute inset-0 border transition-all duration-300 ${
                      isConnected
                        ? 'bg-[#0E1726] border-cyan-600/60'
                        : 'bg-slate-950/70 border-rose-700/40'
                    }`}
                    style={{ transform: 'rotateX(-90deg) translateZ(32px)' }}
                  />

                  {/* Right Face */}
                  <div
                    className={`absolute inset-0 border transition-all duration-300 ${
                      isConnected
                        ? 'bg-[#070A12] border-blue-600/60'
                        : 'bg-black/80 border-rose-900/50'
                    }`}
                    style={{ transform: 'rotateY(90deg) translateZ(32px)' }}
                  />
                </div>
              );
            })}

            {/* Central Energy Core when connected */}
            {sliderValue > 50 && (
              <div 
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-400/20 blur-md animate-pulse"
                style={{ transform: 'translateZ(25px)' }}
              />
            )}
          </div>
        </div>

        {/* Center Interactive Circular Flip Button */}
        <button
          onClick={() => setSliderValue(sliderValue > 50 ? 10 : 90)}
          className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5722] to-[#FF8A65] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 active:scale-95 transition-transform"
          title="Toggle Architecture State"
          aria-label="Toggle architecture state between fragmented and focused"
        >
          <ArrowLeftRight className="w-5 h-5 transition-transform group-hover:rotate-180" />
        </button>

        {/* Bottom indicator text */}
        <div className="absolute bottom-3 text-[11px] font-mono text-slate-400 tracking-wider">
          {sliderValue > 50 ? '● INTEGRATED CUSTOM LOGIC' : '○ DISCONNECTED VENDOR SILOS'}
        </div>
      </div>

      {/* Interactive Interactive Slider Controller */}
      <div className="w-full max-w-md mt-6 flex flex-col space-y-2">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400">
          <span className={sliderValue <= 40 ? 'text-rose-400 font-bold' : ''}>01 // FRAGMENTED SAAS</span>
          <span className="text-cyan-400 font-semibold">{sliderValue}% TRANSFORMED</span>
          <span className={sliderValue >= 60 ? 'text-cyan-400 font-bold' : ''}>02 // VANTIXIO SYSTEM</span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF5722] focus:outline-none"
        />

        <p className="text-center text-[12px] text-slate-500 font-mono mt-1">
          Drag slider or tap the center button to inspect operational realignment
        </p>
      </div>
    </div>
  );
};
