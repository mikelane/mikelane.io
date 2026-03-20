export const hero = {
  name: "Michael Lane",
  completions: ["accessible", "fast", "disappear"],
  proof:
    "Currently putting Claude in the hands of 200+ people who aren't engineers.",
};

export const navLinks = [
  { label: "BUILD", href: "#build" },
  { label: "LEAD", href: "#lead" },
  { label: "THINK", href: "#think" },
  { label: "CONTACT", href: "#contact" },
];

export const buildCards = [
  {
    title: "Making Claude Accessible",
    description:
      "Built an enterprise AI platform connecting non-technical users to Claude through Open WebUI, custom Electron apps, and a fleet of MCP servers.",
    metric: "200+ non-technical users",
    stack: ["Open WebUI", "Electron", "LiteLLM", "MCP"],
  },
  {
    title: "47,000 Translations Per Second",
    description:
      "High-performance COBOL flat-file to JSON transformation service. 13M+ records processed in 5 minutes with zero errors.",
    metric: "13M+ records, zero errors",
    stack: ["Rust", "Axum"],
  },
  {
    title: "9 Days to 1 Hour",
    description:
      "CLI tool with plugin architecture that automated developer environment provisioning, slashing onboarding time.",
    metric: "Onboarding time reduction",
    stack: ["Python", "Plugin Architecture"],
  },
];

export const leadRings = [
  {
    level: "IC at Scale",
    summary: "Building systems that serve tens of thousands",
    metrics: ["50K users", "99.99% uptime", "Millions msgs/day"],
    details: [
      "Designed and operated high-availability messaging infrastructure",
      "Built real-time data pipelines processing millions of events daily",
      "Maintained five-nines uptime across distributed systems",
    ],
  },
  {
    level: "Team Lead",
    summary: "Growing teams and cutting costs",
    metrics: ["8-person team", "38% cost cut", "MTTR ~1 hour", "CI/CD unify"],
    details: [
      "Led cross-functional team delivering platform infrastructure",
      "Reduced cloud spend by 38% through architecture optimization",
      "Unified CI/CD pipelines across multiple product teams",
      "Drove mean time to recovery down to under one hour",
    ],
  },
  {
    level: "Technical Leader",
    summary: "Setting standards across the organization",
    metrics: ["Org-wide standards", "15+ mentored", "Federal modernization"],
    details: [
      "Established engineering standards adopted across the organization",
      "Mentored 15+ engineers from junior to senior levels",
      "Led federal systems modernization roadmap",
    ],
  },
];

export const leadNarrative =
  "I started in mathematics, navigated aircraft for the Air Force, then pivoted through machine learning into backend engineering and infrastructure. Each chapter taught me something about making complex systems work for the people who depend on them.";

export const thinkCards = [
  {
    title: "Why I Built 6 MCP Servers (And What I Learned)",
    tags: ["AI", "MCP"],
  },
  {
    title: "Rust for the Python Engineer",
    tags: ["Rust", "Performance"],
  },
  {
    title: "Making AI Accessible to People Who Don't Know What AI Is",
    tags: ["AI", "Leadership"],
  },
];

export const contact = {
  cta: "Currently exploring opportunities where I can build internal tools that make teams more effective.",
  links: [
    { label: "GitHub", href: "https://github.com/mikelane", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/mike-lane",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:mike@mikelane.io", icon: "email" },
  ],
};
