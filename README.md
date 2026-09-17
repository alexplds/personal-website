# Alex Polychroniadis

Personal site and printable CV for software / Forward Deployed–style roles.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

- Home: single-page CV (About, Experience, Projects, Education, Skills, Contact)
- Printable CV: [http://127.0.0.1:43217/cv](http://127.0.0.1:43217/cv) — use **Save as PDF**

## Edit content

All facts live in [`lib/content.ts`](lib/content.ts). The homepage and `/cv` both read from that file. Do not invent employers, metrics, or grades beyond what is there.

To add a PDF later, drop `public/Alex_Polychroniadis_CV.pdf` and point a button at it. Until then, **View CV** uses the print page.

## Deploy

**Vercel:** import the repo, framework Next.js, default build (`next build`). No env vars required.

**Cloudflare Pages:** framework Next.js, build command `npx @cloudflare/next-on-pages` *or* use the OpenNext Cloudflare adapter if you already use that elsewhere. A static-ish App Router deploy also works via `npx opennextjs-cloudflare` — the site has no database or auth.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
