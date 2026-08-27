"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoverTilt } from "@/components/ui/HoverTilt";

const HeroCanvas = dynamic(() => import("@/components/scene/HeroCanvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-[32px] border border-white/10 bg-black/40" />,
});

const modules = [
  { href: "/dashboard", title: "Command", copy: "Pulse of pipeline, vault, and chain." },
  { href: "/crm", title: "CRM", copy: "Contacts and deals with a film-still board." },
  { href: "/calendar", title: "Calendar", copy: "A month that feels like a call sheet." },
  { href: "/messages", title: "Messenger", copy: "Encrypted threads, messenger cadence." },
  { href: "/vault", title: "Vault", copy: "AES-GCM client + server audit path." },
  { href: "/web3", title: "Web3", copy: "Wallet connect and treasury glance." },
];

export default function HomePage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-10">
      <nav className="mb-16 flex items-center justify-between">
        <p className="font-display text-3xl">Aether</p>
        <Link href="/dashboard" className="rounded-full border border-gold/40 px-5 py-2 text-sm text-gold">
          Enter the OS
        </Link>
      </nav>

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.42em] text-gold"
          >
            Emergent cinematic interface
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="mt-4 font-display text-6xl leading-[0.92] text-foam md:text-7xl"
          >
            An operating surface
            <br />
            for quiet power.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-foam/70"
          >
            Full-stack SaaS template with 3D hover relics, Framer Motion emergence, CRM memory,
            calendars, an encrypted messenger, and a Web3 treasury — easy UI, open source bones.
          </motion.p>
          <div className="mt-8 flex gap-3">
            <Link href="/dashboard" className="rounded-full bg-foam px-6 py-3 text-sm font-medium text-ink">
              Launch command
            </Link>
            <Link href="/vault" className="rounded-full border border-white/15 px-6 py-3 text-sm text-foam/80">
              Inspect the vault
            </Link>
          </div>
        </div>
        <HeroCanvas />
      </div>

      <div className="mt-20 grid gap-4 md:grid-cols-3" style={{ perspective: 1200 }}>
        {modules.map((m, i) => (
          <motion.div
            key={m.href}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.06 }}
          >
            <HoverTilt className="rounded-3xl">
              <Link href={m.href} className="glass block rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-teal/80">0{i + 1}</p>
                <h2 className="mt-3 font-display text-3xl">{m.title}</h2>
                <p className="mt-2 text-sm text-foam/60">{m.copy}</p>
              </Link>
            </HoverTilt>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
