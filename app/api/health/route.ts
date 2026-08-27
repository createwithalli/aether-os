import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    product: "AETHER OS",
    surface: ["crm", "calendar", "messenger", "vault", "web3"],
    time: new Date().toISOString(),
  });
}
