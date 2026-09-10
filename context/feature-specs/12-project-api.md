# Projects API

## Purpose

Provide project data for the main Projects section.

This API returns published portfolio projects and supports filtering by project category.

The frontend behavior is defined in `08-projects.md`.

## Current Model Mapping

- Reuse the server-only `lib/project-queries.ts` module; `lib/projects.ts` remains the frontend contract and helpers.
- The current schema stores a single thumbnail URL, without a media relation. Return it as `{ id: `${project.id}:thumbnail`, url: project.thumbnail, altText: `${project.title} — project thumbnail` }`, or `null` when absent. This ID identifies the project's thumbnail slot, not a separate database media record.
- Return absent links as `null`, matching the JSON examples below.
- Accept one category parameter; empty, repeated, and unsupported values return `400`.
- Keep the existing server-rendered frontend data flow; this update adds the list endpoint only.

## Endpoint

```text
GET /api/projects
```

## Supported Categories

Projects may belong to:

- Web
- Mobile
- AI/ML
- Robotics

Database enum values:

```text
WEB
MOBILE
AI_ML
ROBOTICS
```

`All` is not stored in the database.

When no category filter is provided, the API should return all published projects.

## Query Parameters

### Category

Optional:

```text
GET /api/projects?category=WEB
```

Examples:

```text
GET /api/projects
GET /api/projects?category=WEB
GET /api/projects?category=MOBILE
GET /api/projects?category=AI_ML
GET /api/projects?category=ROBOTICS
```

Requirements:

- validate the category value
- reject unsupported categories
- do not treat `ALL` as a database category
- no category means return all published projects

## Returned Project Data

The project list endpoint should return only information needed by the project cards.

Suggested response shape:

```ts
interface ProjectListItem {
  id: string
  slug: string
  title: string
  shortDescription: string
  category: "WEB" | "MOBILE" | "AI_ML" | "ROBOTICS"
  technologies: string[]

  thumbnail?: {
    id: string
    url: string
    altText?: string
  }

  githubUrl?: string
  liveUrl?: string

  featured: boolean
}
```

Do not return unnecessary detail-page fields when they are not needed by the project cards.

## Media

Actual images and videos should be stored in cloud storage.

PostgreSQL should store media metadata and URLs.

For project cards, return only the media item used as the project thumbnail.

Example:

```json
{
  "thumbnail": {
    "id": "media_123",
    "url": "https://storage.example.com/projects/ghost-ai/thumbnail.webp",
    "altText": "Ghost AI project dashboard"
  }
}
```

If no thumbnail exists:

```json
{
  "thumbnail": null
}
```

The frontend should use its theme-aware fallback design.

## GitHub and Live Preview

Both links are optional.

Return:

```json
{
  "githubUrl": "https://github.com/example/project",
  "liveUrl": "https://example.com"
}
```

If unavailable:

```json
{
  "githubUrl": null,
  "liveUrl": null
}
```

The frontend should only render actions when the corresponding value exists.

## Prisma Query

Use Prisma through a shared project query function.

Recommended flow:

```text
GET /api/projects
        ↓
route handler
        ↓
lib/projects.ts
        ↓
Prisma
        ↓
PostgreSQL
```

Do not query Prisma directly from client components.

## Query Rules

The project list should:

- return only published projects
- optionally filter by category
- include project thumbnail metadata
- include technologies
- include GitHub and Live Preview URLs when available
- return predictable ordering

Recommended ordering:

1. featured projects first
2. newest projects after featured projects

Example concept:

```ts
orderBy: [
  { featured: "desc" },
  { createdAt: "desc" }
]
```

## Suggested Prisma Select

Return only fields needed by the list UI.

Example:

```ts
select: {
  id: true,
  slug: true,
  title: true,
  shortDescription: true,
  category: true,
  technologies: true,
  githubUrl: true,
  liveUrl: true,
  featured: true,
}
```

Include the thumbnail relation separately according to the final media model.

Avoid returning:

- full descriptions
- challenge
- solution
- full gallery
- video information
- lessons learned
- detailed metrics

These belong to the project details endpoint.

## Success Response

Example:

```json
{
  "projects": [
    {
      "id": "cm123",
      "slug": "ghost-ai",
      "title": "Ghost AI",
      "shortDescription": "AI-powered application built with modern web technologies.",
      "category": "AI_ML",
      "technologies": [
        "Next.js",
        "TypeScript",
        "Python"
      ],
      "thumbnail": {
        "id": "media_123",
        "url": "https://storage.example.com/ghost-ai/thumbnail.webp",
        "altText": "Ghost AI dashboard"
      },
      "githubUrl": "https://github.com/example/ghost-ai",
      "liveUrl": null,
      "featured": true
    }
  ]
}
```

## Empty Result

If no projects match the filter:

```json
{
  "projects": []
}
```

This is not an error.

## Error Responses

### Invalid Category

```json
{
  "error": "Invalid project category"
}
```

Suggested status:

```text
400 Bad Request
```

### Server Error

```json
{
  "error": "Unable to load projects"
}
```

Suggested status:

```text
500 Internal Server Error
```

Do not expose database errors or internal stack traces to the client.

## Route Responsibilities

The route handler should only:

1. read query parameters
2. validate category
3. call the project query function
4. return the response
5. handle expected errors

Do not place large amounts of Prisma logic directly inside the route handler.

## File Structure

Recommended:

```text
app/
└── api/
    └── projects/
        └── route.ts

lib/
├── prisma.ts
└── projects.ts
```

## Check When Done

- `GET /api/projects` works
- only published projects are returned
- no category returns all projects
- category filtering works
- invalid categories return `400`
- project card fields are returned
- thumbnail metadata is returned when available
- GitHub link is optional
- Live Preview link is optional
- unnecessary project detail data is not returned
- empty results return an empty array
- Prisma logic stays outside client components
- errors do not expose internal database details
- no TypeScript errors
- no lint errors

## Display ordering update

Sort published projects by numeric ID descending (10 before 9; 1 is oldest), independent of featured status and creation date. Legacy nonnumeric IDs appear before numeric IDs in deterministic alphabetical order so ID 1 remains last.
