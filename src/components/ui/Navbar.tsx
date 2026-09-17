import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X, Cpu, Compass, Layers, ShieldCheck } from 'lucide-react';
import { NAV_LINKS } from '../../data/siteData';
import { TypographySelector } from './TypographySelector';

interface NavbarProps {
  blueprintMode: boolean;
  onToggleBlueprint: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ blueprintMode, onToggleBlueprint, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'problem', 'capabilities', 'standard', 'process', 'transformation', 'technology', 'who-we-build-for', 'why-vantixio', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070A12]/85 backdrop-blur-xl border-b border-slate-800/80 py-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: VANTIXIO Logo / Wordmark */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center space-x-2.5 group"
          aria-label="Vantixio Home"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 via-[#0D1324] to-slate-950 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(25,211,230,0.25)] group-hover:border-orange-500/80 transition-colors">
            {/* Custom geometric logo icon matching Vantixio brand */}
            <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 rotate-45 group-hover:border-[#FF5722] transition-colors" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FF5722] -bottom-0.5 -right-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-slate-200 transition-colors">
              VANTIXIO
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#0D1324]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/70 text-sm">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium tracking-wide ${
                  isActive
                    ? 'text-white bg-slate-800/90 shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Area: Typography, Blueprint Mode & CTA */}
        <div className="hidden sm:flex items-center space-x-2.5">
          {/* Typography Preset Selector (Classy, Unique & Attractive) */}
          <TypographySelector />

          {/* Blueprint Mode Switcher */}
          <button
            onClick={onToggleBlueprint}
            className={`p-2 rounded-full border text-xs font-mono flex items-center space-x-1.5 transition-all ${
              blueprintMode
                ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(25,211,230,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700'
            }`}
            title="Toggle Blueprint Inspection Overlay"
            aria-label="Toggle blueprint inspection mode"
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10px] hidden lg:inline">
              {blueprintMode ? 'BLUEPRINT ON' : 'BLUEPRINT'}
            </span>
          </button>

          {/* Main Primary CTA Button */}
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-semibold tracking-wide shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Let's Build It</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Application Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070A12]/95 backdrop-blur-2xl border-b border-slate-800 overflow-hidden px-5 py-6"
          >
            <div className="space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase pb-1 border-b border-slate-900">
                NAVIGATION ARCHITECTURE
              </div>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2.5 text-base font-heading font-medium text-slate-200 hover:text-cyan-400 border-b border-slate-900/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 flex flex-col space-y-3">
                <div className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-800 bg-slate-900/40">
                  <span className="text-xs font-mono text-slate-400">CLASSY TYPOGRAPHY:</span>
                  <TypographySelector />
                </div>

                <button
                  onClick={() => {
                    onToggleBlueprint();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg border border-cyan-800/40 bg-cyan-950/20 text-cyan-300 text-xs font-mono"
                >
                  <Compass className="w-4 h-4" />
                  <span>{blueprintMode ? 'DISABLE BLUEPRINT MODE' : 'ENABLE BLUEPRINT MODE'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#FF5722] text-white font-semibold text-sm shadow-lg shadow-orange-600/30"
                >
                  <span>Let's Build It</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
