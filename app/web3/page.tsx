"use client";

import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { shortAddr } from "@/lib/format";

type EthereumProvider = {
  request: (args: { method: string }) => Promise<string[]>;
};

export default function Web3Page() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function connect() {
    setError("");
    const eth = (window as Window & { ethereum?: EthereumProvider }).ethereum;
    if (!eth) {
      setError("No injected wallet. Install MetaMask or Rabby, then return.");
      return;
    }
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    setAddress(accounts[0] ?? null);
  }

  return (
    <Shell>
      <h1 className="font-display text-5xl">Web3</h1>
      <p className="mt-2 max-w-2xl text-foam/60">
        A treasury glance, not a Uniswap fork. Connect an injected wallet, then wire your own RPC,
        SIWE, and indexer.
      </p>

      <div className="glass mt-8 max-w-xl rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">Injected provider</p>
        {address ? (
          <p className="mt-4 font-display text-4xl text-teal">{shortAddr(address)}</p>
        ) : (
          <p className="mt-4 text-foam/60">Wallet idle. The chain is waiting offstage.</p>
        )}
        <button onClick={connect} className="mt-6 rounded-full bg-foam px-6 py-3 text-ink">
          {address ? "Reconnect" : "Connect wallet"}
        </button>
        {error && <p className="mt-3 text-sm text-gold">{error}</p>}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["ETH", "1.284", "settled"],
          ["USDC", "18,420", "treasury"],
          ["AETH", "—", "your token"],
        ].map(([sym, bal, note]) => (
          <div key={sym} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-foam/40">{note}</p>
            <p className="mt-2 font-display text-3xl">{bal}</p>
            <p className="text-sm text-gold">{sym}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}
