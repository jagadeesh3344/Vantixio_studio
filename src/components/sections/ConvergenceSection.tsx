import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, Building2, Shield, Sparkles, ArrowRight, CheckCircle2, 
  Send, ShieldCheck, Clock, Calendar, Phone, User, HelpCircle, Check
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { CLIENT_PROFILES, PRINCIPLES } from '../../data/siteData';
import { ClientProfile, PrincipleItem } from '../../types';

interface ConvergenceSectionProps {
  initialCategory?: string;
  onOpenContactModal: () => void;
  onFormSubmitted?: () => void;
}

export const ConvergenceSection: React.FC<ConvergenceSectionProps> = ({
  initialCategory,
  onOpenContactModal,
  onFormSubmitted,
}) => {
  const [activeProfile, setActiveProfile] = useState<ClientProfile>(CLIENT_PROFILES[0]);
  const [activePrinciple, setActivePrinciple] = useState<PrincipleItem>(PRINCIPLES[0]);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedType, setSelectedType] = useState(initialCategory || 'Custom Web Application');
  const [selectedTimeline, setSelectedTimeline] = useState('4-8 weeks');
  const [notes, setNotes] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('10:00 AM EST');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    if (onFormSubmitted) {
      onFormSubmitted();
    }
  };

  const getProfileIcon = (id: string) => {
    switch (id) {
      case 'startups': return <Rocket className="w-5 h-5 text-cyan-400" />;
      case 'smes': return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'enterprises': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'brands': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Rocket className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div id="convergence" className="relative border-t border-slate-800/80">
      
      {/* 1. WHO WE BUILD FOR */}
      <section id="who-we-build-for" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="07"
            category="WHO WE BUILD FOR"
            title="Engineered for Ambitious Organizations"
            titleAccent="of Every Scale."
            subtitle="From visionary zero-to-one startups to high-throughput enterprises."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENT_PROFILES.map((profile) => {
              const isSelected = activeProfile.id === profile.id;
              return (
                <div
                  key={profile.id}
                  onClick={() => setActiveProfile(profile)}
                  className={`group relative p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border atmospheric-clear-soft rounded-2xl ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-950/30 -translate-y-1'
                      : 'border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-1.5 rounded border border-slate-700/60">
                      {getProfileIcon(profile.id)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      {profile.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {profile.headline}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                      {profile.subheadline}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FF5722] flex items-center space-x-1">
                      <span>Select profile</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-slate-500">{isSelected ? '● ACTIVE' : '○'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. WHY VANTIXIO (FIVE PRINCIPLES) */}
      <section id="why-vantixio" className="relative py-20 md:py-28 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="07B"
            category="WHY VANTIXIO"
            title="Software Should Feel Like It Was Made for You."
            titleAccent="That Feeling Is the Product."
            subtitle="Five core engineering principles that separate handcrafted bespoke software from disposable SaaS."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Principles List */}
            <div className="lg:col-span-7 space-y-3">
              {PRINCIPLES.map((principle) => {
                const isActive = activePrinciple.id === principle.id;
                return (
                  <div
                    key={principle.id}
                    onMouseEnter={() => setActivePrinciple(principle)}
                    onClick={() => setActivePrinciple(principle)}
                    className={`group relative p-4 transition-all duration-300 cursor-pointer border atmospheric-clear-soft rounded-xl flex items-center justify-between ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/30 translate-x-1.5'
                        : 'border-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-sm transition-all ${
                        isActive ? 'bg-[#FF5722] shadow-[0_0_12px_#FF5722] scale-125' : 'bg-slate-700 group-hover:bg-[#FF5722]/50'
                      }`} />
                      <div>
                        <div className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors uppercase">
                          {principle.title}
                        </div>
                        <div className="text-sm sm:text-base font-display font-semibold text-white mt-0.5">
                          {principle.tagline}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      0{principle.number}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right Principle Breakdown */}
            <div className="lg:col-span-5 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
                  PRINCIPLE 0{activePrinciple.number} // CRAFTSMANSHIP
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {activePrinciple.title}
                </h3>
                <div className="text-sm font-mono text-[#FF5722] font-semibold mb-4">
                  {activePrinciple.tagline}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {activePrinciple.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/70 text-xs font-mono text-slate-400">
                <span className="text-white font-semibold">THE VANTIXIO PROMISE:</span> No rigid templates. No throwaway scaffolding. 100% custom software engineered for longevity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FINAL MANIFESTO & INTERACTIVE CONTACT */}
      <section id="contact" className="relative py-24 md:py-32 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Final Manifesto Statement */}
            <div className="lg:col-span-5 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-slate-800/80 lg:sticky lg:top-28">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#FF5722] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-ping" />
                <span>FINAL MANIFESTO // CONVERGENCE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white tracking-tight leading-[1.08]">
                What would you build <br />
                <span className="font-serif italic font-normal text-slate-100">if software had</span> <br />
                <span className="text-[#FF5722] relative inline-block font-display">
                  no limits?
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FF5722]/40 rounded-full" />
                </span>
              </h2>

              <p className="mt-6 text-xl sm:text-2xl text-white font-display font-semibold">
                “You bring the problem. We build the answer.”
              </p>

              <div className="mt-4 space-y-1 text-xs font-mono text-cyan-300/90">
                <div>• Not a template.</div>
                <div>• Not a compromise.</div>
                <div>• Not software you have to adapt yourself to.</div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tell us what your business needs. We'll figure out what the software should be.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenContactModal}
                  className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs tracking-widest uppercase shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>LET’S BUILD IT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 px-3 py-2 rounded-full border border-slate-800 bg-slate-900/50">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>100% Client IP Ownership</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Scope Configurator Form */}
            <div className="lg:col-span-7 atmospheric-clear-soft rounded-3xl p-6 sm:p-8 border border-slate-800/80">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                INITIATE PARTNERSHIP // PROJECT SCOPING
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Tell Us What You Want to Build.
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-400/50 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white">
                    Transmission Received.
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    We have logged your specifications. An engineering architect will review your requirements and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">WORK EMAIL</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@enterprise.com"
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5722]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">ORGANIZATION</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company or Project Name"
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">PROJECT TYPE</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5722]"
                      >
                        <option value="Custom Web Application">Custom Web Application</option>
                        <option value="Mobile Product">Mobile Product</option>
                        <option value="Internal Business System">Internal Business System</option>
                        <option value="AI Integration & Tooling">AI Integration & Tooling</option>
                        <option value="API & Systems Integration">API & Systems Integration</option>
                        <option value="Workflow Automation">Workflow Automation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">TELL US ABOUT THE PROBLEM OR VISION</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe your current friction, workflow, or what you want to achieve..."
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-orange-600/30 transition-all"
                  >
                    Submit Project Scope // Request Architect Review
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
