export const site = {
  name: "Alex Polychroniadis",
  firstName: "Alex",
  lastName: "Polychroniadis",
  tagline: "Product engineer, drawn to systems and AI",
  role: "Product Engineer",
  location: "Athens, Greece · Remote",
  email: "Alexandros.polychroniadis@gmail.com",
  year: 2026,
  availability: "Open to full-time product engineering roles",
  identity: {
    role: "Product Engineer",
    focus: "systems & AI",
    available: "yes",
    passion: "clear products",
  },
  social: {
    email: "mailto:Alexandros.polychroniadis@gmail.com",
    linkedin: "",
    github: "",
  },
  engineer: {
    title: "Engineer",
    subtitle: "Product • Systems • AI",
  },
  maker: {
    title: "Maker",
    subtitle: "Selected work • Case studies",
    statement:
      "I like work that has to hold up in the real world — a recruiter scanning a CV, a teammate reading a PR, a user trying to finish a task.",
  },
  philosophy: [
    "I learn by shipping. Give me a messy brief and I will turn it into a small, honest product: clear interface, durable structure, no leftover cleverness.",
    "I care about time. I plan the work, protect the important path, and finish. That is when I feel most useful — not when the slide deck is pretty, when the thing is live.",
  ],
  skills: [
    {
      id: "product",
      label: "Product Engineering",
      body: "I take a product from brief to something people can click. That means scoping, interface, data, and the last 10% that makes it feel finished. I am comfortable sitting with designers, stakeholders, and engineers in the same conversation.",
    },
    {
      id: "ai",
      label: "AI & Agentic Workflows",
      body: "I use LLMs, agents, and MCP tooling as part of how I build — not as a demo. I care about grounded outputs, tight loops, and interfaces that keep a human in control. Recent work includes research briefings and this site, built with agentic tooling on Cursor.",
    },
    {
      id: "frontend",
      label: "Frontend Systems",
      body: "TypeScript, React, and Next.js with a bias toward design systems you can actually maintain. I sweat typography, empty states, and the path a recruiter or customer takes in the first ten seconds.",
    },
    {
      id: "backend",
      label: "Backend & APIs",
      body: "Straightforward services: typed APIs, auth-aware routes, and data models that match how the product talks. I would rather a boring, readable backend than a clever one nobody can change on a Friday.",
    },
    {
      id: "data",
      label: "Data & Analytics",
      body: "SQL, Python, and the habit of asking what the number is for. I have built dashboards, cleaned messy exports, and turned operational data into a view a lead can act on without a follow-up meeting.",
    },
    {
      id: "tools",
      label: "Platforms & Tools",
      body: "Next.js, TypeScript, Tailwind, shadcn/ui, Python, SQL, Git, Cursor, Claude, and the usual cloud primitives. I pick tools that shorten the distance between idea and a link I can send.",
    },
  ],
  experience: [
    {
      role: "Product Engineer",
      org: "Independent practice",
      period: "2024 — Present",
      location: "Remote",
      bullets: [
        "Design and ship end-to-end web products in TypeScript and Next.js, from information architecture to a public URL.",
        "Build AI-assisted workflows (briefings, research, internal tools) with a human in the loop and a clear failure mode.",
        "Own the last mile: copy, empty states, accessibility, and a CV-ready presentation of the work.",
      ],
    },
    {
      role: "Selected product work",
      org: "Personal studio",
      period: "Ongoing",
      location: "Athens / Remote",
      bullets: [
        "Harbor Board — an operations surface for status, owners, and risk, designed for a weekly review, not a wall of charts.",
        "Lumen Briefs — a pipeline that turns raw notes into a one-page briefing a lead can read before a call.",
        "Wayfinder — a planning tool for constraints, dates, and itineraries without the spreadsheet sprawl.",
      ],
    },
    {
      role: "Foundations",
      org: "Computer Science",
      period: "Study & self-directed",
      location: "Europe",
      bullets: [
        "Core CS: data structures, SQL, Python, and the discipline of making a system explainable.",
        "Frontend craft: component systems, motion that stays out of the way, and pages that still work on a phone.",
        "A bias toward measurable outcomes — if it cannot be shown, it is not finished.",
      ],
    },
  ],
  journey: [
    {
      place: "Athens, Greece",
      detail: "Born and raised. Greek is home; English is how I work.",
      current: false,
    },
    {
      place: "Building in public",
      detail: "Shipping products, studying systems, and learning by putting work in front of people.",
      current: false,
    },
    {
      place: "Remote · Europe",
      detail: "Open to product engineering roles. Currently shipping this studio and looking for the next team.",
      current: true,
    },
  ],
  languages: [
    { name: "Greek", level: "Native", flag: "🇬🇷" },
    { name: "English", level: "Fluent", flag: "🇬🇧" },
    { name: "French", level: "Conversational", flag: "🇫🇷" },
  ],
  projects: [
    {
      id: "northstar",
      title: "Northstar",
      kind: "Portfolio system",
      year: "2026",
      stack: ["Next.js", "TypeScript", "Tailwind"],
      summary:
        "This site. A dual-identity portfolio built so a recruiter can read skills, experience, and selected work in one sitting — and save a clean CV from the same source of truth.",
      outcome:
        "One content file drives the website and the printable CV. No CMS, no leftover lorem.",
      cover: "northstar",
    },
    {
      id: "lumen",
      title: "Lumen Briefs",
      kind: "AI workflow",
      year: "2026",
      stack: ["LLMs", "Python", "Next.js"],
      summary:
        "A briefing pipeline: drop in notes, transcripts, or links and get a one-page brief with sources, open questions, and a recommended ask.",
      outcome:
        "Cuts pre-call prep from a pile of tabs to a page you can actually finish.",
      cover: "lumen",
    },
    {
      id: "harbor",
      title: "Harbor Board",
      kind: "Operations",
      year: "2025",
      stack: ["React", "SQL", "Design system"],
      summary:
        "A weekly operations board: owners, status, risk, and the one decision that is blocked. Built for a stand-up, not a BI graveyard.",
      outcome:
        "Leads see what moved, what stalled, and who to talk to — without exporting a CSV.",
      cover: "harbor",
    },
    {
      id: "wayfinder",
      title: "Wayfinder",
      kind: "Planning",
      year: "2025",
      stack: ["TypeScript", "Maps", "UX"],
      summary:
        "A planning surface for dates, constraints, and places. It keeps the itinerary honest when the spreadsheet starts lying.",
      outcome:
        "Fewer conflicting plans, a shareable view, and a trail of why a choice was made.",
      cover: "wayfinder",
    },
  ],
  now: [
    { label: "Building", detail: "This studio site and a tighter CV system" },
    { label: "Exploring", detail: "Agentic product workflows you can trust" },
    { label: "Open to", detail: "Product engineering roles, Europe or remote" },
  ],
  chat: {
    intro: [
      "Hi — this box is decorative. I do not run a model in here.",
      "If you want a real conversation, email me. I read it.",
    ],
    replies: [
      "I am a layout with opinions, not a recruiter bot. Email is faster.",
      "Noted. The useful version of this message lives at Alexandros.polychroniadis@gmail.com.",
      "If this is about a role, send the brief — I answer faster than this widget.",
      "Still here? Fair. The human is on email, not in this corner of the page.",
    ],
  },
} as const;

export type Project = (typeof site.projects)[number];
export type Skill = (typeof site.skills)[number];
