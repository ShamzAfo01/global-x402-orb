
import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import { Partner } from '../types';

const Group = 'group' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const CylinderGeometry = 'cylinderGeometry' as any;

interface PartnerGlobeProps {
  partner: Partner;
  position: [number, number, number];
  onSelect: (partner: Partner) => void;
  isDimmed: boolean;
  isHighlighted: boolean;
}

const PartnerGlobe: React.FC<PartnerGlobeProps> = ({ 
  partner, 
  position, 
  onSelect, 
  isDimmed, 
  isHighlighted 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const opacity = isDimmed ? 0.05 : 1;
  const scaleFactor = isHighlighted ? 2.5 : (hovered ? 1.8 : 1);
  const logoUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(partner.name)}&backgroundColor=036AFF&fontSize=45&chars=2`;

  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // MIDI Pulse: Constant subtle vibration
      const pulse = Math.sin(t * 4 + phase) * 0.05;
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor + pulse, scaleFactor + pulse, scaleFactor + pulse), 0.1);
      
      // Gentle floating
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + phase) * 0.2;
    }
    if (contentRef.current) {
      contentRef.current.quaternion.copy(state.camera.quaternion);
    }
    if (beamRef.current && isHighlighted) {
      // Fix: Property 'opacity' does not exist on type 'Material | Material[]'. Cast to MeshBasicMaterial to access opacity.
      const material = beamRef.current.material;
      if (!Array.isArray(material)) {
        (material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(t * 10) * 0.2;
      }
      beamRef.current.scale.set(1 + Math.sin(t * 2) * 0.1, 1, 1 + Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <Group ref={groupRef} position={position}>
      {/* Direction Beam (Only visible when highlighted - "Directions") */}
      {isHighlighted && (
        <Mesh ref={beamRef} position={[0, 10, 0]} rotation={[0, 0, 0]}>
          <CylinderGeometry args={[0.02, 0.4, 20, 8]} />
          <MeshBasicMaterial color="#00f2ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </Mesh>
      )}

      {/* Interactive Core */}
      <Mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(partner)}
      >
        <SphereGeometry args={[0.5, 32, 32]} />
        <MeshBasicMaterial
          color={isHighlighted ? "#ffffff" : (hovered ? "#00f2ff" : "#036AFF")}
          transparent
          opacity={0.4 * opacity}
        />
        
        {/* Neon Aura */}
        <Mesh scale={[1.2, 1.2, 1.2]}>
          <SphereGeometry args={[0.5, 16, 16]} />
          <MeshBasicMaterial 
            color={isHighlighted ? "#00f2ff" : "#4A90E2"} 
            transparent 
            opacity={0.15 * opacity} 
            blending={THREE.AdditiveBlending}
            wireframe
          />
        </Mesh>
      </Mesh>

      {/* Identity Content */}
      <Group ref={contentRef}>
        <Image
          url={logoUrl}
          scale={[0.4, 0.4]}
          transparent
          opacity={0.9 * opacity}
          toneMapped={false}
        />
        
        {(hovered || isHighlighted) && (
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.22}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          >
            {partner.name.toUpperCase()}
          </Text>
        )}
      </Group>
    </Group>
  );
};

export default React.memo(PartnerGlobe);
