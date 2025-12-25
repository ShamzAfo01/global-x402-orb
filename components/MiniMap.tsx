
import React from 'react';
import { Partner } from '../types';
import { EXTENDED_PARTNERS } from '../constants';
import { useScroll } from '@react-three/drei';

interface MiniMapProps {
  selectedPartner: Partner | null;
  onSelect: (partner: Partner) => void;
}

const MiniMap: React.FC<MiniMapProps> = ({ selectedPartner, onSelect }) => {
  const scroll = useScroll();

  return (
    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-16 h-2/3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full p-4 flex flex-col items-center pointer-events-auto shadow-2xl overflow-hidden group">
      <div className="flex flex-col items-center gap-1 mb-4">
        <div className="w-1 h-1 rounded-full bg-blue-500" />
        <span className="text-[8px] font-black text-blue-400 uppercase vertical-text">Depth Protocol</span>
      </div>
      
      <div className="relative w-full h-full flex flex-col justify-between py-4">
        {/* Progress Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        
        {/* Scroll Progress Indicator */}
        <div 
          className="absolute left-1/2 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 shadow-[0_0_15px_#3b82f6] z-20 transition-all duration-300"
          style={{ top: `${(scroll?.offset || 0) * 100}%` }}
        />

        {EXTENDED_PARTNERS.filter((_, i) => i % 10 === 0).map((p, i) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`relative w-2 h-2 rounded-full border border-white/20 transition-all ${
              selectedPartner?.id === p.id ? 'bg-white scale-150' : 'bg-white/10 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
};

export default MiniMap;
