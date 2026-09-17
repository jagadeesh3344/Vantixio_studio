import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Positioning Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D1324] border border-cyan-500/40 flex items-center justify-center">
                <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 rotate-45" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                VANTIXIO
              </span>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              Software. Built Around You.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-mono">
              Custom software engineering firm that builds software around the exact way a business works instead of forcing businesses into rigid pre-built SaaS templates.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-400">ENGINEERING STATUS: DEPLOY READY</span>
            </div>
          </div>

          {/* Column 1: Capabilities */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              CAPABILITIES
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#capabilities" className="hover:text-cyan-300 transition-colors">Custom Web Platforms</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-300 transition-colors">Native Mobile Apps</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-300 transition-colors">Business Operating Systems</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-300 transition-colors">AI Copilots & Agents</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-300 transition-colors">API & Legacy Integrations</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-300 transition-colors">Workflow Automation</a></li>
            </ul>
          </div>

          {/* Column 2: Standard & Process */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              ARCHITECTURE
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#standard" className="hover:text-cyan-300 transition-colors">The 5 Vantixio Pillars</a></li>
              <li><a href="#process" className="hover:text-cyan-300 transition-colors">Six-Stage Engineering</a></li>
              <li><a href="#transformation" className="hover:text-cyan-300 transition-colors">Chaos Reconciliation</a></li>
              <li><a href="#technology" className="hover:text-cyan-300 transition-colors">Deterministic Tech Stack</a></li>
              <li><a href="#who-we-build-for" className="hover:text-cyan-300 transition-colors">Enterprise Security</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              GET IN TOUCH
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li className="text-slate-300">hello@vantixio.com</li>
              <li className="text-slate-400">Enterprise Engineering Guild</li>
              <li className="text-slate-400">San Francisco & London</li>
              <li className="pt-2"><a href="#contact" className="text-[#FF5722] hover:underline font-semibold">Start Discovery Call →</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom System Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} Vantixio Engineering Corp. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400">“You bring the problem. We build the answer.”</span>
          </div>

          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
