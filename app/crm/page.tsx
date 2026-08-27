"use client";

import { FormEvent, useEffect, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { money } from "@/lib/format";
import type { Contact, Pipeline } from "@/lib/types";

const stages: Pipeline[] = ["lead", "qualified", "proposal", "won", "lost"];

export default function CrmPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const load = () => fetch("/api/contacts").then((r) => r.json()).then((d) => setContacts(d.contacts));

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, stage: "lead", value: 15000 }),
    });
    setName("");
    setEmail("");
    setCompany("");
    load();
  }

  return (
    <Shell>
      <h1 className="font-display text-5xl">CRM</h1>
      <p className="mt-2 text-foam/60">A quiet pipeline. Inspired by modern sales desks, not a clone of any one of them.</p>

      <form onSubmit={onSubmit} className="glass mt-8 grid gap-3 rounded-3xl p-5 md:grid-cols-4">
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="rounded-2xl bg-foam px-4 py-3 text-ink">Add account</button>
      </form>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {stages.map((stage) => (
          <div key={stage} className="glass rounded-3xl p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-gold/80">{stage}</p>
            <div className="mt-3 space-y-3">
              {contacts.filter((c) => c.stage === stage).map((c) => (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <p>{c.name}</p>
                  <p className="text-sm text-foam/50">{c.company}</p>
                  <p className="mt-2 text-sm text-teal">{money(c.value)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
