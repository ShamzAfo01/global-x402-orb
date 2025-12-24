
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SphereVisualizer from './components/SphereVisualizer';
import Overlay from './components/Overlay';
import { Partner } from './types';

const App: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#FFFFFF] via-[#F1F7FF] to-[#BED7FF] overflow-hidden">
      {/* 3D Canvas Layer - Configured for high performance */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          flat 
          dpr={1} 
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: true 
          }}
          camera={{ position: [0, 0, 13], fov: 40 }}
        >
          <Suspense fallback={null}>
            <SphereVisualizer 
              onSelectPartner={setSelectedPartner} 
              selectedPartner={selectedPartner}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Overlay 
          selectedPartner={selectedPartner} 
          onClose={() => setSelectedPartner(null)} 
        />
      </div>

      {/* Fast Minimal Loader */}
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full bg-white/30 backdrop-blur-md z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-900 font-bold text-xs tracking-widest uppercase opacity-70">Powering Up Orb</p>
          </div>
        </div>
      }>
        <div />
      </Suspense>
    </div>
  );
};

export default App;
