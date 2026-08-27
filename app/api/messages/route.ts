import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import type { ChatMessage } from "@/lib/types";

export function GET(req: Request) {
  const threadId = new URL(req.url).searchParams.get("threadId") ?? undefined;
  return NextResponse.json({
    threads: db.threads(),
    messages: db.messages(threadId),
  });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<ChatMessage>;
  if (!body.threadId || !body.body) {
    return NextResponse.json({ error: "threadId and body are required" }, { status: 400 });
  }
  const message: ChatMessage = {
    id: crypto.randomUUID(),
    threadId: body.threadId,
    fromMe: true,
    body: body.body,
    cipher: body.cipher,
    at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  return NextResponse.json({ message: db.addMessage(message) }, { status: 201 });
}
