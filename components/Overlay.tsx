
import React from 'react';
import { Partner } from '../types';
import { Info, X, Zap, Globe, Cpu, Play, Navigation } from 'lucide-react';

interface OverlayProps {
  selectedPartner: Partner | null;
  onClose: () => void;
  isLaunched: boolean;
  onLaunch: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ selectedPartner, onClose, isLaunched, onLaunch }) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20">
      {/* Header */}
      <div className="pointer-events-auto flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-blue-500/20 shadow-lg">
          <Zap className="w-5 h-5 text-blue-400 fill-blue-400" />
          <span className="font-black text-white tracking-widest text-sm uppercase">X402 // AGENTIC.SIM</span>
        </div>
      </div>

      {/* Intro State */}
      {!isLaunched && !selectedPartner && (
        <div className="pointer-events-auto self-center flex flex-col items-center text-center max-w-xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="w-24 h-24 mb-8 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
            <Globe className="w-full h-full text-blue-500 relative z-10" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase">
            Protocol <br/><span className="text-blue-500">Breakthrough</span>
          </h1>
          <p className="text-white/40 text-lg mb-12 leading-relaxed font-mono uppercase tracking-widest">
            Enter the MIDI Cloud. Traverse the Z-Path. Navigate the ecosystem.
          </p>
          <button 
            onClick={onLaunch}
            className="group relative flex items-center gap-4 bg-white hover:bg-blue-500 text-black hover:text-white font-black px-16 py-6 rounded-none transition-all hover:scale-105"
          >
            <Play className="w-6 h-6 fill-current" />
            <span className="text-2xl uppercase tracking-[0.3em]">Sync System</span>
          </button>
        </div>
      )}

      {/* Direction & Info Panel */}
      {selectedPartner && (
        <div className="pointer-events-auto self-start max-w-sm w-full animate-in slide-in-from-left duration-500">
          <div className="bg-black/90 backdrop-blur-3xl border-l-4 border-blue-500 p-8 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/20 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-2 text-blue-400 font-black text-[10px] tracking-widest uppercase">
              <Navigation className="w-3 h-3" />
              Directions: Locked
            </div>

            <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{selectedPartner.name}</h2>
            <div className="text-blue-500 font-mono text-[10px] mb-6 uppercase">ID: {selectedPartner.id} // SEC: ALPHA</div>
            
            <p className="text-white/50 leading-relaxed font-medium mb-8">
              {selectedPartner.description}
            </p>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-none transition-all flex items-center justify-center gap-3">
              <Zap className="w-4 h-4 fill-white" />
              ESTABLISH UPLINK
            </button>
          </div>
        </div>
      )}

      {/* Scroll Tip */}
      {isLaunched && !selectedPartner && (
        <div className="self-center animate-bounce text-white/20 flex flex-col items-center gap-2">
          <span className="font-black text-[10px] tracking-[0.5em] uppercase">Scroll to Traverse</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      )}
    </div>
  );
};

export default Overlay;
