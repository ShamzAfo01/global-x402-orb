
import React, { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial, Image } from '@react-three/drei';
import * as THREE from 'three';
import { Partner, NodePosition } from '../types';

// Define intrinsic elements as variables to fix JSX type errors
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;

interface SphereNodeProps {
  partner: Partner;
  position: NodePosition;
  onSelect: (partner: Partner) => void;
  isDimmed: boolean;
  isHighlighted: boolean;
}

const SphereNode: React.FC<SphereNodeProps> = ({ 
  partner, 
  position, 
  onSelect, 
  isDimmed, 
  isHighlighted 
}) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const opacity = isDimmed ? 0.2 : 1;
  const scale = isHighlighted ? 1.4 : (hovered ? 1.2 : 1);

  // Use a reliable PNG-based service to avoid loading issues. 
  // Dicebear initials with explicit .png extension helps Three.js loader detection.
  const logoUrl = partner.logo || `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(partner.name)}&backgroundColor=0052ff&fontFamily=Arial&fontWeight=700`;

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    if (innerRef.current) {
      // Billboarding: Ensure the logo always faces the camera
      innerRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <Group position={[position.x, position.y, position.z]}>
      {/* Outer Bubble Globe */}
      <Mesh
        ref={outerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(partner)}
      >
        <SphereGeometry args={[0.35, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          roughness={0.05}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color={isHighlighted ? "#60A5FA" : "#D1E9FF"}
          transparent
          opacity={opacity}
        />
      </Mesh>

      {/* Inner Logo Content */}
      <Group ref={innerRef}>
        <Suspense fallback={<MeshBasicMaterial color="#0052FF" transparent opacity={0.5} />}>
          <Image
            url={logoUrl}
            scale={[0.3, 0.3]}
            transparent
            opacity={opacity}
            toneMapped={false}
          />
        </Suspense>
        
        {/* Floating Label when hovered or highlighted */}
        {(hovered || isHighlighted) && (
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.1}
            color="#1E40AF"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          >
            {partner.name}
          </Text>
        )}
      </Group>
    </Group>
  );
};

export default SphereNode;
