import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'open'>('default');
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const posRef = useRef({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
  });

  useEffect(() => {
    // Only enable for desktop pointer devices with no reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      // Determine hover target state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view') {
        setCursorType('view');
      } else if (cursorAttr === 'open') {
        setCursorType('open');
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;
    const update = () => {
      // Smooth ring lerp
      posRef.current.ringX += (posRef.current.x - posRef.current.ringX) * 0.18;
      posRef.current.ringY += (posRef.current.y - posRef.current.ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.ringX}px, ${posRef.current.ringY}px, 0)`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#FF5722] transition-opacity duration-200"
      />

      {/* Trailing Elegant Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 transition-all duration-200 ease-out flex items-center justify-center ${
          cursorType === 'view'
            ? '-ml-6 -mt-6 w-12 h-12 rounded-full bg-[#FF5722]/15 border border-[#FF5722] backdrop-blur-xs'
            : cursorType === 'open'
              ? '-ml-6 -mt-6 w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-400 backdrop-blur-xs'
              : cursorType === 'pointer'
                ? '-ml-4 -mt-4 w-8 h-8 rounded-full border border-slate-300/60'
                : '-ml-3 -mt-3 w-6 h-6 rounded-full border border-slate-500/30'
        }`}
      >
        {cursorType === 'view' && (
          <span className="text-[8px] font-mono font-bold tracking-widest text-white uppercase">
            VIEW
          </span>
        )}
        {cursorType === 'open' && (
          <span className="text-[8px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            OPEN
          </span>
        )}
      </div>
    </div>
  );
};
