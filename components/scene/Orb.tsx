"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export function Orb({ hover }: { hover: boolean }) {
  const relic = useRef<Mesh>(null);
  const wire = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (relic.current) {
      relic.current.rotation.y += delta * (hover ? 0.95 : 0.2);
      relic.current.rotation.x += delta * (hover ? 0.32 : 0.07);
    }
    if (wire.current) wire.current.rotation.y -= delta * 0.12;
  });

  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={1}>
      <mesh ref={relic} scale={hover ? 1.14 : 1}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#d4af7a"
          metalness={0.82}
          roughness={0.18}
          emissive="#3ee0c5"
          emissiveIntensity={hover ? 0.28 : 0.08}
        />
      </mesh>
      <mesh ref={wire} scale={2.35}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#8b7cff" wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  );
}
