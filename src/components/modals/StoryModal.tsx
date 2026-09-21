import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal, ArrowRight } from 'lucide-react';

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
          className="relative w-full max-w-2xl bg-[#090F1E] border border-cyan-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden"
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
            What would you build if software had no limits?
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <p className="text-base text-white font-medium">
              You bring the problem. We build the answer.
            </p>
            <div className="space-y-1 font-mono text-xs text-cyan-300">
              <div>• Not a template.</div>
              <div>• Not a compromise.</div>
              <div>• Not software you have to adapt yourself to.</div>
            </div>
            <p>
              Most software forces you to adapt your workflows, compromise on functionality, and settle for rigid off-the-shelf constraints.
            </p>
            <p>
              At Vantixio, we flip the model: software engineered around you. Tell us what your business needs, and we will architect and build what the software should be.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              VANTIXIO CUSTOM ENGINEERING
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-600/30"
            >
              <span>LET'S BUILD IT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
