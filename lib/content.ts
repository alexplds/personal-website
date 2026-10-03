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
  journey: [
    {
      place: "Athens, Greece",
      detail: "Grew up in a multicultural house (Greek, French, and English).",
      current: false,
    },
    {
      place: "Bath, UK",
      detail: "Integrated Mechanical and Electrical Engineering at the University of Bath.",
      current: false,
    },
    {
      place: "London, UK",
      detail: "Placement Engineer at Firstco.",
      current: true,
    },
  ],
  experience: [
    {
      org: "Firstco",
      role: "Placement Engineer",
      period: "September 2025 – September 2026",
      place: "London (hybrid)",
      bullets: [
        "Testing and integration on a live PLC/SCADA upgrade at Heathrow Airport with operations stakeholders.",
        "On Telehouse’s data centres Power Management System, produced documentation for fault mitigation and recovery so power can keep flowing across the site if something fails.",
        "Built a Python MCP server (FastMCP, httpx, REST) so engineers could create and manage SpiraTest cases through AI tools instead of clicking through a UI.",
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
  skillAreas: [
    {
      group: "Solutions engineering",
      how: "I like being in the room with the people who run a system — hearing what breaks, what they’re scared of, then helping ship something that holds up. At Firstco that meant live PLC/SCADA work at Heathrow, Telehouse Power Management System docs for fault mitigation and recovery so power keeps flowing. I also built a Python MCP server so engineers could drive SpiraTest through AI tools significantly improving efficiency.",
      items: [],
      skills:
        "Artificial Intelligence · Solutions Engineering · Systems Integration · Integration Testing · PLC · SCADA · MCP · Stakeholder work",
    },
    {
      group: "Programming & APIs",
      how: "I like to learn software by building things people use. With a friend I co-founded gocourt.gr, a court-booking marketplace that connects sports club owners and players, currently live in pilot mode, used by club owners around Athens. At Firstco I also built a Python MCP/REST service so testing on SpiraTest became more efficient.",
      items: [],
      skills:
        "MCP · Python · JavaScript · Node.js · Express.js · React · REST APIs · Socket.IO · PostgreSQL · Git · Capacitor",
    },
    {
      group: "Data analytics",
      how: "I’ve always liked the idea that data can prove something by forming opinions from evidence, not guesses. That’s a big reason I chose Bath IMEE: an engineering degree that trains you to read a graph and understand what’s going on fast. I’ve sharpened analysis and visualisation mainly through university coursework in MATLAB, and on gocourt.gr the owner dashboard uses PostgreSQL-backed analytics so clubs can see how their courts are actually performing.",
      items: [],
      skills:
        "Data Analysis · MATLAB · Data Visualisation · PostgreSQL · SQL · Dashboards / Analytics",
    },
    {
      group: "Sales engineering",
      how: "I like turning a messy customer ask into a clear technical offer. At ELTRAK as a Marine Sales Engineer intern I worked with clients and engineering on marine equipment — motors, generators, cranes — building priced proposals in CAT and Palfinger and supporting a large shipboard install from drawings.",
      items: [],
      skills:
        "Sales Engineering · Technical Sales · Proposal Writing · Engineering Drawings · Client-facing work",
    },
  ],
  courtSkillAreas: [
    {
      group: "Quick learner",
      how: "I am always eager to learn. A new program or platform usually takes very little training. This skill has been developed through my hobbies: football, skiing, tennis, and padel at a high level, and teaching myself Python, Java, and C++ in my free time.",
      items: [],
      skills: "Eager to learn · Quick learner · Easy-going · Coachable",
    },
    {
      group: "Composure",
      how: "Sports at a high level have taught me to make fast decisions, stay calm under pressure, and be resourceful in tough situations. At 15 I played adult semi-pro football, making me used to handling pressure and having responsibility from a young age. Learning chess and my love of board games have also strengthened my strategic thinking and problem-solving — I see that in tennis, and in my professional life.",
      items: [],
      skills: "Fast decision making · Calm under pressure · Resourceful · Strategic thinking · Problem solving",
    },
    {
      group: "Consistency",
      how: "I played football at a high level from the age of 4 to 18, including semi-pro adult football at 15. That taught me how much consistency matters — discipline, hard work, and showing up pay off in the long term, even when there are no immediate results. Tennis taught me the same thing another way: if you lose a point, the only thing that matters is the next one. I use that in everyday life and at work — when something goes wrong I focus on what I can improve, and what I can do from now on.",
      items: [],
      skills: "Consistency · Reliability · Discipline · Persistence",
    },
    {
      group: "Team player",
      how: "Fourteen years in a football team made me a strong team player — I can fit into most environments and work with many different people. I have seen first-hand how working with others, with good communication, helps you reach a goal. Captaining my team was an important step for my leadership. Co-founding gocourt with a friend showed me how splitting the work makes things more efficient, and that trusting other people is key.",
      items: [],
      skills: "Communication · Teamwork · Leadership",
    },
  ],
  sports: {
    quote: "Who I am",
    body: "I grew up in a multicultural environment in Athens, Greece, in a French-speaking household. Sport has always been where I am happiest — it made me lifelong friends, and I have always loved competition.",
  },
  hobbies: [
    { id: "football", label: "Football" },
    { id: "skiing", label: "Skiing" },
    { id: "tennis-padel", label: "Tennis & Padel" },
    { id: "board-games", label: "Board Games" },
  ],
  programmingLanguages: [
    { id: "python", label: "Python" },
    { id: "javascript", label: "JavaScript" },
    { id: "java", label: "Java" },
    { id: "cpp", label: "C++" },
  ],
  techStack: [
    { id: "python", label: "Python", mark: "Py", tone: "solid" },
    { id: "javascript", label: "JavaScript", mark: "JS", tone: "solid" },
    { id: "java", label: "Java", mark: "Java", tone: "solid" },
    { id: "cpp", label: "C++", mark: "C++", tone: "solid" },
    { id: "react", label: "React", mark: "Re", tone: "solid" },
    { id: "node", label: "Node.js", mark: "Node", tone: "solid" },
    { id: "postgres", label: "PostgreSQL", mark: "SQL", tone: "solid" },
    { id: "git", label: "Git", mark: "Git", tone: "solid" },
    { id: "express", label: "Express", mark: "Ex", tone: "ghost" },
    { id: "matlab", label: "MATLAB", mark: "M", tone: "ghost" },
    { id: "socket", label: "Socket.IO", mark: "IO", tone: "ghost" },
    { id: "mcp", label: "MCP", mark: "MCP", tone: "ghost" },
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
