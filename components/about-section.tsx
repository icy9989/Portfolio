import { Suspense } from "react";
import { Atom, Braces, Code2, Cpu, FileCode2, Server } from "lucide-react";
import { GithubShowcase } from "@/components/github-showcase";

const skills = [
  { name: "React", icon: Atom },
  { name: "JavaScript", icon: Braces },
  { name: "TypeScript", icon: FileCode2 },
  { name: "Next.js", icon: Code2 },
  { name: "Node.js", icon: Server },
  { name: "Python", icon: Code2 },
  { name: "AI/ML", icon: Cpu },
];

const developerFields = [
  { key: "name", value: '"Vicky"' },
  { key: "role", value: '"Software Engineer"' },
  { key: "skills", value: '["React", "TypeScript", "Next.js", "Node.js", "Python"]' },
  { key: "interests", value: '["Full-stack development", "AI/ML", "Open source"]' },
  { key: "focus", value: '["Scalable systems", "Reliable software", "User-focused experiences"]' },
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="about-section py-16 sm:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <h2 id="about-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">About <span className="text-brand">Me</span></h2>
        <div aria-hidden="true" className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
        <p className="mt-5 text-base leading-7 text-copy-secondary">Passionate developer with a love for clean code, and open source contributions.</p>
      </header>
      <Suspense fallback={<div role="status" className="rounded-2xl bg-surface p-10 text-center text-copy-secondary">Loading GitHub activity…</div>}>
        <GithubShowcase />
      </Suspense>
      <div className="mt-10 grid items-start gap-8 sm:mt-14 lg:grid-cols-2 lg:gap-12">
        <div className="about-enter min-w-0 overflow-hidden rounded-2xl border border-editor-border bg-editor-bg text-editor-text shadow-xl shadow-brand/5 transition-shadow hover:shadow-lg hover:shadow-brand/5">
          <div className="flex items-center gap-4 border-b border-editor-border bg-editor-header px-5 py-4">
            <div className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-window-close" /><span className="size-2.5 rounded-full bg-window-minimize" /><span className="size-2.5 rounded-full bg-window-expand" /></div>
            <span className="font-mono text-xs text-editor-muted">developer.ts</span>
          </div>
          <pre className="whitespace-pre-wrap break-words p-5 font-mono text-xs leading-7 sm:p-7 sm:text-sm"><code><span className="text-syntax-keyword">const</span>{" "}<span className="text-syntax-property">developer</span>{" = "}<span className="text-syntax-bracket">{"{"}</span>{"\n"}{developerFields.map(({ key, value }) => <span key={key}>{"  "}<span className="text-syntax-property">{key}</span>{": "}{value.split(/("[^"]*")/g).filter(Boolean).map((token, index) => <span key={index} className={token.startsWith('"') ? "text-syntax-string" : "text-syntax-bracket"}>{token}</span>)}{",\n"}</span>)}<span className="text-syntax-bracket">{"}"}</span>{";"}</code></pre>
        </div>
        <div className="about-enter min-w-0 lg:py-2">
          <p className="mb-3 font-mono text-xs tracking-widest text-brand uppercase">A little about me</p>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Khaing Min Htwe Vicky</h3>
          <p className="mt-2 font-medium text-brand">Software Engineer</p>
          <p className="mt-5 leading-8 text-copy-secondary">I’m a Full Stack Software Engineer passionate about building scalable, user-focused applications. I work across frontend, backend, databases, and AI-powered systems, using modern technologies to turn ideas into reliable software solutions.</p>
          <h4 className="mt-7 text-sm font-semibold">Main technologies</h4>
          <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Main technologies">
            {skills.map(({ name, icon: Icon }) => <li key={name} className="flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-3.5 py-2 text-sm text-brand transition duration-200 hover:border-brand/50 hover:bg-brand/10 motion-safe:hover:-translate-y-0.5"><Icon className="size-4" aria-hidden="true" />{name}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
