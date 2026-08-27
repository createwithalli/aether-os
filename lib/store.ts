import type { CalendarEvent, ChatMessage, Contact, Deal, Thread } from "./types";

const now = () => new Date().toISOString();

export const seedContacts: Contact[] = [
  {
    id: "c1",
    name: "Maya Chen",
    email: "maya@lumen.studio",
    company: "Lumen Studio",
    title: "Creative Director",
    value: 84000,
    stage: "proposal",
    lastTouch: now(),
  },
  {
    id: "c2",
    name: "Andre Voss",
    email: "andre@northfork.io",
    company: "Northfork",
    title: "Head of Growth",
    value: 126000,
    stage: "qualified",
    lastTouch: now(),
  },
  {
    id: "c3",
    name: "Priya Nair",
    email: "priya@solstice.xyz",
    company: "Solstice",
    title: "Founder",
    value: 210000,
    stage: "won",
    lastTouch: now(),
  },
  {
    id: "c4",
    name: "Leo Hart",
    email: "leo@atelier.co",
    company: "Atelier",
    title: "Product Lead",
    value: 42000,
    stage: "lead",
    lastTouch: now(),
  },
];

export const seedDeals: Deal[] = [
  { id: "d1", title: "Lumen brand system", contactId: "c1", value: 84000, stage: "proposal", closeDate: "2026-09-12" },
  { id: "d2", title: "Northfork onboarding", contactId: "c2", value: 126000, stage: "qualified", closeDate: "2026-10-02" },
  { id: "d3", title: "Solstice annual", contactId: "c3", value: 210000, stage: "won", closeDate: "2026-08-01" },
];

export const seedEvents: CalendarEvent[] = [
  { id: "e1", title: "Maya — design review", day: 27, start: "10:00", end: "10:45", kind: "call" },
  { id: "e2", title: "Northfork live demo", day: 28, start: "14:00", end: "15:00", kind: "demo" },
  { id: "e3", title: "Sprint cinema pass", day: 29, start: "09:30", end: "11:00", kind: "internal" },
  { id: "e4", title: "Wallet security audit", day: 27, start: "16:00", end: "16:30", kind: "web3" },
];

export const seedThreads: Thread[] = [
  { id: "t1", name: "Maya Chen", handle: "@lumen", unread: 2, encrypted: true },
  { id: "t2", name: "Ops Room", handle: "#command", unread: 0, encrypted: true },
  { id: "t3", name: "Priya Nair", handle: "@solstice", unread: 1, encrypted: true },
];

export const seedMessages: ChatMessage[] = [
  { id: "m1", threadId: "t1", fromMe: false, body: "The hover states feel like film titles. Shipping the reel tonight.", at: "09:14" },
  { id: "m2", threadId: "t1", fromMe: true, body: "Locked. Vaulting the cut behind AES-GCM.", at: "09:16" },
  { id: "m3", threadId: "t2", fromMe: false, body: "Calendar synced. Demo room is 14:00 tomorrow.", at: "08:02" },
  { id: "m4", threadId: "t3", fromMe: false, body: "Can we route payouts through the treasury wallet?", at: "11:41" },
];

type Memory = {
  contacts: Contact[];
  deals: Deal[];
  events: CalendarEvent[];
  threads: Thread[];
  messages: ChatMessage[];
};

const g = globalThis as typeof globalThis & { __aether?: Memory };

function memory(): Memory {
  if (!g.__aether) {
    g.__aether = {
      contacts: [...seedContacts],
      deals: [...seedDeals],
      events: [...seedEvents],
      threads: [...seedThreads],
      messages: [...seedMessages],
    };
  }
  return g.__aether;
}

export const db = {
  contacts: () => memory().contacts,
  deals: () => memory().deals,
  events: () => memory().events,
  threads: () => memory().threads,
  messages: (threadId?: string) =>
    threadId ? memory().messages.filter((m) => m.threadId === threadId) : memory().messages,
  addContact: (c: Contact) => {
    memory().contacts.unshift(c);
    return c;
  },
  addEvent: (e: CalendarEvent) => {
    memory().events.push(e);
    return e;
  },
  addMessage: (m: ChatMessage) => {
    memory().messages.push(m);
    return m;
  },
};
