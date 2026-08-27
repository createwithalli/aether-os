# AETHER OS

Cinematic full-stack SaaS template. Dark film grain, 3D hover relics, emergent Framer Motion, CRM, calendar, encrypted messenger, dual-path AES-GCM vault, and a Web3 wallet surface.

Not a pixel clone of any branded product. The rooms take cues from familiar tools so the UI feels instantly usable.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind + Framer Motion
- React Three Fiber + Drei (Spline-replaceable hero relic)
- Route handlers for CRM, calendar, messenger, health, encrypt
- Web Crypto (browser) + Node `crypto` (server)
- Injected `window.ethereum` connect

## Surfaces

| Route | Purpose |
| --- | --- |
| `/` | Cinematic landing + 3D hover relic |
| `/dashboard` | Command metrics |
| `/crm` | Kanban CRM + POST contacts |
| `/calendar` | Month grid + POST events |
| `/messages` | Encrypted messenger |
| `/vault` | Client and server seal/open |
| `/web3` | Wallet connect + treasury glance |

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Swap the 3D relic for Spline

1. Publish a scene from [spline.design](https://spline.design).
2. Replace `components/scene/HeroCanvas.tsx` with the Spline viewer (`@splinetool/react-spline`).
3. Keep the same rounded frame so the landing does not change.

WebGPU: Three r170 can take a WebGPU renderer when the browser exposes `navigator.gpu`. The default path is WebGL so the template runs everywhere.

## Persistence

API memory lives on the serverless instance (`lib/store.ts`). Swap the `db` object for Postgres / Supabase / PlanetScale when you leave demo mode.

## License

MIT
