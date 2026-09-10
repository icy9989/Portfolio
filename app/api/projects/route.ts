import { isProjectCategory } from "@/lib/project-list";

export async function GET(request: Request) {
  const categories = new URL(request.url).searchParams.getAll("category");
  const category = categories[0];

  if (categories.length > 1 || (category !== undefined && !isProjectCategory(category))) {
    return Response.json({ error: "Invalid project category" }, { status: 400 });
  }

  try {
    // Load inside the error boundary so configuration failures are also sanitized.
    const { getProjectList } = await import("@/lib/project-queries");
    const projects = await getProjectList(category);
    return Response.json({ projects });
  } catch {
    return Response.json({ error: "Unable to load projects" }, { status: 500 });
  }
}
