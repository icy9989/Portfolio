import "server-only";

import { compareProjectIds } from "@/lib/project-order";

import { prisma } from "@/lib/prisma";
import type { ProjectCategory as DatabaseCategory } from "@/lib/generated/prisma/client";
import type { Project, ProjectCategory } from "@/lib/projects";
import type { ProjectListItem } from "@/lib/project-list";

/** Published card data only; detail fields never enter the API response. */
export async function getProjectList(category?: DatabaseCategory): Promise<ProjectListItem[]> {
  const records = await prisma.project.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    orderBy: { id: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      shortDescription: true,
      category: true,
      technologies: true,
      thumbnail: true,
      githubUrl: true,
      liveUrl: true,
      featured: true,
    },
  });

  return records.sort(compareProjectIds).map((record) => ({
    ...record,
    thumbnail: record.thumbnail ? {
      id: `${record.id}:thumbnail`,
      url: record.thumbnail,
      altText: `${record.title} — project thumbnail`,
    } : null,
  }));
}

const categories: Record<DatabaseCategory, ProjectCategory> = {
  WEB: "Web",
  MOBILE: "Mobile",
  AI_ML: "AI/ML",
  ROBOTICS: "Robotics",
};

/** Public portfolio records, mapped to the serializable UI contract. */
export async function getProjects(): Promise<readonly Project[]> {
  const records = await prisma.project.findMany({
    where: { published: true },
    orderBy: { id: "asc" },
  });

  return records.sort(compareProjectIds).map((record) => ({
    id: record.id,
    title: record.title,
    category: categories[record.category],
    technologies: record.technologies,
    description: record.shortDescription,
    details: record.description,
    thumbnail: record.thumbnail ?? undefined,
    photos: record.images.filter((src) => src.trim()).map((src, index) => ({
      src,
      alt: `${record.title} — project image ${index + 1}`,
    })),
    video: record.videoUrl ?? undefined,
    challenge: record.challenge ?? undefined,
    solution: record.solution ?? undefined,
    uptime: record.uptime ?? undefined,
    loadTime: record.loadTime ?? undefined,
    performanceScore: record.performanceScore ?? undefined,
    deploymentStatus: record.deploymentStatus ?? undefined,
    githubUrl: record.githubUrl ?? undefined,
    liveUrl: record.liveUrl ?? undefined,
  }));
}
