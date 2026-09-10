import { BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { MilestoneReveal } from "@/components/milestone-reveal";
import { formatMilestoneDate, milestones, sortMilestones } from "@/lib/milestones";

export function MilestonesSection() {
  return (
    <section id="milestones" aria-labelledby="milestones-heading" className="py-16 text-copy-primary sm:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <p className="mb-4 text-sm font-semibold text-brand">My Journey</p>
        <h2 id="milestones-heading" className="bg-linear-to-r from-brand to-brand-bright bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">Milestones</h2>
        <p className="mt-5 text-base leading-7 text-copy-secondary">A timeline of my education, experience, and growth as a software engineer.</p>
      </header>
      <ol aria-label="Education and experience, newest first" className="relative mx-auto max-w-5xl space-y-8 before:absolute before:inset-y-6 before:left-5 before:w-0.5 before:-translate-x-1/2 before:bg-linear-to-t before:from-brand/20 before:via-brand/50 before:to-brand-bright lg:space-y-10 lg:before:left-1/2">
        {sortMilestones(milestones).map((milestone, index) => {
          const education = milestone.type === "Education";
          const Icon = education ? GraduationCap : BriefcaseBusiness;
          const accent = education ? "text-brand-bright" : "text-brand";

          return (
            <MilestoneReveal key={milestone.id}>
              <span aria-hidden="true" className={`milestone-marker absolute top-6 left-5 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-xl border border-brand/30 bg-surface-elevated shadow-sm shadow-brand/10 lg:left-1/2 ${accent}`}>
                <Icon className="size-5" />
              </span>
              <article className={`milestone-card relative min-w-0 rounded-2xl border border-brand/15 bg-surface p-5 shadow-lg shadow-brand/5 sm:p-7 ${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold">
                  <p className={accent}>
                    <time dateTime={milestone.startDate}>{formatMilestoneDate(milestone.startDate)}</time>
                    {" – "}
                    {milestone.endDate ? <time dateTime={milestone.endDate}>{formatMilestoneDate(milestone.endDate)}</time> : "Present"}
                  </p>
                  <span className={`rounded-xl px-3 py-1 ${education ? "bg-brand-bright/10 text-brand-bright" : "bg-brand/10 text-brand"}`}>{milestone.type}</span>
                </div>
                <h3 className="mt-4 text-xl leading-snug font-bold tracking-tight wrap-break-word">{milestone.title}</h3>
                <p className="mt-2 font-medium wrap-break-word">{milestone.organization}</p>
                {milestone.location && <p className="mt-2 flex items-start gap-2 text-sm text-copy-secondary"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />{milestone.location}</p>}
                <p className="mt-4 text-sm leading-7 text-copy-secondary">{milestone.description}</p>
                {milestone.skills.length > 0 && <ul aria-label="Relevant skills" className="mt-5 flex flex-wrap gap-2">
                  {milestone.skills.map((skill) => <li key={skill} className="rounded-xl bg-surface-elevated px-3 py-1.5 text-xs font-medium text-copy-secondary">{skill}</li>)}
                </ul>}
              </article>
            </MilestoneReveal>
          );
        })}
      </ol>
    </section>
  );
}
