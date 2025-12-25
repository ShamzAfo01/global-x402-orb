
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Particles } from './Particles';
import PartnerGlobe from './PartnerGlobe';
import { Partner } from '../types';
import { EXTENDED_PARTNERS } from '../constants';

const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;

interface SimulationSceneProps {
  onSelectPartner: (partner: Partner) => void;
  selectedPartner: Partner | null;
}

export const SimulationScene: React.FC<SimulationSceneProps> = ({ onSelectPartner, selectedPartner }) => {
  const { camera, mouse } = useThree();
  const scroll = useScroll();
  const controlsRef = useRef<any>(null);
  
  // Arrange partners in clusters along the Z axis (The "Path")
  const partnerNodes = useMemo(() => {
    return EXTENDED_PARTNERS.map((partner, i) => {
      // Distribute along Z from 0 to -150
      const z = -(i * 2.5);
      const angle = i * 0.8; // Spiral distribution
      const radius = 6 + Math.sin(i * 0.5) * 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      return {
        partner,
        position: [x, y, z] as [number, number, number]
      };
    });
  }, []);

  // Vertical Obstacles (Protocol Gates)
  const gates = useMemo(() => {
    const obstacleCount = 15;
    return Array.from({ length: obstacleCount }).map((_, i) => ({
      z: -(i * 12),
      color: i % 2 === 0 ? "#036AFF" : "#00f2ff"
    }));
  }, []);

  // GSAP Smooth Navigation
  useEffect(() => {
    if (selectedPartner) {
      const node = partnerNodes.find(n => n.partner.id === selectedPartner.id);
      if (node && controlsRef.current) {
        const [tx, ty, tz] = node.position;
        const targetVec = new THREE.Vector3(tx, ty, tz);
        
        // Move camera to look at the club
        const camPos = new THREE.Vector3(tx, ty, tz + 6);

        gsap.to(camera.position, {
          x: camPos.x,
          y: camPos.y,
          z: camPos.z,
          duration: 1.5,
          ease: "power4.out"
        });

        gsap.to(controlsRef.current.target, {
          x: tx,
          y: ty,
          z: tz,
          duration: 1.5,
          ease: "power4.out"
        });
      }
    }
  }, [selectedPartner, partnerNodes, camera]);

  useFrame((state) => {
    const scrollOffset = scroll.offset; // 0 to 1
    
    if (!selectedPartner) {
      // Traversal: Camera follows the Z-Path based on scroll
      const targetZ = -scrollOffset * 150 + 10;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
      
      // Parallax mouse effect
      camera.position.x += (mouse.x * 4 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 4 - camera.position.y) * 0.05;

      // Look ahead
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, targetZ - 20), 0.05);
    }
  });

  return (
    <Group>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />
      <OrbitControls 
        ref={controlsRef}
        enablePan={false} 
        enableZoom={false} // Zoom is handled by scroll
        makeDefault 
        rotateSpeed={0.3}
      />

      <AmbientLight intensity={0.5} />
      
      <Particles />

      {/* Traversal Obstacles - Protocol Gates */}
      <Group>
        {gates.map((gate, i) => (
          <Mesh key={i} position={[0, 0, gate.z]}>
            <TorusGeometry args={[12, 0.05, 16, 4]} rotation={[0, 0, Math.PI / 4]} />
            <MeshBasicMaterial color={gate.color} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            
            {/* Inner Grid Obstacle */}
            <Mesh>
              <BoxGeometry args={[24, 24, 0.01]} />
              <MeshBasicMaterial color={gate.color} transparent opacity={0.02} wireframe />
            </Mesh>
          </Mesh>
        ))}
      </Group>

      {/* MIDI Clubs (Partner Nodes) */}
      <Group>
        {partnerNodes.map(({ partner, position }) => (
          <PartnerGlobe
            key={partner.id}
            partner={partner}
            position={position}
            onSelect={onSelectPartner}
            isDimmed={selectedPartner !== null && selectedPartner.id !== partner.id}
            isHighlighted={selectedPartner?.id === partner.id}
          />
        ))}
      </Group>
    </Group>
  );
};
