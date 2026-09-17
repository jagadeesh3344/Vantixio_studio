import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Shield, Terminal, ArrowRight } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#090F1E] border border-cyan-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            aria-label="Close story"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Eyebrow */}
          <div className="text-xs font-mono text-[#FF5722] uppercase tracking-widest mb-2 flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>THE VANTIXIO MANIFESTO</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Why We Founded Vantixio
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <p>
              Over the last decade, modern companies were told that the only way to scale was to buy twenty different subscription SaaS products. Each product claimed to solve a specific problem, but came with rigid interfaces and forced workflows.
            </p>
            <p>
              The result was not efficiency. The result was fragmentation: spreadsheets duct-taping databases, employees switching between 12 browser tabs, and valuable business logic locked in closed silos.
            </p>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 font-mono text-xs my-4">
              “There is no standard business. So there should be no standard software.”
            </div>
            <p>
              We built <strong>Vantixio</strong> to bring back the power of true craftsmanship in software engineering. We partner with ambitious organizations to architect, design, and engineer platforms that conform to your exact operating model.
            </p>
            <p>
              When software is engineered around you, work flows naturally. Teams move faster. Data stays unified. And you own an irreplaceable competitive moat.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              VANTIXIO ENGINEERING DIRECTORS
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white font-semibold text-xs transition-all shadow-md shadow-orange-600/30"
            >
              <span>Build With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
