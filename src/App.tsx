/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InteractiveBackground } from './components/background/InteractiveBackground';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { CorePropositionSection } from './components/sections/CorePropositionSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
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

export default function App() {
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);

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
      {/* Dynamic Global Background System */}
      <InteractiveBackground blueprintMode={blueprintMode} />

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
        {/* Hero Section */}
        <HeroSection
          onOpenContact={() => handleOpenContact('General Custom Build')}
          onOpenStory={() => setStoryModalOpen(true)}
        />

        {/* 01 / The Core Proposition */}
        <CorePropositionSection />

        {/* 02 / Capabilities */}
        <CapabilitiesSection onOpenContact={(cap) => handleOpenContact(cap)} />

        {/* 03 / The Vantixio Standard */}
        <VantixioStandardSection />

        {/* 04 / The Process */}
        <ProcessSection />

        {/* Signature Interactive Engine: Your Business -> Vantixio -> Your Software */}
        <SignatureTransformationSection onOpenContact={() => handleOpenContact('Interactive Pipeline Blueprint')} />

        {/* 05 / Operational Transformation */}
        <TransformationSection onOpenContact={() => handleOpenContact('Operational Transformation')} />

        {/* 06 / Technology & Philosophy */}
        <TechnologySection />

        {/* 07 / Who We Build For */}
        <WhoWeBuildForSection onOpenContact={(profile) => handleOpenContact(profile)} />

        {/* 08 / Why Vantixio */}
        <WhyVantixioSection />

        {/* 07 / Real People. Real Impact. */}
        <TestimonialsSection />

        {/* Final Call to Action & Interactive Scope Estimator */}
        <FinalCTASection
          initialCategory={contactPrefill}
          onOpenContactModal={() => handleOpenContact()}
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

