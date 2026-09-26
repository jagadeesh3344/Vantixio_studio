import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  blueprintMode?: boolean;
  onToggleBlueprint?: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollYRef = useRef(0);

  // Scroll-directional behavior: hides naturally on scroll down, smoothly re-enters on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY < 40) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 6 && currentScrollY > 100) {
        // Scrolling DOWN -> navbar travels away with the world
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 6) {
        // Scrolling UP -> navbar smoothly re-enters
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Active section check
      const sections = ['hero', 'idea', 'capabilities', 'work', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
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

  const navItems = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'CAPABILITIES', href: '#capabilities', id: 'capabilities' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 flex items-center justify-between">
        
        {/* Left: VANTIXIO Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center space-x-2 group focus:outline-none"
          aria-label="Vantixio Home"
        >
          {/* Micro-architectural mark */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="w-2 h-2 border-t border-l border-cyan-400 group-hover:scale-125 transition-transform" />
            <span className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-[#FF5722]" />
          </div>
          <span className="font-display font-bold text-lg tracking-[0.16em] text-white group-hover:text-cyan-300 transition-colors">
            VANTIXIO
          </span>
        </a>

        {/* Center: Minimal Architectural Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 transition-colors group flex items-center space-x-1.5 ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {/* Architectural Micro-interaction on hover: node translates and structural hairline extends */}
                <span
                  className={`w-1 h-1 rounded-none transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-400 scale-100'
                      : 'bg-transparent group-hover:bg-[#FF5722] group-hover:rotate-45'
                  }`}
                />
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent group-hover:w-full transition-all duration-300 pointer-events-none" />
              </a>
            );
          })}
        </nav>

        {/* Right Area: Minimal CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center space-x-2 px-5 py-2 text-xs font-mono tracking-wider uppercase text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-400/80 rounded transition-all hover:scale-[1.02] active:scale-95"
          >
            {/* Tiny structural node */}
            <span className="w-1.5 h-1.5 bg-[#FF5722] group-hover:bg-cyan-400 transition-colors" />
            <span>START A CONVERSATION</span>
            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#070A12]/95 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-6 space-y-4 font-mono text-xs tracking-widest"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-2 text-slate-300 hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 bg-[#FF5722] text-white font-semibold text-center uppercase tracking-widest rounded"
              >
                START A CONVERSATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
