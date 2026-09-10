import { Activity, Clock3, Gauge, Rocket, Lightbulb, Mountain, Tag } from "lucide-react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectLinks, TechnologyPills } from "@/components/project-presentation";
import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/lib/projects";

export function ProjectDetailBody({ project }: { project: Project }) {
  const challenge = project.challenge?.trim();
  const solution = project.solution?.trim();
  const metrics = [
    { label: "Uptime", icon: Activity, value: project.uptime },
    { label: "Load time", icon: Clock3, value: project.loadTime },
    { label: "Performance score", icon: Gauge, value: project.performanceScore },
    { label: "Deployment status", icon: Rocket, value: project.deploymentStatus },
  ].filter(({ value }) => value !== undefined && value !== null && String(value).trim() !== "" && String(value).trim().toLowerCase() !== "n/a");

  return (
    <>
      <DialogHeader className="min-w-0 pr-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand"><Tag aria-hidden="true" className="size-4" />{project.category}</p>
        <DialogTitle className="bg-linear-to-r from-brand to-brand-bright bg-clip-text text-2xl font-bold leading-tight text-transparent wrap-anywhere sm:text-3xl">{project.title}</DialogTitle>
        <DialogDescription className="whitespace-pre-line text-base leading-7 text-copy-secondary wrap-anywhere">{project.description}</DialogDescription>
      </DialogHeader>
      <TechnologyPills technologies={project.technologies} />
      <ProjectMedia project={project} />
      {project.details?.trim() && <p className="project-detail-enter whitespace-pre-line text-sm leading-7 text-copy-secondary wrap-anywhere">{project.details}</p>}
      {(challenge || solution) && <div className={`grid min-w-0 gap-5 ${challenge && solution ? "md:grid-cols-2" : ""}`}>
        {[{ heading: "The Challenge", content: challenge, icon: Mountain }, { heading: "The Solution", content: solution, icon: Lightbulb }].map(({ heading, content, icon: Icon }) => content ? <section key={heading} className="project-detail-enter min-w-0 rounded-2xl border border-brand/15 bg-surface-elevated p-5">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-copy-primary"><Icon aria-hidden="true" className="size-5 shrink-0 text-brand" />{heading}</h3>
          <p className="whitespace-pre-line text-sm leading-7 text-copy-secondary wrap-anywhere">{content}</p>
        </section> : null)}
      </div>}
      {metrics.length > 0 && <dl aria-label="Project metrics" className="project-detail-enter grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
        {metrics.map(({ label, value, icon: Icon }) => <div key={label} className="min-w-0 rounded-2xl border border-brand/15 bg-surface-elevated p-4">
          <dt className="flex items-center gap-2 text-xs font-medium text-copy-secondary"><Icon aria-hidden="true" className="size-4 shrink-0 text-brand" />{label}</dt>
          <dd className="mt-2 text-lg font-semibold text-brand wrap-anywhere">{value}</dd>
        </div>)}
      </dl>}
      {(project.githubUrl?.trim() || project.liveUrl?.trim()) && <div className="flex flex-wrap gap-3 pt-2"><ProjectLinks project={project} /></div>}
    </>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <DialogContent className="project-detail-scroll max-h-[90dvh] min-w-0 gap-6 overflow-y-auto rounded-3xl border border-brand/20 bg-surface p-6 text-copy-primary shadow-xl shadow-brand/10 sm:max-w-5xl sm:p-8 dark:shadow-brand/15 [&>[data-slot=dialog-close]]:size-11 [&>[data-slot=dialog-close]]:rounded-xl [&>[data-slot=dialog-close]]:text-copy-primary [&>[data-slot=dialog-close]]:focus-visible:outline-2 [&>[data-slot=dialog-close]]:focus-visible:outline-brand">
      <ProjectDetailBody project={project} />
    </DialogContent>
  );
}
