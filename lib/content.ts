export const content = {
  name: "Alex Polychroniadis",
  shortName: "Alex P.",
  location: "London, UK",
  email: "Alexandros.polychroniadis@gmail.com",
  phone: "[phone removed]",
  phoneHref: "tel:[phone removed]",
  linkedin: "https://linkedin.com/in/alexpolychroniadis",
  linkedinLabel: "linkedin.com/in/alexpolychroniadis",
  roleLine: "Engineering student · Forward Deployed–style software roles",
  availability:
    "Open to Forward Deployed Software Engineer and similar customer-facing software roles.",
  heroLead:
    "Placement experience on live mission-critical systems, AI tooling for testing, and a real product in pilot — gocourt.gr.",
  about: [
    "I'm an engineering student with a clear pull toward computer science. On placement I worked on live, mission-critical systems where risk mitigation actually mattered, and I built AI tooling that made testing simpler.",
    "I study Integrated Mechanical and Electrical Engineering (IMEE) at the University of Bath, and I keep choosing the software side of the work: APIs, data, operator-facing UIs, and shipping something someone can use.",
    "I co-founded gocourt.gr with a friend. It is in pilot now — a two-sided padel and tennis booking marketplace for Athens, built in Node, Python, and SQL. I share product, backend, payments, and club-owner relationships; I am not a sole founder.",
  ],
  experience: [
    {
      org: "Firstco",
      role: "Placement Engineer",
      period: "September 2025 – September 2026",
      place: "London (hybrid)",
      bullets: [
        "Testing and system integration on a PLC/SCADA upgrade for Heathrow Airport, working on live mission-critical airport infrastructure with operations stakeholders.",
        "Contributed to a Power Management System at Telehouse on ABB AC500 PLCs and Zenon SCADA, with risk mitigation and error handling for work on a live site.",
        "Built a Python MCP server so an AI agent could create and manage SpiraTest cases via authenticated APIs, helping make testing more efficient.",
      ],
    },
    {
      org: "gocourt.gr",
      role: "Co-Founder",
      period: "Ongoing",
      place: "In pilot · target launch January 2027",
      bullets: [
        "Shipping a two-sided padel/tennis booking marketplace for Athens, Greece. Players book courts; club owners manage bookings.",
        "Built on Node/Express, PostgreSQL, Socket.IO, and Stripe Connect, with concurrency-safe booking so courts can’t double-book.",
        "Co-own product, backend, payments, and court-owner relationships with a co-founder.",
      ],
    },
    {
      org: "ELTRAK S.A.",
      role: "Marine Sales Engineer Intern",
      period: "August – September 2024",
      place: "Athens",
      bullets: [
        "Customer-facing technical sales supporting marine equipment.",
      ],
    },
  ],
  projects: [
    {
      id: "gocourt",
      title: "gocourt.gr",
      kind: "Featured · Co-founded with a friend",
      period: "Pilot · target launch January 2027",
      summary:
        "A two-sided booking marketplace for padel and tennis courts in Athens. Players book; club owners manage the calendar.",
      detail: [
        "Stack: Node/Express, PostgreSQL, Socket.IO, Stripe Connect.",
        "Concurrency-safe booking so the same court cannot be taken twice.",
        "Infra: Render and Cloudflare.",
        "I share product, backend, payments, and owner relationships with my co-founder — not a solo build.",
      ],
      href: "https://gocourt.gr",
    },
    {
      id: "beatrix",
      title: "BEATRIX",
      kind: "University of Bath",
      period: "IMEE",
      summary:
        "Multi-sensor robot with a MATLAB GUI and facial recognition. Sensor streams landed in an operator-facing UI; the system was iterated as a working end-to-end build.",
      detail: [
        "Integrated sensor streams into an operator-facing MATLAB GUI.",
        "Facial recognition as part of the operator loop, not a disconnected demo.",
        "Built and iterated until the full path — sense, decide, show — actually ran.",
      ],
    },
    {
      id: "mouse",
      title: "Autonomous Mouse Race",
      kind: "University of Bath",
      period: "IMEE",
      summary:
        "Autonomous race robot built and debugged under real-world constraints. Control and sensing had to work on the track, not only on paper.",
      detail: [
        "Hardware and control brought up against track conditions, not only simulation.",
        "Debugged sensing and control where the failure was visible in a race, not a lab plot.",
      ],
    },
  ],
  education: [
    {
      school: "University of Bath",
      award: "Integrated Mechanical and Electrical Engineering (IMEE), BEng",
      period: "October 2023 – June 2027",
      extra: "Placement year 2025–26 · Expected grade: First",
    },
    {
      school: "The Moraitis School",
      award: "International Baccalaureate",
      period: "2021 – 2023",
      extra:
        "HL: Mathematics Analysis and Approaches, Physics, English · SL: Computer Science, Business and Management, Modern Greek",
    },
  ],
  skills: [
    {
      group: "Software",
      items: [
        "Java",
        "C++",
        "Python",
        "JavaScript / Node.js",
        "PostgreSQL",
        "REST APIs",
        "Git",
        "Express",
        "Socket.IO",
        "Stripe",
        "FastMCP / httpx",
      ],
    },
    {
      group: "Systems & embedded",
      items: [
        "PLC/SCADA (ABB AC500, Zenon)",
        "Arduino / embedded",
        "MATLAB",
      ],
    },
    {
      group: "Languages",
      items: [
        "English — full professional",
        "French — full professional",
        "Greek — native",
      ],
    },
  ],
  nav: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ],
  seo: {
    title: "Alex Polychroniadis — Engineering student, London",
    description:
      "IMEE student at the University of Bath. Placement engineer on live mission-critical systems, co-founder of gocourt.gr. Open to Forward Deployed Software Engineer and similar roles.",
  },
} as const;
