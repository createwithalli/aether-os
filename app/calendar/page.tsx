"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import type { CalendarEvent } from "@/lib/types";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(27);

  const load = () => fetch("/api/events").then((r) => r.json()).then((d) => setEvents(d.events));

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, day, start: "13:00", end: "13:30", kind: "call" }),
    });
    setTitle("");
    load();
  }

  const byDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    events.forEach((ev) => {
      map.set(ev.day, [...(map.get(ev.day) ?? []), ev]);
    });
    return map;
  }, [events]);

  return (
    <Shell>
      <h1 className="font-display text-5xl">Calendar</h1>
      <p className="mt-2 text-foam/60">August 2026 — a call sheet, not a crowded grid.</p>

      <form onSubmit={onSubmit} className="glass mt-8 flex flex-wrap gap-3 rounded-3xl p-5">
        <input className="min-w-[220px] flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="Scene title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" min={1} max={31} className="w-24 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={day} onChange={(e) => setDay(Number(e.target.value))} />
        <button className="rounded-2xl bg-foam px-5 py-3 text-ink">Schedule</button>
      </form>

      <div className="mt-6 grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <p key={d} className="px-2 text-xs uppercase tracking-[0.2em] text-foam/40">{d}</p>
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((d) => (
          <div key={d} className={`min-h-[92px] rounded-2xl border p-2 ${d === 27 ? "border-gold/40 bg-gold/5" : "border-white/10"}`}>
            <p className="text-sm text-foam/70">{d}</p>
            {(byDay.get(d) ?? []).map((ev) => (
              <p key={ev.id} className="mt-1 truncate text-[11px] text-teal">{ev.start} {ev.title}</p>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}
