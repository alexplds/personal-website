# Alex Polychroniadis

Personal site for Alex Polychroniadis: engineering student, co-founder of [gocourt.gr](https://www.gocourt.gr), and placement engineer at Firstco.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

## What is on the page

The header links to five numbered sections, plus LinkedIn, email and a light/dark toggle. On a narrow screen those section links sit in Menu; LinkedIn, email and the theme toggle stay in the header.

- **Hero**: the name, with a glowing tennis ball as the dot on the first "i" of Polychroniadis, the role line, and **View CV** / **Get in touch** buttons.
- **01 About**: a pinned half/half on desktop. The gold Desk half holds `alex.ts`; the blue Court half holds Who I am, four hobbies and three languages. Scrolling mixes the two colours into green and the GoCourt panel takes over, with the story and a button to the site. A hard wheel scroll is briefly caught when the section pins and when GoCourt is fully revealed. `#play` jumps to GoCourt. On phones and tablets the desk and court scroll as normal sections, with their gold and blue blobs. The mix starts when GoCourt arrives: the two colours blend into green and the panel takes over. The page scroll is never locked. With reduced motion, or in a short wide window, the halves and GoCourt simply stack.
- **02 Projects**: a 2×2 grid of cards: GoCourt, the SpiraTest MCP server (built on the Heathrow PLC/SCADA upgrade), Engineering studio work (Mahara portfolios) and F1 in Schools.
- **03 Skills**: a 3D tennis ball (three.js) with 21 tools spread around it. Drag to turn it.
- **04 Experience**: Firstco and ELTRAK.
- **05 Contact**.

The GoCourt and Year 1 / Year 2 portfolio buttons play a short loader first (a rolling tennis ball, or an F1 car crossing a ring), then open the site in a new tab. If the browser blocks the new tab, it opens in the current one.

## Edit content

Almost all text lives in [`lib/content.ts`](lib/content.ts): hero, story, hobbies, languages, projects, experience, tech stack and the link destinations.

## CV

**View CV** opens `/cv`, a page built from the same text as the site. It reflows on a phone and prints to a clean PDF. **Download PDF** on that page is the one-page file [`public/Alex-Polychroniadis-CV.pdf`](public/Alex-Polychroniadis-CV.pdf). To update that file, replace it and keep the same name.

## Deploy

**Vercel**: import the repo with the default Next.js settings. No environment variables are needed, and every push to `main` redeploys.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, three.js, shadcn/ui.
