import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import type { Contact, Pipeline } from "@/lib/types";

export function GET() {
  return NextResponse.json({ contacts: db.contacts() });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Contact>;
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "name and email are required" }, { status: 400 });
  }
  const contact: Contact = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    company: body.company ?? "Independent",
    title: body.title ?? "Operator",
    value: Number(body.value ?? 0),
    stage: (body.stage as Pipeline) ?? "lead",
    lastTouch: new Date().toISOString(),
  };
  return NextResponse.json({ contact: db.addContact(contact) }, { status: 201 });
}
