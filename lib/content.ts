export const content = {
  name: "Alex Polychroniadis",
  shortName: "Alex P.",
  location: "London, UK",
  email: "Alexandros.polychroniadis@gmail.com",
  linkedin: "https://linkedin.com/in/alexpolychroniadis",
  linkedinLabel: "linkedin.com/in/alexpolychroniadis",
  roleLine: "AI · CS · Engineering · Data · Sports",
  roleParts: ["AI", "CS", "Engineering", "Data", "Sports"],
  intersection:
    "GoCourt is where my two passions meet: computer science and sport. Playing racquet sports regularly in Greece, I kept running into the same problem — you could not simply book a court for the hour you wanted. It was phone calls, guesswork, and hoping the fifth club you called had a court free. That gap is why I co-founded gocourt.gr with a friend. Talking to clubs, we found we could be just as useful to them, so we built an owner dashboard that helps with their everyday tasks and needs. It is now live in pilot with clubs around Athens, and the goal stays simple: less time arranging a game, more time playing it.",
  heroLead:
    "Raised in Athens between Greek, French, and English. I study engineering at Bath, and I have played sport at a high level since I was a child.",
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
        "Initiated an LLM and agentic solution on the Heathrow project after seeing how useful one could be for its testing work: a Python MCP server (FastMCP, httpx, REST) so engineers could create and manage SpiraTest cases through AI tools instead of clicking through a UI.",
      ],
    },
    {
      org: "ELTRAK S.A.",
      role: "Marine Sales Engineer Intern",
      period: "August – September 2024",
      place: "Athens",
      bullets: [
        "Worked with clients and engineering on marine equipment (motors, generators, cranes), turning customer asks into clear technical offers.",
        "Built priced proposals in CAT and Palfinger and supported a large shipboard install from drawings.",
      ],
    },
  ],
  earlyInternships: [
    {
      org: "pH7 Advertising",
      role: "Client service intern",
      period: "June 2023",
      place: "Athens",
      bullets: [
        "Sat in on client meetings, built presentations, and helped run projects and social media for multinational brands.",
        "Helped organise a staff and partner event for Unilever Hellas.",
      ],
    },
    {
      org: "Atlético Madrid camp",
      role: "Coach",
      period: "July 2023",
      place: "Athens",
      bullets: [
        "Coached under-10s and settled arguments between the kids.",
        "Spotted players for academy trials in Spain.",
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
    body: "Raised in Athens in a multicultural environment, speaking Greek, French, and English. Sport is where I am the happiest, playing competitive football from a very young age.",
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
    { label: "JavaScript", icon: "javascript" },
    { label: "Python", icon: "python" },
    { label: "React", icon: "react" },
    { label: "Node.js", icon: "nodedotjs" },
    { label: "PostgreSQL", icon: "postgresql" },
    { label: "MCP", icon: "modelcontextprotocol" },
    { label: "LLMs", icon: "llm" },
    { label: "Java", icon: "java" },
    { label: "C++", icon: "cplusplus" },
    { label: "Swift", icon: "swift" },
    { label: "Supabase", icon: "supabase" },
    { label: "Express", icon: "express" },
    { label: "Capacitor (iOS/Android)", icon: "capacitor" },
    { label: "Socket.IO", icon: "socketdotio" },
    { label: "REST APIs", icon: "rest" },
    { label: "Git/GitHub", icon: "git" },
    { label: "GitHub Actions", icon: "githubactions" },
    { label: "Cloudflare", icon: "cloudflare" },
    { label: "Google Maps API", icon: "googlemaps" },
    { label: "Claude Code", icon: "claude" },
    { label: "Cursor", icon: "cursor" },
  ],
  projects: [
    {
      id: "gocourt",
      kicker: "Product · co-founded with a friend",
      title: "GoCourt.gr",
      body: "A court-booking marketplace that connects sports club owners and players. It is live in pilot mode with club owners around Athens, and the owner dashboard uses PostgreSQL-backed analytics so clubs can see how their courts are performing.",
      tags: ["React", "Capacitor", "Node.js", "Express", "PostgreSQL", "Socket.IO"],
      links: [{ destination: "gocourt", label: "Visit gocourt.gr" }],
    },
    {
      id: "spiratest-mcp",
      kicker: "AI tooling · Heathrow PLC/SCADA upgrade · Firstco",
      title: "SpiraTest MCP server",
      body: "Built under the Heathrow Airport PLC/SCADA upgrade, where I worked on an LLM and agentic solution to the project’s test management problem. The result is a Python MCP server that lets engineers create and manage SpiraTest test cases through AI tools instead of clicking through a UI.",
      tags: ["Python", "MCP", "LLMs", "AI agents", "FastMCP", "REST APIs"],
      links: [],
    },
    {
      id: "studio",
      kicker: "University of Bath · IMEE",
      title: "Engineering studio work",
      body: "Year one and year two studio projects from the Integrated Mechanical and Electrical Engineering degree, collected in Mahara portfolios.",
      tags: [],
      links: [
        { destination: "year1", label: "Year 1 portfolio" },
        { destination: "year2", label: "Year 2 portfolio" },
      ],
    },
    {
      id: "f1-in-schools",
      kicker: "Motorsport engineering · Team",
      title: "F1 in Schools",
      body: "Part of the team that won the F1 in Schools national championship in Greece and qualified for the World Finals in Singapore. I worked as the team’s FEA and CFD analyst, simulating the car’s structure and aerodynamics.",
      tags: ["CFD", "FEA", "Aerodynamics", "Simulation"],
      links: [],
    },
  ],
  nav: [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ],
  seo: {
    title: "Alex Polychroniadis — London",
    description:
      "Engineer and co-founder of gocourt.gr. Grew up between Greek, French, and English. Sport, web, and systems.",
  },
} as const;

export type Destination = (typeof content.destinations)[number];
