export const content = {
  name: "Alex Polychroniadis",
  shortName: "Alex P.",
  location: "London, UK",
  email: "Alexandros.polychroniadis@gmail.com",
  phone: "[phone removed]",
  phoneHref: "tel:[phone removed]",
  linkedin: "https://linkedin.com/in/alexpolychroniadis",
  linkedinLabel: "linkedin.com/in/alexpolychroniadis",
  roleLine: "Engineer, builder, and lifelong athlete",
  intersection:
    "I have always loved two things at once: computer science, and sport. In Greece you could not simply book a court for the hour you wanted — it was calls, guesswork, and hoping someone was there. That gap is why gocourt.gr exists. I co-founded it with a friend. The site is where those two loves meet: a booking product that lets people play when they actually want to play.",
  heroLead:
    "I grew up between languages and cultures. Sport taught me how to compete; engineering taught me how to build. This site is the short version of that path.",
  story: [
    {
      id: "home",
      title: "A multicultural house",
      body: "I grew up in a house where Greek, French, and English were just how you asked for the salt. That mix is still how I move: I can sit with people from different places, switch register, and stay myself. Greek is home. English and French are how I work and think in the world.",
    },
    {
      id: "sport",
      title: "Sport, then courts",
      body: "I have played sport my whole life. The court is still the place I understand fastest — timing, teammates, the next point. That is why gocourt.gr exists: a booking product for people who actually want to play. I co-founded it with a friend. The site speaks for the product; I will not write an essay over it here.",
    },
    {
      id: "build",
      title: "Engineering and the web",
      body: "The other half of me is systems: live infrastructure, testing, interfaces, and shipping something someone can click. Placement work at Firstco put me on mission-critical sites. Web work is how I turn an idea into a URL. Year one and year two studio work lives in my Mahara portfolios — press those when you want the build trail.",
    },
  ],
  languages: [
    { name: "Greek", level: "Native", flag: "gr", origin: "Greece" },
    { name: "English", level: "Fluent", flag: "gb", origin: "the United Kingdom" },
    { name: "French", level: "Fluent", flag: "fr", origin: "France" },
    { name: "Italian", level: "Starting to learn", flag: "it", origin: "Italy" },
  ],
  experience: [
    {
      org: "Firstco",
      role: "Placement Engineer",
      period: "September 2025 – September 2026",
      place: "London (hybrid)",
      bullets: [
        "Testing and system integration on a PLC/SCADA upgrade for Heathrow Airport, on live mission-critical airport infrastructure with operations stakeholders.",
        "Power Management System work at Telehouse on ABB AC500 PLCs and Zenon SCADA, with risk mitigation on a live site.",
        "A Python MCP server so an AI agent could create and manage SpiraTest cases through authenticated APIs.",
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
  destinations: [
    {
      id: "gocourt",
      title: "GoCourt.gr",
      kicker: "Co-founded with a friend · in pilot",
      hint: "Tennis, then the site.",
      animation: "tennis" as const,
      href: "https://www.gocourt.gr",
    },
    {
      id: "year1",
      title: "Year 1 portfolio",
      kicker: "Mahara · studio work",
      hint: "Formula 1, then the portfolio.",
      animation: "f1" as const,
      href: "https://mahara.bath.ac.uk/view/view.php?t=e5303c1dc98b77b34811",
    },
    {
      id: "year2",
      title: "Year 2 portfolio",
      kicker: "Mahara · studio work",
      hint: "Formula 1, then the portfolio.",
      animation: "f1" as const,
      href: "https://mahara.bath.ac.uk/view/view.php?t=e5adef5a06be9a83ac51",
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
      items: ["PLC/SCADA (ABB AC500, Zenon)", "Arduino / embedded", "MATLAB"],
    },
  ],
  nav: [
    { href: "#work", label: "Work" },
    { href: "#play", label: "Intersection" },
    { href: "#contact", label: "Contact" },
  ],
  seo: {
    title: "Alex Polychroniadis — London",
    description:
      "Engineer and co-founder of gocourt.gr. Grew up between Greek, French, and English. Sport, web, and systems.",
  },
} as const;

export type Destination = (typeof content.destinations)[number];
