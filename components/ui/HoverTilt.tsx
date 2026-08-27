"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function HoverTilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const shine = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(212,175,122,0.18), transparent 46%)`;

  return (
    <motion.div
      className={`relative transform-gpu ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        x.set(px);
        y.set(py);
        ry.set(((px - r.width / 2) / r.width) * 10);
        rx.set((-(py - r.height / 2) / r.height) * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90" style={{ background: shine }} />
      <div style={{ transform: "translateZ(28px)" }}>{children}</div>
    </motion.div>
  );
}
