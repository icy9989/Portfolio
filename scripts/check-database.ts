import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { prisma } = await import("../lib/prisma");
  try {
    await prisma.$connect();
    const count = await prisma.project.count();
    console.log("PostgreSQL connection successful.");
    console.log(`Project model is ready (${count} records).`);
    const { getProjects } = await import("../lib/project-queries");
    const projects = await getProjects();
    console.log(`Portfolio query returned ${projects.length} published projects.`);
    for (const project of projects) {
      console.log(JSON.stringify({ title: project.title, category: project.category, thumbnail: project.thumbnail, photos: project.photos }));
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  // Avoid logging connection strings or credentials from driver errors.
  const code = typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : "unknown";
  console.error(code === "P2021"
    ? "PostgreSQL is reachable, but the Project table is missing. Apply the initial migration before integrating project queries."
    : `Database check failed (code: ${code}). Check connectivity, credentials, and whether migrations have been applied.`);
  process.exitCode = 1;
});
