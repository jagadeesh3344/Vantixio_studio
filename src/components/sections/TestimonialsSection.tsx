import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/siteData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow matching image.png */}
        <div className="text-xs font-mono uppercase tracking-widest text-[#FF5722] mb-8">
          07 / REAL PEOPLE. REAL IMPACT.
        </div>

        {/* 3 Quotes Cards on Left + Results Box on Right (matching image.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: 3 Testimonial Quotes Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#0D1424] border-cyan-400/80 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-400/40'
                      : 'bg-[#080D1A]/90 hover:bg-[#0B1220] border-slate-800/80'
                  }`}
                >
                  <div>
                    <Quote className="w-5 h-5 text-slate-600 mb-3" />
                    <p className="text-sm text-slate-200 leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <div className="text-xs font-display font-bold text-white">
                      {item.author}
                    </div>
                    <div className="text-[11px] font-mono text-[#FF5722]">
                      {item.role}, {item.company}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400 mt-1">
                      {item.metrics}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: "Results that speak for themselves." Box matching image.png */}
          <div className="lg:col-span-4 rounded-2xl p-8 bg-[#070A12] border border-slate-800 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                PROVEN RETURN
              </span>
              <h3 className="text-3xl font-display font-bold text-white mt-2 leading-snug">
                Results that speak for themselves.
              </h3>
              <p className="mt-3 text-xs text-slate-400 font-mono">
                No vanity features. Only software that saves hours and makes companies faster.
              </p>
            </div>

            {/* Navigation Arrows matching image.png */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400">
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
