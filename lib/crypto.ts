const enc = new TextEncoder();
const dec = new TextDecoder();

function toB64(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function fromB64(value: string) {
  const bin = atob(value);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

async function keyFromPassphrase(passphrase: string, salt: Uint8Array) {
  const material = await crypto.subtle.importKey("raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptText(plain: string, passphrase: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await keyFromPassphrase(passphrase, salt);
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plain));
  return `aether.v1.${toB64(salt.buffer)}.${toB64(iv.buffer)}.${toB64(cipher)}`;
}

export async function decryptText(payload: string, passphrase: string) {
  const parts = payload.split(".");
  if (parts.length !== 5 || parts[0] !== "aether" || parts[1] !== "v1") {
    throw new Error("Unknown vault format");
  }
  const salt = fromB64(parts[2]);
  const iv = fromB64(parts[3]);
  const data = fromB64(parts[4]);
  const key = await keyFromPassphrase(passphrase, salt);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return dec.decode(plain);
}
