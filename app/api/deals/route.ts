import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export function GET() {
  return NextResponse.json({ deals: db.deals() });
}
