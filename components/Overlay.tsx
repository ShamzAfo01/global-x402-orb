
import React from 'react';
import { Partner } from '../types';
import { Info, X, Zap, Globe, Cpu } from 'lucide-react';

interface OverlayProps {
  selectedPartner: Partner | null;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ selectedPartner, onClose }) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20">
      {/* Header */}
      <div className="pointer-events-auto flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-blue-200 shadow-sm">
          <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
          <span className="font-bold text-blue-900 tracking-tight text-lg">X402 ECOSYSTEM</span>
        </div>
        <p className="text-blue-900/70 text-sm max-w-xs font-semibold bg-white/30 px-4 py-1 rounded-full backdrop-blur-sm mt-2 border border-white/50">
          Agentic Commerce Infrastructure
        </p>
      </div>

      {/* Center Detail Panel */}
      {selectedPartner && (
        <div className="pointer-events-auto self-center max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="bg-white/80 backdrop-blur-2xl border border-blue-100 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-blue-100 rounded-full transition-colors text-blue-400 hover:text-blue-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-400/40">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedPartner.category}</span>
                <h2 className="text-3xl font-black text-blue-950 leading-tight">{selectedPartner.name}</h2>
              </div>
            </div>

            <p className="text-blue-950/80 leading-relaxed text-lg mb-8 font-medium">
              {selectedPartner.description}
            </p>

            <div className="flex gap-3 relative z-10">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-blue-500/40 active:scale-95">
                Connect
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-4 px-6 rounded-2xl transition-all">
                Details
              </button>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -bottom-8 -right-8 text-blue-500/5 rotate-12 group-hover:scale-110 transition-transform pointer-events-none">
              <Cpu className="w-56 h-56" />
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      {!selectedPartner && (
        <div className="pointer-events-auto self-end bg-white/60 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-blue-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white animate-pulse">
            <Info className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-blue-950 font-bold leading-none">Global Partner Orb</span>
            <span className="text-blue-900/60 text-xs font-medium">Explore 80 ecosystem bubbles • Zoom to view logos</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
