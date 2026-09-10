export const projectCategories = ["All", "Web", "Mobile", "AI/ML", "Robotics"] as const;
export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

export interface ProjectPhoto {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  technologies: readonly string[];
  description: string;
  details?: string;
  photos?: readonly ProjectPhoto[];
  video?: string;
  challenge?: string;
  solution?: string;
  uptime?: string;
  loadTime?: string;
  performanceScore?: string | number;
  deploymentStatus?: string;
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const technologyPalette = ["violet", "cyan", "blue", "green", "amber", "rose"] as const;
const technologyColors: Record<string, (typeof technologyPalette)[number]> = {
  react: "cyan", "next.js": "violet", typescript: "blue", "node.js": "green",
  python: "amber", postgresql: "blue", mongodb: "green", prisma: "rose", tailwind: "cyan",
};

export function technologyColor(technology: string) {
  const name = technology.trim().toLowerCase();
  return technologyColors[name] ?? technologyPalette[Array.from(name).reduce((sum, character) => sum + character.charCodeAt(0), 0) % technologyPalette.length];
}
