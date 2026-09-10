import Image from "next/image";
import { ArrowRight, Code2 } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type Project } from "@/lib/projects";

import { ProjectDetail } from "@/components/project-detail";
import { actionClass, ProjectLinks, TechnologyPills } from "@/components/project-presentation";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-surface shadow-md shadow-brand/10 dark:shadow-xl dark:shadow-brand/20 transition duration-300 hover:shadow-xl hover:shadow-brand/10 dark:hover:shadow-2xl dark:hover:shadow-brand/30 motion-safe:hover:-translate-y-1">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-linear-to-br from-brand/15 via-surface-elevated to-brand-bright/10">
          {project.thumbnail ? <Image src={project.thumbnail} alt={`${project.title} preview`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" /> : <Code2 aria-hidden="true" className="size-8 text-brand" />}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="mb-3 text-xs font-semibold tracking-wide text-brand">{project.category}</p>
          <TechnologyPills technologies={project.technologies} />
          <h3 className="mt-5 text-xl font-bold tracking-tight wrap-anywhere">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-copy-secondary wrap-anywhere">{project.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
            <DialogTrigger className={actionClass} aria-label={`View Project: ${project.title}`}>View Project<ArrowRight aria-hidden="true" className="size-4" /></DialogTrigger>
            {(project.githubUrl?.trim() || project.liveUrl?.trim()) && <div className="ml-auto flex items-center gap-1"><ProjectLinks project={project} iconOnly /></div>}
          </div>
        </div>
      </article>
      <ProjectDetail project={project} />
    </Dialog>
  );
}
