import Image from "next/image";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContributions, githubProfile, type Contribution } from "@/lib/github";

function ContributionCalendar({ days }: { days: Contribution[] }) {
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const weeks = Math.ceil((offset + days.length) / 7);
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
  return (
    <div>
      <div className="overflow-x-auto rounded-xl focus-visible:outline-2 focus-visible:outline-brand" tabIndex={0} role="region" aria-label="GitHub contribution calendar, scroll horizontally on small screens">
        <svg viewBox={`0 0 ${weeks * 18 + 38} 154`} className="w-full min-w-[680px]" role="img" aria-labelledby="contribution-title contribution-description">
          <title id="contribution-title">{`${total.toLocaleString("en-US")} GitHub contributions in the last year`}</title>
          <desc id="contribution-description">Daily activity from {days[0].date} to {days[days.length - 1].date}. Deeper purple indicates more contributions.</desc>
          {["Mon", "Wed", "Fri"].map((label, index) => <text key={label} x="0" y={51 + index * 36} className="fill-copy-secondary" fontSize="10">{label}</text>)}
          {days.map((day, index) => {
            const date = new Date(`${day.date}T00:00:00Z`);
            const x = 38 + Math.floor((index + offset) / 7) * 18;
            const y = 24 + date.getUTCDay() * 18;
            return <g key={day.date}>
              {date.getUTCDate() === 1 && x < weeks * 18 + 10 && <text x={x} y="12" className="fill-copy-secondary" fontSize="10">{monthFormat.format(date)}</text>}
              <rect x={x} y={y} width="14" height="14" rx="4" className={`contribution-level-${day.level}`}>
                <title>{`${day.date}: ${day.count} contributions`}</title>
              </rect>
            </g>;
          })}
        </svg>
      </div>
      <p className="mt-3 text-xs text-copy-secondary">{total.toLocaleString("en-US")} contributions in the last year <span aria-hidden="true">·</span> {days[0].date} – {days[days.length - 1].date}</p>
    </div>
  );
}

export async function GithubShowcase() {
  const days = await getContributions();
  return (
    <article className="about-enter min-w-0 rounded-2xl bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-brand/5 sm:p-8 lg:p-10" aria-label="GitHub activity">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-5 pb-6">
        <a href={githubProfile.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-brand" aria-label="icy9989 on GitHub (opens in a new tab)">
          <Image src={githubProfile.avatar} unoptimized width={48} height={48} alt="icy9989’s GitHub avatar" className="rounded-full bg-surface-elevated" />
          <span className="break-all text-sm font-semibold sm:text-lg">github.com/{githubProfile.username}</span>
        </a>
        <div className="flex items-center gap-1.5 text-xs text-copy-secondary" aria-label="Contribution intensity: less to more">
          <span className="mr-1">Less</span>
          {[0, 1, 2, 3, 4].map(level => <svg key={level} width="14" height="14" aria-hidden="true"><rect width="14" height="14" rx="4" className={`contribution-level-${level}`} /></svg>)}
          <span className="ml-1">More</span>
        </div>
      </div>
      {days ? <ContributionCalendar days={days} /> : <div className="rounded-xl bg-brand/5 px-6 py-10 text-center"><GitBranch className="mx-auto mb-3 size-8 text-brand" aria-hidden="true" /><p className="font-medium">Contribution activity is temporarily unavailable.</p><p className="mt-2 text-sm text-copy-secondary">You can still explore my latest work on GitHub.</p></div>}
      <div className="mt-8 text-center sm:mt-10">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Khaing Min Htwe</h3>
        <p className="mt-2 text-sm text-brand sm:text-base">Full Stack Software Engineer</p>
        <Button asChild variant="outline" className="mt-6 h-11 rounded-xl border-brand/40 bg-brand/5 px-5 text-brand hover:bg-brand/15 hover:text-brand">
          <a href={githubProfile.url} target="_blank" rel="noopener noreferrer">Visit my GitHub <ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        </Button>
      </div>
    </article>
  );
}
