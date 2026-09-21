# Alex Polychroniadis

Personal site and printable CV for software / Forward Deployed–style roles.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

- Home: hero, then a wide Desk / Court split you can drag. Desk has the `alex.ts` intro, a short set of prove-it skills (only work you can walk through), and Mahara. Court / Personal life holds the sport note, Skills developed, languages, and Journey. The seam mixes the rooms into one GoCourt box; Back undoes it. Then contact.
- Printable CV: [http://127.0.0.1:43217/cv](http://127.0.0.1:43217/cv) — use **Save as PDF**

## Edit content

All facts live in [`lib/content.ts`](lib/content.ts). The homepage and `/cv` both read from that file.

Year 1 and Year 2 buttons play the Formula 1 lap, then open the Mahara views. GoCourt opens `https://www.gocourt.gr` after the tennis rally.

The header has LinkedIn, email, a theme toggle, and a **View CV** pill (inverted against the current theme). That opens the printable page at `/cv`. To add a PDF later, drop `public/Alex_Polychroniadis_CV.pdf` and link it from there.

## Deploy

**Vercel:** import the repo, framework Next.js, default build (`next build`). No env vars required.

**Cloudflare Pages:** framework Next.js, build command `npx @cloudflare/next-on-pages` *or* use the OpenNext Cloudflare adapter if you already use that elsewhere. A static-ish App Router deploy also works via `npx opennextjs-cloudflare` — the site has no database or auth.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
