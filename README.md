# Alex Polychroniadis — Portfolio

A personal site for a CV: skills, selected work, experience, and a printable résumé. The layout is a dual-identity split — **Engineer** on the left, **Maker** on the right — inspired by [kiara-plds.vercel.app](https://kiara-plds.vercel.app/), with original copy and case studies.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

- Home: hero, split columns, chat widget
- CV: [http://127.0.0.1:43217/cv](http://127.0.0.1:43217/cv) — use **Save as PDF** (or print)

## Customize

All name, contact, skills, jobs, and projects live in [`lib/site.ts`](lib/site.ts). That file also feeds the printable CV, so you only edit once.

Set `social.linkedin` and `social.github` when you have those URLs. Until then, email is the contact path.

## Stack

Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
