
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
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
  const groupRef = useRef<THREE.Group>(null);
  const radius = 5.5;

  // Fibonacci Sphere algorithm
  const nodes = useMemo(() => {
    const n = EXTENDED_PARTNERS.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    return EXTENDED_PARTNERS.map((partner, i) => {
      const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      return {
        partner,
        position: {
          x: x * radius,
          y: y * radius,
          z: z * radius
        }
      };
    });
  }, [radius]);

  // Main sphere is now static (auto-rotation disabled as requested)
  useFrame((state) => {
    // No-op to keep it static. 
    // User can still move it via OrbitControls.
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={45} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={4} 
        maxDistance={20} 
        rotateSpeed={0.5}
        makeDefault
      />
      
      <AmbientLight intensity={0.6} />
      <PointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
      <PointLight position={[-10, -10, -10]} intensity={0.5} color="#93C5FD" />
      
      <Environment preset="city" />

      <Group ref={groupRef}>
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
    </>
  );
};

export default SphereVisualizer;
