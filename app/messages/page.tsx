"use client";

import { FormEvent, useEffect, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { encryptText } from "@/lib/crypto";
import type { ChatMessage, Thread } from "@/lib/types";

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [active, setActive] = useState("t1");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pass, setPass] = useState("aether-demo");

  async function load(threadId = active) {
    const data = await fetch(`/api/messages?threadId=${threadId}`).then((r) => r.json());
    setThreads(data.threads);
    setMessages(data.messages);
  }

  useEffect(() => {
    load("t1");
  }, []);

  async function send(e: FormEvent) {
    e.preventDefault();
    const cipher = await encryptText(draft, pass);
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId: active, body: draft, cipher }),
    });
    setDraft("");
    load(active);
  }

  return (
    <Shell>
      <h1 className="font-display text-5xl">Messenger</h1>
      <p className="mt-2 text-foam/60">Signal-like cadence: plaintext in the room, AES-GCM cipher on the wire.</p>

      <div className="mt-8 grid min-h-[560px] overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-black/30 p-3">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActive(t.id);
                load(t.id);
              }}
              className={`mb-2 w-full rounded-2xl px-3 py-3 text-left ${active === t.id ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <div className="flex items-center justify-between">
                <p>{t.name}</p>
                {t.unread > 0 && <span className="rounded-full bg-teal/20 px-2 text-xs text-teal">{t.unread}</span>}
              </div>
              <p className="text-xs text-foam/40">{t.handle} · sealed</p>
            </button>
          ))}
        </aside>
        <section className="flex flex-col bg-black/20">
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {messages.map((m) => (
              <div key={m.id} className={`max-w-[70%] rounded-3xl px-4 py-3 ${m.fromMe ? "ml-auto bg-gold/15" : "bg-white/8"}`}>
                <p>{m.body}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-foam/40">{m.at}</p>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="border-t border-white/10 p-4">
            <div className="mb-2 flex gap-2">
              <input className="w-40 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs outline-none" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Passphrase" />
              <p className="self-center text-xs text-foam/40">Messages are sealed before POST.</p>
            </div>
            <div className="flex gap-2">
              <input className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a sealed line…" required />
              <button className="rounded-2xl bg-foam px-5 text-ink">Send</button>
            </div>
          </form>
        </section>
      </div>
    </Shell>
  );
}
