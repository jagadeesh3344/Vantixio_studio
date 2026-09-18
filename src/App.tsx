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
import { ClientWorldsSection } from './components/sections/ClientWorldsSection';
import { VantixioStandardSection } from './components/sections/VantixioStandardSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { SignatureTransformationSection } from './components/sections/SignatureTransformationSection';
import { TransformationSection } from './components/sections/TransformationSection';
import { TechnologySection } from './components/sections/TechnologySection';
import { WhoWeBuildForSection } from './components/sections/WhoWeBuildForSection';
import { WhyVantixioSection } from './components/sections/WhyVantixioSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { Footer } from './components/sections/Footer';
import { StoryModal } from './components/modals/StoryModal';
import { ContactModal } from './components/modals/ContactModal';

const WORLD_ANCHORS = [
  'hero',           // 0: Tech Monument
  'capabilities',   // 1: Digital Network
  'ashtonava',      // 2: Luxury Commerce (Work 1) [Black hole transition at 1.0 -> 2.0]
  'yesdhobi',       // 3: Business Operations (Work 2)
  'process',        // 4: Engineering World
  'standard',       // 5: Minimal World (About)
  'contact',        // 6: Convergence
];

const WORLD_NAMES: WorldSection[] = [
  'hero',
  'services',
  'ashtonava',
  'yesdhobi',
  'process',
  'about',
  'contact',
];

export default function App() {
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);

  // Persistent WebGL World State (Continuous Floating Journey)
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

          // Get vertical center of each anchor element
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

      {/* 00. Persistent Single-Canvas WebGL World (8 Chapters, Continuous Floating World) */}
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

      {/* Main Experience Stream */}
      <main className="relative z-10">
        
        {/* Chapter 01 — HERO: Digital Future */}
        <HeroSection
          onOpenContact={() => handleOpenContact('General Custom Build')}
          onOpenStory={() => setStoryModalOpen(true)}
        />

        {/* 01 / The Core Proposition */}
        <CorePropositionSection />

        {/* Chapter 02 — SERVICES: Technology Network */}
        <CapabilitiesSection
          onOpenContact={(cap) => handleOpenContact(cap)}
          onHoverCapability={(capId) => setActiveCapability(capId)}
        />

        {/* Chapters 03, 04 — CLIENT WORLDS: Ashtonava, YesDhobi */}
        <ClientWorldsSection
          onOpenContact={(project) => handleOpenContact(project)}
        />

        {/* Chapter 06 — PROCESS: Engineering World */}
        <ProcessSection />

        {/* Signature Interactive Engine: Your Business -> Vantixio -> Your Software */}
        <SignatureTransformationSection onOpenContact={() => handleOpenContact('Interactive Pipeline Blueprint')} />

        {/* Operational Transformation */}
        <TransformationSection onOpenContact={() => handleOpenContact('Operational Transformation')} />

        {/* Technology & Philosophy */}
        <TechnologySection />

        {/* Chapter 07 — ABOUT: Human / Purpose / The Vantixio Standard */}
        <VantixioStandardSection />

        {/* Who We Build For */}
        <WhoWeBuildForSection onOpenContact={(profile) => handleOpenContact(profile)} />

        {/* Why Vantixio */}
        <WhyVantixioSection />

        {/* Real People. Real Impact. */}
        <TestimonialsSection />

        {/* Chapter 08 — CONTACT: Convergence */}
        <FinalCTASection
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
