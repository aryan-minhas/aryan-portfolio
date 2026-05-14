'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CYAN_HEX = '#00E5FF';

// ── Particle Field ───────────────────────────────────────────────────────────
function ParticleField({ count }: { count: number }) {
  const pointsRef  = useRef<THREE.Points>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const geo       = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1 + Math.random() ** 0.5 * 3.5;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { pointer } = state;
    const time        = state.clock.getElapsedTime();

    smoothMouse.current.x += (pointer.x - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (pointer.y - smoothMouse.current.y) * 0.04;

    pointsRef.current.rotation.y =
      time * 0.05 + smoothMouse.current.x * 0.35;
    pointsRef.current.rotation.x =
      Math.sin(time * 0.03) * 0.12 + smoothMouse.current.y * 0.2;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={CYAN_HEX}
        size={0.018}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Wireframe Sphere ─────────────────────────────────────────────────────────
function WireframeSphere() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.8, 1)),
    []
  );

  useFrame((_, delta) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y += delta * 0.08;
    lineRef.current.rotation.z += delta * 0.04;
  });

  return (
    <lineSegments ref={lineRef} geometry={edgesGeo}>
      <lineBasicMaterial
        color={CYAN_HEX}
        transparent
        opacity={0.07}
      />
    </lineSegments>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function HeroScene() {
  const { particleCount, enabled } = useMemo(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores < 4) return { particleCount: 0, enabled: false };
    const dpr = window.devicePixelRatio ?? 1;
    return { particleCount: dpr < 2 ? 800 : 2000, enabled: true };
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} color={CYAN_HEX} intensity={0.5} />
      <ParticleField count={particleCount} />
      <WireframeSphere />
    </Canvas>
  );
}
