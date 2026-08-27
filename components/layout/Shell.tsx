"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Lock, MessageSquare, Orbit, PanelsTopLeft, Wallet } from "lucide-react";
import type { ReactNode } from "react";

const links = [
  { href: "/dashboard", label: "Command", icon: PanelsTopLeft },
  { href: "/crm", label: "CRM", icon: Orbit },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/messages", label: "Messenger", icon: MessageSquare },
  { href: "/vault", label: "Vault", icon: Lock },
  { href: "/web3", label: "Web3", icon: Wallet },
];

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen letterbox">
      <aside className="fixed left-0 top-0 z-20 hidden h-full w-[240px] border-r border-white/10 bg-black/30 p-6 md:block">
        <Link href="/" className="font-display text-2xl tracking-wide text-foam">
          Aether
        </Link>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-gold/70">Operating surface</p>
        <nav className="mt-10 space-y-1">
          {links.map((l) => {
            const active = path === l.href;
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                  active ? "bg-white/10 text-foam" : "text-foam/60 hover:bg-white/5 hover:text-foam"
                }`}
              >
                <Icon size={16} />
                {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="md:pl-[240px]">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#07080d]/70 px-6 py-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-foam/50">Cinematic SaaS template</p>
          <div className="flex items-center gap-2 text-xs text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-teal" />
            Systems live
          </div>
        </header>
        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
