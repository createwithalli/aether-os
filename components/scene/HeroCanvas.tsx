"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Orb } from "./Orb";

export function HeroCanvas() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-glow"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.6]}>
        <color attach="background" args={["#05060a"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 3]} intensity={1.5} color="#ffe6bf" />
        <pointLight position={[-4, -2, -3]} intensity={1.3} color="#3ee0c5" />
        <Orb hover={hover} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-gold/80">Spline-ready · WebGL / WebGPU path</p>
        <p className="mt-1 font-display text-2xl text-foam">Hover the relic</p>
      </div>
    </div>
  );
}
