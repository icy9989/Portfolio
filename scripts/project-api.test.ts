import assert from "node:assert/strict";
import { mock, test } from "node:test";
import type { Prisma } from "../lib/generated/prisma/client";
import type { ProjectListItem } from "../lib/project-list";
import { GET } from "../app/api/projects/route";

test("Projects API validation, query constraints, card responses, and safe errors", async () => {
  // No database connection is made: intercept the shared client's query method.
  process.env.DATABASE_URL ??= "postgresql://localhost/portfolio_test";
  const { prisma } = await import("../lib/prisma");
  const records: (Omit<ProjectListItem, "thumbnail"> & { thumbnail: string | null })[] = [{
    id: "project-1", slug: "example", title: "Example", shortDescription: "Card copy",
    category: "WEB", technologies: ["TypeScript"], thumbnail: "https://example.com/card.webp",
    githubUrl: null, liveUrl: "https://example.com", featured: true,
  }];
  const originalQuery = prisma.project.findMany;
  const query = mock.fn<(args?: Prisma.ProjectFindManyArgs) => Promise<typeof records>>(async () => records);
  // Prisma uses a lazy Promise subtype; this stub only needs the awaited query result.
  prisma.project.findMany = query as unknown as typeof prisma.project.findMany;
  const request = (query = "") => GET(new Request(`http://localhost/api/projects${query}`));

  try {
    for (const value of ["ALL", "Web", "", "UNKNOWN", "WEB&category=MOBILE"]) {
      const response = await request(`?category=${value}`);
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error: "Invalid project category" });
    }
    assert.equal(query.mock.callCount(), 0);

    for (const category of [undefined, "WEB", "MOBILE", "AI_ML", "ROBOTICS"]) {
      const response = await request(category ? `?category=${category}` : "");
      assert.equal(response.status, 200);
      const { projects } = await response.json();
      assert.deepEqual(projects, [{ ...records[0], thumbnail: {
        id: "project-1:thumbnail", url: records[0].thumbnail, altText: "Example — project thumbnail",
      } }]);
      const args = query.mock.calls.at(-1)?.arguments[0];
      assert.deepEqual(args?.where, { published: true, ...(category ? { category } : {}) });
      assert.deepEqual(args?.orderBy, { id: "asc" });
      assert.deepEqual(Object.keys(args?.select ?? {}).sort(), Object.keys(records[0]).sort());
    }

    query.mock.mockImplementation(async () => [{ ...records[0], thumbnail: null, liveUrl: null }]);
    const nullable = await (await request()).json();
    assert.equal(nullable.projects[0].thumbnail, null);
    assert.equal(nullable.projects[0].githubUrl, null);
    assert.equal(nullable.projects[0].liveUrl, null);

    query.mock.mockImplementation(async () => []);
    assert.deepEqual(await (await request()).json(), { projects: [] });

    query.mock.mockImplementation(async () => { throw new Error("private database credentials and stack"); });
    const failure = await request();
    assert.equal(failure.status, 500);
    assert.deepEqual(await failure.json(), { error: "Unable to load projects" });
  } finally {
    prisma.project.findMany = originalQuery;
    await prisma.$disconnect();
  }
});
