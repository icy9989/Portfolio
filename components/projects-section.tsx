"use client";

import { ProjectCard } from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectCategories, type Project } from "@/lib/projects";

export function ProjectsSection({ projects }: { projects: readonly Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-16 text-copy-primary sm:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <h2 id="projects-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"><span className="bg-linear-to-r from-brand to-brand-bright bg-clip-text text-transparent">Projects</span></h2>
        <p className="mt-5 text-base leading-7 text-copy-secondary">A collection of projects showcasing my experience across web, mobile, AI/ML, robotics, and software engineering.</p>
      </header>
      <Tabs defaultValue="All" className="gap-8">
        <TabsList aria-label="Filter projects by category" className="mx-auto h-auto! max-w-full flex-wrap gap-2 rounded-2xl bg-surface-elevated p-2">
          {projectCategories.map((category) => <TabsTrigger key={category} value={category} className="project-filter min-h-11 flex-none rounded-xl px-4 py-2 text-copy-secondary">{category}</TabsTrigger>)}
        </TabsList>
        {projectCategories.map((category) => {
          const filtered = projects.filter((project) => category === "All" || project.category === category);
          return (
            <TabsContent key={category} value={category} className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              {filtered.length ? <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">{filtered.map((project, index) => <div key={project.id} className="project-enter min-w-0" style={{ animationDelay: `${Math.min(index, 5) * 50}ms` }}><ProjectCard project={project} /></div>)}</div> : <p className="rounded-2xl border border-surface-border bg-surface p-8 text-center leading-7 text-copy-secondary">{category === "All" ? "Projects will be added soon." : `No ${category} projects to show yet.`}</p>}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
