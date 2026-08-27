import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import type { CalendarEvent } from "@/lib/types";

export function GET() {
  return NextResponse.json({ events: db.events() });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<CalendarEvent>;
  if (!body.title || !body.day) {
    return NextResponse.json({ error: "title and day are required" }, { status: 400 });
  }
  const event: CalendarEvent = {
    id: crypto.randomUUID(),
    title: body.title,
    day: Number(body.day),
    start: body.start ?? "09:00",
    end: body.end ?? "09:30",
    kind: body.kind ?? "internal",
  };
  return NextResponse.json({ event: db.addEvent(event) }, { status: 201 });
}
