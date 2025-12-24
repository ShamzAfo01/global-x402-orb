
import React, { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import { Partner, NodePosition } from '../types';

// Use basic intrinsic elements to ensure fast JSX resolution
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;

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

  // Performance optimized values
  const bubbleOpacity = isDimmed ? 0.08 : 0.45;
  const contentOpacity = isDimmed ? 0.15 : 1;
  const scaleTarget = isHighlighted ? 1.4 : (hovered ? 1.25 : 1);

  // Use Initials SVG for ultra-fast texture loading without external dependencies where possible
  const logoUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(partner.name)}&backgroundColor=0052ff&fontSize=45&chars=2`;

  useFrame((state) => {
    if (outerRef.current) {
      // Fast lerp for responsiveness
      outerRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.2);
    }
    if (innerRef.current) {
      // Cheap billboarding via quaternion copy
      innerRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <Group position={[position.x, position.y, position.z]}>
      {/* Outer Bubble - Lightweight Standard Material */}
      <Mesh
        ref={outerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(partner)}
      >
        <SphereGeometry args={[0.3, 14, 14]} />
        <MeshStandardMaterial
          color={isHighlighted ? "#60A5FA" : "#D1E9FF"}
          transparent
          opacity={bubbleOpacity}
          roughness={0.1}
          metalness={0.6}
        />
      </Mesh>

      {/* Inner Content - Sprite-like Image behavior */}
      <Group ref={innerRef}>
        <Suspense fallback={null}>
          <Image
            url={logoUrl}
            scale={[0.28, 0.28]}
            transparent
            opacity={contentOpacity}
            toneMapped={false}
          />
        </Suspense>
        
        {/* Label - Only rendered when relevant for performance */}
        {(hovered || isHighlighted) && (
          <Text
            position={[0, -0.48, 0]}
            fontSize={0.13}
            color="#1E3A8A"
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

// Memoize to prevent unnecessary re-renders in the large collection
export default React.memo(SphereNode);
