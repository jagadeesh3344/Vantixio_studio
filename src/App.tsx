/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VantixioWorld, WorldSection } from './components/webgl/VantixioWorld';
import { CustomCursor } from './components/ui/CustomCursor';
import { CinematicLoader } from './components/ui/CinematicLoader';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { IdeaSection } from './components/sections/IdeaSection';
import { WhatWeBuildSection } from './components/sections/WhatWeBuildSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { Footer } from './components/sections/Footer';
import { StoryModal } from './components/modals/StoryModal';
import { ContactModal } from './components/modals/ContactModal';

// Exactly 5 Major Scroll Experiences:
// 1. HERO
// 2. THE VANTIXIO IDEA
// 3. WHAT WE BUILD
// 4. SELECTED WORK
// 5. FINAL CTA
const WORLD_ANCHORS = [
  'hero',         // 0: Hero (Software. Built Around You.)
  'idea',         // 1: The Vantixio Idea (Forces You to Adapt vs. Flips the Model)
  'capabilities', // 2: What We Build (4 Core Functional Branches)
  'work',         // 3: Selected Work (Ashtonava Luxury & YesDhobi Logistics)
  'contact',      // 4: Final CTA (Let's Build Software That Fits)
];

const WORLD_NAMES: WorldSection[] = [
  'hero',
  'idea',
  'capabilities',
  'work',
  'cta',
];

export default function App() {
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);

  // Persistent WebGL World State (Continuous Floating Journey across 5 Experiences)
  const [activeWorld, setActiveWorld] = useState<WorldSection>('hero');
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [activeWorkProject, setActiveWorkProject] = useState<'ashtonava' | 'yesdhobi'>('ashtonava');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Continuous Section Tracking across 5 Major Worlds
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const gProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
          setGlobalScrollProgress(gProgress);

          // Calculate vertical center of each anchor element
          const centers: number[] = [];
          for (let i = 0; i < WORLD_ANCHORS.length; i++) {
            const el = document.getElementById(WORLD_ANCHORS[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              centers.push(rect.top + scrollY + rect.height * 0.45);
            } else {
              centers.push((i / (WORLD_ANCHORS.length - 1)) * (docHeight || 4000));
            }
          }

          const viewFocus = scrollY + window.innerHeight * 0.45;

          let prog = 0;
          if (viewFocus <= centers[0]) {
            prog = 0;
          } else if (viewFocus >= centers[centers.length - 1]) {
            prog = centers.length - 1;
          } else {
            for (let i = 0; i < centers.length - 1; i++) {
              if (viewFocus >= centers[i] && viewFocus < centers[i + 1]) {
                const span = centers[i + 1] - centers[i];
                const fraction = span > 0 ? (viewFocus - centers[i]) / span : 0;
                prog = i + fraction;
                break;
              }
            }
          }

          setContinuousProgress(prog);

          const worldIdx = Math.max(0, Math.min(Math.floor(prog + 0.45), WORLD_NAMES.length - 1));
          setActiveWorld(WORLD_NAMES[worldIdx]);
          setSectionProgress(prog % 1);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleOpenContact = (prefill?: string) => {
    setContactPrefill(prefill);
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
    setContactPrefill(undefined);
  };

  return (
    <div className={`min-h-screen text-slate-100 selection:bg-[#FF5722] selection:text-white relative font-sans ${blueprintMode ? 'blueprint-active' : ''}`}>
      
      {/* 00. Cinematic Entrance Loader */}
      {!loaderComplete && (
        <CinematicLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* 00. Custom Cursor */}
      <CustomCursor />

      {/* 00. Persistent Single-Canvas WebGL World (One Continuous Spatial Environment) */}
      <VantixioWorld
        activeSection={activeWorld}
        continuousProgress={continuousProgress}
        sectionProgress={sectionProgress}
        globalScrollProgress={globalScrollProgress}
        activeCapability={activeCapability}
        activeWorkProject={activeWorkProject}
        formSubmitted={formSubmitted}
        reducedMotion={reducedMotion}
      />

      {/* Blueprint Grid Technical Overlay if toggled */}
      {blueprintMode && (
        <div className="fixed inset-0 z-40 pointer-events-none border-[12px] border-cyan-500/20">
          <div className="absolute top-2 left-4 text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SYSTEM BLUEPRINT OVERLAY // CONTINUOUS SPATIAL PIPELINE
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
            VANTIXIO ARCHITECTURE // ZERO OFF-THE-SHELF RIGIDITY
          </div>
        </div>
      )}

      {/* Floating Interactive Navbar */}
      <Navbar
        blueprintMode={blueprintMode}
        onToggleBlueprint={() => setBlueprintMode(!blueprintMode)}
        onOpenContact={() => handleOpenContact('Navbar CTA')}
      />

      {/* Main Experience Stream - Exactly 5 Major Experiences */}
      <main className="relative z-10">
        
        {/* 1. HERO — Software. Built Around You. */}
        <HeroSection
          onOpenContact={() => handleOpenContact('Custom Build Initial')}
          onOpenStory={() => setStoryModalOpen(true)}
        />

        {/* 2. THE VANTIXIO IDEA — Most Software Forces You to Adapt. Vantixio Flips the Model. */}
        <IdeaSection
          onOpenContact={() => handleOpenContact('The Vantixio Model')}
        />

        {/* 3. WHAT WE BUILD — 4 Core Functional Branches */}
        <WhatWeBuildSection
          onOpenContact={(cap) => handleOpenContact(cap)}
          onHoverCapability={(capId) => setActiveCapability(capId)}
        />

        {/* 4. SELECTED WORK — Ashtonava Luxury & YesDhobi Logistics */}
        <SelectedWorkSection
          activeProject={activeWorkProject}
          onSelectProject={(proj) => setActiveWorkProject(proj)}
          onOpenContact={(proj) => handleOpenContact(proj)}
        />

        {/* 5. FINAL CTA — Let's Build Software That Fits. */}
        <FinalCTASection
          initialCategory={contactPrefill}
          onOpenContactModal={() => handleOpenContact('Final CTA Button')}
          onFormSubmitted={() => setFormSubmitted(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <StoryModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
        onOpenContact={() => handleOpenContact('Manifesto Story Follow-up')}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={handleCloseContact}
        prefillCategory={contactPrefill}
      />
    </div>
  );
}
