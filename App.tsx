
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { SimulationScene } from './components/SimulationScene';
import Overlay from './components/Overlay';
import MiniMap from './components/MiniMap';
import { Partner } from './types';

const App: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);

  return (
    <div className="relative w-full h-screen bg-[#000000] overflow-hidden">
      {/* Simulation Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          flat 
          dpr={[1, 2]} 
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: false 
          }}
        >
          <Suspense fallback={null}>
            {/* ScrollControls is required by useScroll hooks in child components */}
            <ScrollControls pages={3} damping={0.1}>
              <SimulationScene 
                onSelectPartner={setSelectedPartner} 
                selectedPartner={selectedPartner}
              />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Overlay 
          selectedPartner={selectedPartner} 
          onClose={() => setSelectedPartner(null)} 
          isLaunched={isLaunched}
          onLaunch={() => setIsLaunched(true)}
        />
        {isLaunched && (
          <MiniMap 
            selectedPartner={selectedPartner} 
            onSelect={setSelectedPartner}
          />
        )}
      </div>

      {/* Global Loader */}
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full bg-black z-50">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase opacity-60">Syncing Protocol Map</p>
          </div>
        </div>
      }>
        <div />
      </Suspense>
    </div>
  );
};

export default App;
