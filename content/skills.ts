export type Skill = { title: string; body: string; icon: "code" | "server" | "database" | "cloud" | "check" | "people" }

export const SKILLS: readonly Skill[] = [
  {
    title: "Frontend",
    icon: "code",
    body: "React, Next.js, TypeScript, Tailwind CSS, Material UI, shadcn/ui, Redux/Saga, Web Components, React Native",
  },
  {
    title: "Backend",
    icon: "server",
    body: "Go, Node.js, NestJS, Bun, Express, Serverless, WebRTC, RTSP, REST APIs",
  },
  {
    title: "Databases",
    icon: "database",
    body: "PostgreSQL, MySQL, MongoDB, SQLite, Turso, Redis, Drizzle ORM, ElasticSearch",
  },
  {
    title: "Infrastructure",
    icon: "cloud",
    body: "Docker, AWS Lambda/SQS/SNS, Nginx, CI/CD, GitHub Actions, Ansible, Raspberry Pi",
  },
  {
    title: "Testing",
    icon: "check",
    body: "Jest, Cypress, Playwright, React Testing Library, Storybook, TDD, BDD",
  },
  {
    title: "Leadership",
    icon: "people",
    body: "Team leadership, architecture decisions, stakeholder communication, mentoring, Agile/Scrum",
  },
] as const

export const HACKATHONS: readonly { place: string; date: string }[] = [
  { place: "1st place, Hackathon Like IT", date: "Apr 2017" },
  { place: "4th place, Startup Hackathon Kyiv", date: "Jul 2018" },
  { place: "3rd place, Hackathon Like IT", date: "Nov 2019" },
] as const
