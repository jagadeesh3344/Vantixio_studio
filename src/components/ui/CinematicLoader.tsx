import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'point' | 'line' | 'geometry' | 'brand' | 'done'>('point');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Skip on click or key press
    const handleSkip = () => {
      setPhase('done');
      onComplete();
    };

    window.addEventListener('click', handleSkip, { once: true });
    window.addEventListener('keydown', handleSkip, { once: true });

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 60);

    // Sequence stages (total ~1.5s)
    const t1 = setTimeout(() => setPhase('line'), 350);
    const t2 = setTimeout(() => setPhase('geometry'), 750);
    const t3 = setTimeout(() => setPhase('brand'), 1150);
    const t4 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1650);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[10000] bg-[#070A12] flex flex-col items-center justify-center pointer-events-auto select-none"
      >
        {/* Phase 1: Tiny point of light */}
        {phase === 'point' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.9] }}
            className="w-2 h-2 rounded-full bg-[#19D3E6] shadow-[0_0_24px_#19D3E6]"
          />
        )}

        {/* Phase 2: Expanding razor-thin architectural line */}
        {phase === 'line' && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#FF5722] to-transparent shadow-[0_0_12px_#FF5722]"
          />
        )}

        {/* Phase 3 & 4: Technical Geometry and Vantixio Wordmark */}
        {(phase === 'geometry' || phase === 'brand') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center space-y-4"
          >
            {/* Geometric diamond logo frame */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-cyan-500/40 rotate-45" />
              <div className="w-2.5 h-2.5 bg-[#FF5722] rotate-45" />
            </div>

            <div className="text-center space-y-1">
              <h1 className="font-display font-black text-2xl tracking-widest text-white uppercase">
                VANTIXIO
              </h1>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                STUDIO // BESPOKE SOFTWARE ENGINEERING
              </div>
            </div>

            {/* Progress counter */}
            <div className="pt-4 flex items-center space-x-2 text-[10px] font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>INITIALIZING SYSTEM // {Math.min(progress, 100)}%</span>
            </div>
          </motion.div>
        )}

        {/* Skip hint */}
        <div className="absolute bottom-6 text-[10px] font-mono text-slate-500 tracking-widest uppercase">
          CLICK OR SCROLL TO ENTER
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
