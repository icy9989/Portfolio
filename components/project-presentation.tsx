import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { technologyColor, type Project } from "@/lib/projects";

export const actionClass = "inline-flex min-h-11 items-center gap-2 rounded-xl text-sm font-semibold text-brand transition-colors hover:text-brand-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export function ProjectLinks({ project, iconOnly = false }: { project: Project; iconOnly?: boolean }) {
  const links = [
    { label: "GitHub", url: project.githubUrl, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.8c0-1.1-.4-1.8-.9-2.2 3-.3 6.2-1.5 6.2-6.8 0-1.5-.5-2.7-1.4-3.7.1-.4.6-1.8-.1-3.6 0 0-1.1-.4-3.8 1.4a13 13 0 0 0-7 0C5.3 1.5 4.2 1.9 4.2 1.9c-.7 1.8-.2 3.2-.1 3.6a5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.2 6.5 6.2 6.8-.5.4-.9 1.2-.9 2.2V22" />
              </svg>, variant: "default" as const },
    { label: "Live Preview", url: project.liveUrl, icon: <ExternalLink aria-hidden="true" className="size-5" />, variant: "outline" as const },
  ];
  return <>{links.filter(({ url }) => url?.trim()).map(({ label, url, icon, variant }) => (
    <Button key={label} asChild variant={iconOnly ? "ghost" : variant} size={iconOnly ? "icon" : "lg"}
      className={iconOnly
        ? "size-11 rounded-xl text-brand hover:bg-brand/10 hover:text-brand-bright"
        : variant === "default"
          ? "h-11 gap-2 rounded-xl bg-brand px-5 text-primary-foreground hover:bg-brand/85"
          : "h-11 gap-2 rounded-xl border-brand/50 bg-transparent px-5 text-brand hover:bg-brand/10 hover:text-brand-bright dark:border-brand/50 dark:bg-transparent dark:hover:bg-brand/10"}>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: ${label} (opens in a new tab)`} title={iconOnly ? label : undefined}>
        {icon}{!iconOnly && label}
      </a>
    </Button>
  ))}</>;
}

export function TechnologyPills({ technologies }: { technologies: Project["technologies"] }) {
  if (!technologies.length) return null;
  return <ul aria-label="Technologies" className="flex flex-wrap gap-2">{technologies.map((technology) => <li key={technology} data-color={technologyColor(technology)} className="project-pill max-w-full rounded-xl px-2.5 py-1 text-xs font-medium wrap-anywhere transition-transform motion-safe:hover:-translate-y-0.5">{technology}</li>)}</ul>;
}

