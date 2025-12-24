
import React, { useMemo, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';
import SphereNode from './SphereNode';
import { Partner } from '../types';
import { EXTENDED_PARTNERS } from '../constants';

const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const Group = 'group' as any;

interface SphereVisualizerProps {
  onSelectPartner: (partner: Partner) => void;
  selectedPartner: Partner | null;
}

const SphereVisualizer: React.FC<SphereVisualizerProps> = ({ onSelectPartner, selectedPartner }) => {
  const radius = 5.2;

  const nodes = useMemo(() => {
    const n = EXTENDED_PARTNERS.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    return EXTENDED_PARTNERS.map((partner, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      return {
        partner,
        position: {
          x: Math.cos(theta) * r * radius,
          y: y * radius,
          z: Math.sin(theta) * r * radius
        }
      };
    });
  }, [radius]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 13]} fov={40} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={6} 
        maxDistance={18} 
        rotateSpeed={0.55}
        makeDefault
      />
      
      <AmbientLight intensity={1.2} />
      <PointLight position={[10, 10, 10]} intensity={1} />
      
      <Environment preset="city" />

      <Group>
        {nodes.map(({ partner, position }) => (
          <SphereNode 
            key={partner.id}
            partner={partner}
            position={position}
            onSelect={onSelectPartner}
            isDimmed={selectedPartner !== null && selectedPartner.id !== partner.id}
            isHighlighted={selectedPartner?.id === partner.id}
          />
        ))}
      </Group>
      
      {/* Pre-warm assets for a smoother experience */}
      <Preload all />
    </>
  );
};

export default SphereVisualizer;
