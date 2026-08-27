"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shell } from "@/components/layout/Shell";
import { HoverTilt } from "@/components/ui/HoverTilt";
import { money } from "@/lib/format";
import type { Contact, Deal } from "@/lib/types";

export default function DashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    Promise.all([fetch("/api/contacts").then((r) => r.json()), fetch("/api/deals").then((r) => r.json())]).then(
      ([c, d]) => {
        setContacts(c.contacts);
        setDeals(d.deals);
      },
    );
  }, []);

  const pipeline = deals.reduce((s, d) => s + d.value, 0);

  const tiles = [
    { label: "Pipeline", value: money(pipeline), note: "Open + won" },
    { label: "Accounts", value: String(contacts.length), note: "Living CRM" },
    { label: "Encrypted lanes", value: "3", note: "Messenger" },
    { label: "Chain", value: "Ready", note: "Wallet idle" },
  ];

  return (
    <Shell>
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl">
        Command
      </motion.h1>
      <p className="mt-2 text-foam/60">A single glance across CRM, calendar, vault, and chain.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-4" style={{ perspective: 1000 }}>
        {tiles.map((t) => (
          <HoverTilt key={t.label} className="rounded-3xl">
            <div className="glass rounded-3xl p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-gold/80">{t.label}</p>
              <p className="mt-3 font-display text-4xl">{t.value}</p>
              <p className="mt-1 text-sm text-foam/50">{t.note}</p>
            </div>
          </HoverTilt>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-2xl">Recent accounts</h2>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <p>{c.name}</p>
                  <p className="text-sm text-foam/50">
                    {c.company} · {c.stage}
                  </p>
                </div>
                <p className="text-gold">{money(c.value)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-2xl">Call sheet</h2>
          <p className="mt-3 text-foam/70">
            27 Aug — Maya review at 10:00. Wallet audit at 16:00. Keep the reel in the vault until the
            cut is locked.
          </p>
          <p className="mt-4 text-sm text-teal">Health endpoint: GET /api/health</p>
        </div>
      </div>
    </Shell>
  );
}
