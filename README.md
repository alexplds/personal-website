# Alex Polychroniadis

Personal site and printable CV for software / Forward Deployed–style roles.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

- Home: hero, then a wide Desk / Court split you can drag. The yellow desk field holds `alex.ts`. The blue court field holds Who I am and the hobby icons. Open GoCourt replaces those two boxes with one panel of the same size. Skills, Mahara, languages, and Journey stay in the columns below. Back undoes the mix. Then a see-through tennis sphere drawn in light lines. Drag turns it in any direction; it stays still until you do. The marks are Python, JavaScript, Java, C++, React, Node.js, PostgreSQL, Git, and the tools around them. Then contact.
- Printable CV: [http://127.0.0.1:43217/cv](http://127.0.0.1:43217/cv) — use **Save as PDF**

## Edit content

All facts live in [`lib/content.ts`](lib/content.ts). The homepage and `/cv` both read from that file.

Year 1 and Year 2 buttons show a circular loader: an F1 car drives into the ring and out the other side, then the Mahara views open. GoCourt opens `https://www.gocourt.gr` after the tennis rally.

The header has LinkedIn, email, a theme toggle, and a **View CV** pill (inverted against the current theme). That opens the printable page at `/cv`. To add a PDF later, drop `public/Alex_Polychroniadis_CV.pdf` and link it from there.

## Deploy

**Vercel:** import the repo, framework Next.js, default build (`next build`). No env vars required.

**Cloudflare Pages:** framework Next.js, build command `npx @cloudflare/next-on-pages` *or* use the OpenNext Cloudflare adapter if you already use that elsewhere. A static-ish App Router deploy also works via `npx opennextjs-cloudflare` — the site has no database or auth.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
