
import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;

const MAX_PARTICLES = 2000;

export const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const state = useMemo(() => {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const sizes = new Float32Array(MAX_PARTICLES);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      // Distributed in a long tunnel along Z
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = -Math.random() * 200;

      sizes[i] = Math.random() * 0.15;
    }
    return { positions, sizes };
  }, []);

  useFrame((stateObj) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = stateObj.clock.elapsedTime;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;

      // Floating motion "inside the cloud"
      positions[ix] += Math.sin(t * 0.2 + i) * 0.005;
      positions[iy] += Math.cos(t * 0.3 + i) * 0.005;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={MAX_PARTICLES}
          array={state.positions}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  );
};
