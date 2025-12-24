
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SphereVisualizer from './components/SphereVisualizer';
import Overlay from './components/Overlay';
import { Partner } from './types';

const App: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#FFFFFF] via-[#E6F0FF] to-[#99C2FF] overflow-hidden">
      {/* 3D Canvas Container */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 14], fov: 45 }}>
          <Suspense fallback={null}>
            <SphereVisualizer 
              onSelectPartner={setSelectedPartner} 
              selectedPartner={selectedPartner}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Overlay 
          selectedPartner={selectedPartner} 
          onClose={() => setSelectedPartner(null)} 
        />
      </div>

      {/* Loading Fallback Placeholder */}
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full bg-white z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-blue-900 font-bold">Assembling Ecosystem Orb...</span>
          </div>
        </div>
      }>
        {/* Empty placeholder to trigger parent suspense if needed */}
      </Suspense>
    </div>
  );
};

export default App;
