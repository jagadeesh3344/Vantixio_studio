import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send, CheckCircle2, Sparkles, ShieldCheck, Clock, Calendar, Phone, Building2, User, HelpCircle } from 'lucide-react';

interface FinalCTASectionProps {
  initialCategory?: string;
  onOpenContactModal: () => void;
  onFormSubmitted?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ 
  initialCategory, 
  onOpenContactModal,
  onFormSubmitted 
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedType, setSelectedType] = useState(initialCategory || 'Web Platform');
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

  return (
    <section id="contact" className="relative py-24 md:py-36 border-t border-slate-800/80 bg-transparent overflow-hidden">
      {/* Background radiant ambient convergence light */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#FF5722]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Call to Action + Right Architectural Interactive Scope Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Architectural Statement & Direct Actions */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#FF5722] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-ping" />
              <span>CHAPTER 08 // CONVERGENCE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display text-white tracking-tight leading-[1.08]">
              Ready to Build <br />
              <span className="font-serif italic font-normal text-slate-100">Something Made</span> <br />
              <span className="text-[#FF5722] relative inline-block font-display">
                Just for You?
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FF5722]/40 rounded-full" />
              </span>
            </h2>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 font-heading font-medium">
              “You bring the problem. We build the answer.”
            </p>

            <p className="mt-2 text-sm text-slate-400 max-w-md leading-relaxed">
              No rigid templates. No forced workflows. Schedule a technical architecture session with our engineering directors. All systems converge here.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContactModal}
                className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-xs tracking-wider uppercase shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Fast Modal Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>NDA & Direct Partner Access</span>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="text-white font-bold block mb-1">AVERAGE KICKOFF</span>
                <span>Within 5 business days</span>
              </div>
              <div>
                <span className="text-white font-bold block mb-1">CODE OWNERSHIP</span>
                <span>100% Client IP Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Interactive Scope & Meeting Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#090F1E]/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-black/80 relative">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>CONVERGENCE INQUIRY & ARCHITECTURE BOOKING</span>
                <span className="text-[10px] text-slate-500">SYSTEM v2.5</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Define Your Architecture & Meeting
              </h3>

              {submitted ? (
                <div className="p-8 rounded-xl bg-cyan-950/30 border border-cyan-400/50 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white">Discovery Blueprint Initiated</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto font-mono leading-relaxed">
                    Thank you, <span className="text-white font-bold">{name || 'Partner'}</span>. We have scheduled your discovery session for <span className="text-cyan-300 font-bold">{meetingDate || 'upcoming week'} at {meetingTime}</span> for your <span className="text-[#FF5722] font-bold">{selectedType}</span>. Confirmation sent to <span className="text-white underline">{email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-mono text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Name <span className="text-[#FF5722]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Devin Vance"
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Work Email <span className="text-[#FF5722]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="devin@enterprise.com"
                        className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Company / Organization
                      </label>
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Global Inc"
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 019-2834"
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* What do you want to build? */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-2">
                      What do you want to build? <span className="text-[#FF5722]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Web Platform', 'Mobile App', 'AI Copilot', 'ERP & Ops', 'API Sync', 'Bespoke Tool'].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`p-2 rounded-lg border text-xs font-mono text-center transition-all ${
                            selectedType === type
                              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Timeframe (Preserved from existing) */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-2">
                      Target Timeframe
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['4-8 weeks', '8-16 weeks', 'Flexible'].map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTimeline(time)}
                          className={`p-1.5 rounded-lg border text-xs font-mono text-center transition-all ${
                            selectedTimeline === time
                              ? 'bg-[#FF5722]/20 border-[#FF5722] text-orange-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project description */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                      Project description / Problem to solve <span className="text-[#FF5722]">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe what your custom software needs to accomplish, your current friction, or architecture vision..."
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Meeting Date & Meeting Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-800/80">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Preferred Meeting Date
                      </label>
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Preferred Meeting Time
                      </label>
                      <select
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="09:00 AM EST">09:00 AM EST</option>
                        <option value="10:00 AM EST">10:00 AM EST</option>
                        <option value="11:30 AM EST">11:30 AM EST</option>
                        <option value="01:00 PM EST">01:00 PM EST</option>
                        <option value="02:30 PM EST">02:30 PM EST</option>
                        <option value="04:00 PM EST">04:00 PM EST</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs font-mono tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.01]"
                  >
                    <span>Confirm Architecture & Meeting Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
