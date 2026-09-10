import Image from "next/image";
import {
  Atom, Braces, BrainCircuit, Cloud, Code2, Container, Database,
  FileCode2, GitBranch, Leaf, MessageSquareText, Palette,
  Server, Terminal,
} from "lucide-react";
import type { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.9a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.7S17.5.6 15 2.4a13 13 0 0 0-6 0C6.5.6 5.3 1 5.3 1a5 5 0 0 0-.1 3.7 5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.2 6.6 6.2 6.9a3.4 3.4 0 0 0-.9 2.7V22" />
    </svg>
  );
}

// Add technologies here; both marquee copies stay in sync automatically.
interface Skill {
  name: string;
  icon: typeof Code2 | typeof GithubIcon;
  color: string;
  image?: string;
}

const skills: Skill[] = [
  { name: "HTML", image: "/html.png", icon: Code2, color: "var(--skill-html)" },
  { name: "CSS", image: "/css.png", icon: Palette, color: "var(--skill-css)" },
  { name: "JavaScript", image: "/javascript.png", icon: Braces, color: "var(--skill-javascript)" },
  { name: "TypeScript", image: "/typescript.png", icon: FileCode2, color: "var(--skill-typescript)" },
  { name: "React", image: "/react.png", icon: Atom, color: "var(--skill-react)" },
  { name: "Next.js", image: "/next.js.png", icon: Code2, color: "var(--foreground)" },
  { name: "Node.js", image: "/node.js.png", icon: Server, color: "var(--skill-node)" },
  { name: "Python", image: "/python.png", icon: Terminal, color: "var(--skill-python)" },
  { name: "PostgreSQL", image: "/postgresql.png", icon: Database, color: "var(--skill-postgresql)" },
  { name: "MongoDB", image: "/mongoDb.png", icon: Leaf, color: "var(--skill-node)" },
  { name: "Prisma", icon: Database, color: "var(--foreground)" },
  { name: "Git", icon: GitBranch, color: "var(--skill-git)" },
  { name: "GitHub", icon: GithubIcon, color: "var(--foreground)" },
  { name: "Docker", image: "/docker.png", icon: Container, color: "var(--skill-css)" },
  { name: "AWS", icon: Cloud, color: "var(--skill-aws)" },
  { name: "AI/ML", icon: BrainCircuit, color: "var(--primary)" },
  { name: "NLP", icon: MessageSquareText, color: "var(--brand-bright)" },
];

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative min-w-0 w-full py-16 text-copy-primary sm:py-24">
      <header className="mb-10 px-7 text-center sm:mb-14">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.24em] text-brand-bright">My developer toolkit</p>
        <h2 id="skills-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Skills</h2>
        <div aria-hidden="true" className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-brand to-brand-bright" />
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-copy-secondary sm:text-base">The technologies I use to turn ideas into thoughtful digital experiences.</p>
      </header>
      <div className="skills-marquee relative w-full overflow-hidden border-y border-brand/10 bg-surface-elevated py-8 sm:py-10">
        <div className="skills-track flex w-max">
          {[false, true].map((duplicate) => (
            <ul
              key={String(duplicate)}
              aria-hidden={duplicate ? true : undefined}
              aria-label={duplicate ? undefined : "Technical skills"}
              className="skills-list flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24"
            >
              {skills.map(({ name, icon: Icon, color, image }) => (
                <li key={name} className="group flex shrink-0 items-center gap-5 whitespace-nowrap text-lg font-semibold tracking-tight sm:gap-6 sm:text-2xl">
                  <span aria-hidden="true" className="relative flex size-12 shrink-0 items-center justify-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-6 sm:size-14">
                    {image ? (
                      <Image
                        src={image}
                        alt=""
                        width={56}
                        height={56}
                        className={`size-full object-contain${name === "Next.js" ? " rounded-full bg-[var(--skill-logo-backdrop)] p-1" : ""}`}
                      />
                    ) : (
                      <Icon className="size-10 sm:size-11" style={{ color }} />
                    )}
                  </span>
                  <span className="text-copy-primary">{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
