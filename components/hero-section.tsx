import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { HeroDecorations } from "@/components/hero-decorations";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const technologies = ["Development", "AI/ML", "Code", "Cloud", "DevOps", "Web", "UI/UX"];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate grid min-h-[calc(100svh-5rem)] items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:py-24">
      <HeroDecorations />
      <div className="hero-introduction min-w-0 text-center lg:text-left">
        <p className="mb-5 font-mono text-sm tracking-wide text-brand">Hello, I’m</p>
        <h1 id="hero-heading" className="text-5xl leading-[1.08] font-bold tracking-tight text-copy-primary sm:text-6xl xl:text-7xl">
          Khaing Min Htwe
        </h1>
        <p className="mt-5 text-2xl font-semibold tracking-tight text-brand sm:text-3xl">Software Engineer</p>
        <p className="mx-auto mt-6 max-w-xl text-base lg:mx-0 leading-8 text-copy-secondary sm:text-lg">
          Full Stack Software Engineer passionate about building scalable web applications, AI-powered systems, and reliable products that solve real-world problems.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
          <Button asChild size="lg" className="h-11 rounded-xl sm:h-12 bg-brand px-5 text-primary-foreground hover:bg-brand/90 motion-safe:hover:-translate-y-0.5">
            <a href="/resume-2026.pdf" download>
              <Download className="size-5" aria-hidden="true" />
              Download Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11 rounded-xl sm:h-12 border-brand/40 bg-brand/10 px-5 text-brand hover:bg-brand/20 hover:text-brand motion-safe:hover:-translate-y-0.5">
            <a href="#contact">Contact Me <ArrowUpRight className="size-5" aria-hidden="true" /></a>
          </Button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
          <Button asChild variant="ghost" size="icon" className="size-11 rounded-xl border-brand/20 bg-brand/10 p-3 text-brand shadow-sm hover:border-brand/40 hover:bg-brand/20 hover:text-brand">
            <a href="https://github.com/icy9989" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
              <GitHubIcon />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="size-11 rounded-xl border-brand/20 bg-brand/10 p-3 text-brand shadow-sm hover:border-brand/40 hover:bg-brand/20 hover:text-brand">
            <a href="https://www.linkedin.com/in/kmhtwe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
              <LinkedInIcon />
            </a>
          </Button>
        </div>
      </div>
      <div className="hero-profile relative isolate mx-auto aspect-square w-full max-w-[18rem] min-w-0 sm:max-w-[27rem]">
        <div aria-hidden="true" className="hero-glow absolute inset-8 -z-10 rounded-full bg-brand/15 blur-2xl" />
        <svg aria-hidden="true" viewBox="0 0 480 480" className="hero-technology-ring absolute inset-0 size-full overflow-visible">
          <defs>
            <path id="hero-technology-path" d="M 240,240 m 0,-214 a 214,214 0 1,1 0,428 a 214,214 0 1,1 0,-428" />
          </defs>
          <circle cx="240" cy="240" r="234" fill="none" stroke="var(--ring-outer)" strokeWidth="2.5" />
          <circle cx="240" cy="240" r="202" fill="none" stroke="var(--brand-bright)" strokeWidth="3" />
          <text fill="var(--foreground)" fontSize="16" fontWeight="500" letterSpacing="1.5">
            {technologies.map((technology, index) => (
              <textPath key={technology} href="#hero-technology-path" startOffset={`${(index + 0.5) * 100 / technologies.length}%`} textAnchor="middle">
                {technology}
              </textPath>
            ))}
          </text>
          <text fill="var(--brand-bright)" fontSize="18">
            {technologies.map((technology, index) => (
              <textPath key={technology} href="#hero-technology-path" startOffset={`${index * 100 / technologies.length}%`} textAnchor="middle">·</textPath>
            ))}
          </text>
        </svg>
        <p className="sr-only">{technologies.join(", ")}.</p>
        <div className="absolute inset-[8.5%] overflow-hidden rounded-full bg-surface">
          <Image src="/profile.png" alt="Khaing Min Htwe" fill sizes="(max-width: 639px) min(239px, calc(83vw - 46px)), 359px" loading="eager" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
