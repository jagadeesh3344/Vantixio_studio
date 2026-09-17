import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulsePhase: number;
}

interface InteractiveBackgroundProps {
  blueprintMode?: boolean;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ blueprintMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const particleCount = reducedMotion ? 12 : isMobile ? 22 : 48;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.4),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.4),
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let pulseTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      pulseTimer += 0.02;

      // Draw subtle interactive cursor glow
      const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, isMobile ? 180 : 380);
      if (blueprintMode) {
        cursorGlow.addColorStop(0, 'rgba(25, 211, 230, 0.12)');
        cursorGlow.addColorStop(0.5, 'rgba(25, 211, 230, 0.03)');
        cursorGlow.addColorStop(1, 'rgba(25, 211, 230, 0)');
      } else {
        cursorGlow.addColorStop(0, 'rgba(255, 87, 34, 0.07)');
        cursorGlow.addColorStop(0.4, 'rgba(37, 99, 235, 0.04)');
        cursorGlow.addColorStop(1, 'rgba(7, 10, 18, 0)');
      }
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles with technical connection lines
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle mouse displacement
          const dx = p.x - mx;
          const dy = p.y - my;
          const distMouse = Math.sqrt(dx * dx + dy * dy);
          if (distMouse < 140 && distMouse > 1) {
            const force = (140 - distMouse) / 140;
            p.x += (dx / distMouse) * force * 0.8;
            p.y += (dy / distMouse) * force * 0.8;
          }

          // Screen wrap
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const currentAlpha = p.alpha + Math.sin(pulseTimer + p.pulsePhase) * 0.15;
        const boundedAlpha = Math.max(0.05, Math.min(0.6, currentAlpha));

        ctx.fillStyle = blueprintMode ? `rgba(25, 211, 230, ${boundedAlpha})` : `rgba(220, 230, 255, ${boundedAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Technical crosshair on some particles
        if (i % 5 === 0 && !isMobile) {
          ctx.strokeStyle = blueprintMode ? `rgba(25, 211, 230, ${boundedAlpha * 0.3})` : `rgba(255, 87, 34, ${boundedAlpha * 0.25})`;
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y);
          ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4);
          ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
        }

        // Draw connecting lines between nearby points
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = isMobile ? 90 : 130;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = blueprintMode
              ? `rgba(25, 211, 230, ${lineAlpha})`
              : `rgba(70, 110, 180, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, blueprintMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Canvas Particles & Mouse Light */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle blueprint grid overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          blueprintMode 
            ? 'opacity-40 bg-blueprint-grid' 
            : 'opacity-20 bg-blueprint-grid'
        }`} 
      />

      {/* Subtle perspective grid floor near bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-25 overflow-hidden">
        <div className="w-[140%] -ml-[20%] h-full bg-perspective-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/80 to-transparent" />
      </div>

      {/* Subtle technical crosshair badges in corners */}
      <div className="absolute top-28 left-6 text-[10px] font-mono tracking-widest text-cyan-400/20 hidden lg:block select-none">
        SYS.GEO [37.7749° N, 122.4194° W] // CORE.VANTIXIO.NET
      </div>
      <div className="absolute top-28 right-6 text-[10px] font-mono tracking-widest text-slate-500/20 hidden lg:block select-none">
        STATUS // 0.00ms JITTER // 100% TAILORED
      </div>

      {/* Blueprint Mode Technical Watermark */}
      {blueprintMode && (
        <div className="absolute bottom-6 left-6 text-[11px] font-mono tracking-wider text-cyan-400/40 bg-cyan-950/30 px-3 py-1 border border-cyan-800/30 rounded">
          ● BLUEPRINT INSPECTION VIEW ACTIVE — ARCHITECTURE MAPPING MODE
        </div>
      )}
    </div>
  );
};
