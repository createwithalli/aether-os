export type Pipeline = "lead" | "qualified" | "proposal" | "won" | "lost";

export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  value: number;
  stage: Pipeline;
  lastTouch: string;
};

export type Deal = {
  id: string;
  title: string;
  contactId: string;
  value: number;
  stage: Pipeline;
  closeDate: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  day: number;
  start: string;
  end: string;
  kind: "call" | "demo" | "internal" | "web3";
};

export type Thread = {
  id: string;
  name: string;
  handle: string;
  unread: number;
  encrypted: boolean;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  fromMe: boolean;
  body: string;
  cipher?: string;
  at: string;
};
