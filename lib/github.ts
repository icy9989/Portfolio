export const githubProfile = {
  username: "icy9989",
  url: "https://github.com/icy9989",
  avatar: "https://github.com/icy9989.png?size=96",
};

export interface Contribution {
  date: string;
  count: number;
  level: number;
}

function isContribution(value: unknown): value is Contribution {
  if (typeof value !== "object" || value === null) return false;
  const day = value as Record<string, unknown>;
  return typeof day.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day.date)
    && new Date(`${day.date}T00:00:00Z`).toISOString().slice(0, 10) === day.date
    && typeof day.count === "number" && Number.isSafeInteger(day.count) && day.count >= 0
    && typeof day.level === "number" && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4;
}

export async function getContributions(): Promise<Contribution[] | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubProfile.username}?y=last`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (typeof data !== "object" || data === null || !("contributions" in data)
      || !Array.isArray(data.contributions) || data.contributions.length === 0
      || data.contributions.length > 371 || !data.contributions.every(isContribution)) return null;
    const days = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
    if (days.some((day, index) => index > 0
      && Date.parse(day.date) - Date.parse(days[index - 1].date) !== 86400000)) return null;
    return days;
  } catch {
    return null;
  }
}
