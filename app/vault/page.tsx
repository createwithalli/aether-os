"use client";

import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { decryptText, encryptText } from "@/lib/crypto";

export default function VaultPage() {
  const [pass, setPass] = useState("aether-demo");
  const [plain, setPlain] = useState("The cut lives in reel 04. Do not circulate.");
  const [payload, setPayload] = useState("");
  const [out, setOut] = useState("");
  const [serverPayload, setServerPayload] = useState("");
  const [serverOut, setServerOut] = useState("");

  return (
    <Shell>
      <h1 className="font-display text-5xl">Vault</h1>
      <p className="mt-2 max-w-2xl text-foam/60">
        Dual-path encryption for audit. Browser Web Crypto AES-GCM and a matching Node route so you can
        prove front and back ends both seal data.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Client · Web Crypto</p>
          <input className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={pass} onChange={(e) => setPass(e.target.value)} />
          <textarea className="mt-3 min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={plain} onChange={(e) => setPlain(e.target.value)} />
          <div className="mt-3 flex gap-2">
            <button className="rounded-2xl bg-foam px-4 py-2 text-ink" onClick={async () => setPayload(await encryptText(plain, pass))}>Seal</button>
            <button className="rounded-2xl border border-white/15 px-4 py-2" onClick={async () => {
              try { setOut(await decryptText(payload, pass)); } catch { setOut("Unable to open."); }
            }}>Open</button>
          </div>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all text-xs text-teal/80">{payload}</pre>
          {out && <p className="mt-3 text-foam">{out}</p>}
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Server · POST /api/encrypt</p>
          <div className="mt-4 flex gap-2">
            <button className="rounded-2xl bg-foam px-4 py-2 text-ink" onClick={async () => {
              const res = await fetch("/api/encrypt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "encrypt", text: plain, passphrase: pass }),
              }).then((r) => r.json());
              setServerPayload(res.payload ?? res.error);
            }}>Seal on server</button>
            <button className="rounded-2xl border border-white/15 px-4 py-2" onClick={async () => {
              const res = await fetch("/api/encrypt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "decrypt", payload: serverPayload, passphrase: pass }),
              }).then((r) => r.json());
              setServerOut(res.text ?? res.error);
            }}>Open on server</button>
          </div>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all text-xs text-teal/80">{serverPayload}</pre>
          {serverOut && <p className="mt-3 text-foam">{serverOut}</p>}
        </div>
      </div>
    </Shell>
  );
}
