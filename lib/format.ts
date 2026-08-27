export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const shortAddr = (addr: string) => `${addr.slice(0, 6)}…${addr.slice(-4)}`;
