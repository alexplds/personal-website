# Alex Polychroniadis

Personal site and printable CV for software / Forward Deployed–style roles.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

- Home: the page uses the full width of the screen, and each part fades in as you scroll to it. The header links to four numbered sections.
  - Hero: one full screen with just the name, a short line, and two buttons.
  - 01 About: a full-screen half/half that stays pinned while you scroll. The gold Desk half holds `alex.ts`; the blue Court half holds Who I am and the sports icons. Scrolling mixes those two colours like paint into green, and the GoCourt panel takes over. `#play` jumps to GoCourt. On phones, smaller windows, or with reduced motion, the halves and GoCourt simply stack.
  - 02 Projects: numbered cards from `content.projects` — GoCourt, the SpiraTest MCP server, Heathrow, Telehouse, and the Mahara studio work.
  - 03 Skills: a big light green tennis ball with a white seam and twenty tools spread around it; the main ones face you and the rest sit behind. Drag turns it in any direction to explore; it stays still until you do. The tools live in `content.techStack`.
  - 04 Contact.
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
