export interface Milestone {
  id: string;
  type: "Education" | "Experience";
  title: string;
  organization: string;
  /** ISO year, year-month, or full date. */
  startDate: string;
  /** null denotes an ongoing milestone. */
  endDate: string | null;
  location?: string;
  description: string;
  skills: readonly string[];
}

// Source: public/resume-2026.pdf. Preserve its year-level date precision.
export const milestones: readonly Milestone[] = [
  {
    id: "sfbu-masters",
    type: "Education",
    title: "Master of Science in Computer Science",
    organization: "San Francisco Bay University",
    startDate: "2024",
    endDate: "2026",
    description: "University capstone: built a modular edge-server robotics framework with real-time perception, autonomous navigation, voice interaction, and AI-driven decision making.",
    skills: ["Python", "Raspberry Pi", "Arduino", "AI/LLM"],
  },
  {
    id: "freelance",
    type: "Experience",
    title: "Freelance Full Stack Developer",
    organization: "Freelance",
    startDate: "2023",
    endDate: "2024",
    description: "Built responsive websites and web applications for businesses, developed reusable UI components and backend services, and managed design, development, testing, and deployment.",
    skills: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    id: "trailblazer",
    type: "Experience",
    title: "Full Stack Developer",
    organization: "Trailblazer Co.,Ltd",
    startDate: "2022",
    endDate: "2023",
    description: "Developed full-stack web applications and RESTful APIs, designed database schemas, optimized SQL data access, and collaborated on scalable microservice-based solutions.",
    skills: ["React", "Node.js", "Express.js", "Sequelize", "SQL"],
  },
  {
    id: "miit-bachelors",
    type: "Education",
    title: "B.E.(Hons) in Computer Science and Engineering",
    organization: "Myanmar Institute of Information Technology",
    startDate: "2015",
    endDate: "2022",
    description: "Studied Computer Science and Engineering in the Bachelor of Engineering (Honours) program.",
    skills: [],
  },
  {
    id: "meta-odoo",
    type: "Experience",
    title: "Odoo Developer",
    organization: "MetaTeam Myanmar Co.,Ltd",
    startDate: "2019",
    endDate: "2020",
    description: "Customized Odoo ERP modules using Python, JavaScript, XML, and PostgreSQL.",
    skills: ["Python", "JavaScript", "XML", "PostgreSQL"],
  },
];

export function sortMilestones(entries: readonly Milestone[]): Milestone[] {
  return [...entries].sort((a, b) => {
    const endOrder = (b.endDate ?? "9999").localeCompare(a.endDate ?? "9999");
    return endOrder || b.startDate.localeCompare(a.startDate);
  });
}

export function formatMilestoneDate(date: string): string {
  if (date.length === 4) return date;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    ...(date.length === 10 ? { day: "numeric" as const } : {}),
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
