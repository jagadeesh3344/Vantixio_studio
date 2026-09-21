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
import { CorePropositionSection } from './components/sections/CorePropositionSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { VantixioStandardSection } from './components/sections/VantixioStandardSection';
import { TransformationSection } from './components/sections/TransformationSection';
import { ClientWorldsSection } from './components/sections/ClientWorldsSection';
import { ConvergenceSection } from './components/sections/ConvergenceSection';
import { Footer } from './components/sections/Footer';
import { StoryModal } from './components/modals/StoryModal';
import { ContactModal } from './components/modals/ContactModal';

// Exactly 7 Major Scroll Worlds
const WORLD_ANCHORS = [
  'hero',           // 0: Hero Opening (Software. Built Around You.)
  'problem',        // 1: The Problem (Forces You to Adapt vs. Flips the Model)
  'capabilities',   // 2: What Vantixio Builds (Capabilities + Practical Tech Philosophy)
  'architecture',   // 3: Vantixio Architecture (5 Pillars + 6-Stage Process)
  'work',           // 4: Proven Impact (Ashtonava & YesDhobi)
  'transformation', // 5: The Transformation Event (Dimensional World Morph: Complexity In, Engineered Clarity Out)
  'contact',        // 6: Convergence (Client Profiles, 5 Craftsmanship Principles & Final Manifesto)
];

const WORLD_NAMES: WorldSection[] = [
  'hero',
  'problem',
  'capabilities',
  'architecture',
  'work',
  'transformation',
  'convergence',
];

export default function App() {
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);

  // Persistent WebGL World State (Continuous Floating Journey across 7 Worlds)
  const [activeWorld, setActiveWorld] = useState<WorldSection>('hero');
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
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

  // Continuous Section Tracking for Single Persistent WebGL Journey
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
              centers.push((i / (WORLD_ANCHORS.length - 1)) * (docHeight || 5000));
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

          const worldIdx = Math.max(0, Math.min(Math.floor(prog + 0.4), WORLD_NAMES.length - 1));
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
      
      {/* 00. Cinematic Introductory Entrance */}
      {!loaderComplete && (
        <CinematicLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* 00. Subtle Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 00. Persistent Single-Canvas WebGL World (Continuous Floating World) */}
      <VantixioWorld
        activeSection={activeWorld}
        continuousProgress={continuousProgress}
        sectionProgress={sectionProgress}
        globalScrollProgress={globalScrollProgress}
        activeCapability={activeCapability}
        formSubmitted={formSubmitted}
        reducedMotion={reducedMotion}
      />

      {/* Blueprint Grid Technical Overlay if active */}
      {blueprintMode && (
        <div className="fixed inset-0 z-40 pointer-events-none border-[12px] border-cyan-500/20">
          <div className="absolute top-2 left-4 text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SYSTEM BLUEPRINT OVERLAY // ACTIVE GRID MATRIX 40px
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
            RESOLUTION: DETERMINISTIC // ZERO RIGID SAAS
          </div>
        </div>
      )}

      {/* Floating Interactive Navbar */}
      <Navbar
        blueprintMode={blueprintMode}
        onToggleBlueprint={() => setBlueprintMode(!blueprintMode)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Experience Stream - 7 Major Continuous Scroll Worlds */}
      <main className="relative z-10">
        
        {/* WORLD 01: HERO — Software. Built Around You. */}
        <HeroSection
          onOpenContact={() => handleOpenContact('General Custom Build')}
          onOpenStory={() => setStoryModalOpen(true)}
        />

        {/* WORLD 02: THE PROBLEM — Most Software Forces You to Adapt. Vantixio Flips the Model. */}
        <CorePropositionSection />

        {/* WORLD 03: WHAT VANTIXIO BUILDS — Capabilities & Practical Technology Outcomes */}
        <CapabilitiesSection
          onOpenContact={(cap) => handleOpenContact(cap)}
          onHoverCapability={(capId) => setActiveCapability(capId)}
        />

        {/* WORLD 04: THE VANTIXIO ARCHITECTURE — 5 Pillars & 6-Stage Deliberate Engineering Process */}
        <VantixioStandardSection />

        {/* WORLD 05: PROVEN IMPACT — Ashtonava & YesDhobi */}
        <ClientWorldsSection
          onOpenContact={(project) => handleOpenContact(project)}
        />

        {/* WORLD 06: THE TRANSFORMATION EVENT — Gravitational Singularity (Complexity In, Structured Clarity Out) */}
        <TransformationSection onOpenContact={() => handleOpenContact('Operational Transformation')} />

        {/* WORLD 07: CONVERGENCE — Client Profiles, 5 Engineering Principles & Final Manifesto / Contact */}
        <ConvergenceSection
          initialCategory={contactPrefill}
          onOpenContactModal={() => handleOpenContact()}
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
