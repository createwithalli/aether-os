import { NextResponse } from "next/server";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

function keyFrom(passphrase: string, salt: Buffer) {
  return scryptSync(passphrase, salt, 32);
}

export async function POST(req: Request) {
  const { action, text, passphrase, payload } = (await req.json()) as {
    action: "encrypt" | "decrypt";
    text?: string;
    passphrase?: string;
    payload?: string;
  };

  if (!passphrase) {
    return NextResponse.json({ error: "passphrase required" }, { status: 400 });
  }

  try {
    if (action === "encrypt") {
      if (!text) return NextResponse.json({ error: "text required" }, { status: 400 });
      const salt = randomBytes(16);
      const iv = randomBytes(12);
      const cipher = createCipheriv("aes-256-gcm", keyFrom(passphrase, salt), iv);
      const enc = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
      const tag = cipher.getAuthTag();
      return NextResponse.json({
        payload: `aether.srv.${salt.toString("base64")}.${iv.toString("base64")}.${tag.toString("base64")}.${enc.toString("base64")}`,
      });
    }

    if (!payload) return NextResponse.json({ error: "payload required" }, { status: 400 });
    const parts = payload.split(".");
    if (parts.length !== 6 || parts[0] !== "aether" || parts[1] !== "srv") {
      return NextResponse.json({ error: "unknown payload" }, { status: 400 });
    }
    const salt = Buffer.from(parts[2], "base64");
    const iv = Buffer.from(parts[3], "base64");
    const tag = Buffer.from(parts[4], "base64");
    const data = Buffer.from(parts[5], "base64");
    const decipher = createDecipheriv("aes-256-gcm", keyFrom(passphrase, salt), iv);
    decipher.setAuthTag(tag);
    const textOut = Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
    return NextResponse.json({ text: textOut });
  } catch {
    return NextResponse.json({ error: "crypto failed" }, { status: 400 });
  }
}
