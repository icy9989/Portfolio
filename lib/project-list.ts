import type { ProjectCategory } from "@/lib/generated/prisma/enums";

export interface ProjectListItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  technologies: string[];
  thumbnail: { id: string; url: string; altText: string } | null;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return value === "WEB" || value === "MOBILE" || value === "AI_ML" || value === "ROBOTICS";
}
