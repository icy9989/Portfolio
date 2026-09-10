# Architecture Context

## Stack

| Layer            | Technology              | Role                                                           |
| ---------------- | ----------------------- | -------------------------------------------------------------- |
| Framework        | Next.js 16 + TypeScript | Full-stack app with server/client boundaries                   |
| UI               | Tailwind + shadcn/ui    | Component composition and styling                              |
| Database         | Prisma + PostgreSQL     | Relational metadata: projects,|

## System Boundaries

- app — Pages, layouts, and application routes.
- app/api — API routes for retrieving project data.
- lib — Shared infrastructure such as the Prisma client, project queries, and utilities.
- components — Reusable portfolio UI components and sections.
- prisma — Database schema and migrations.
- public — Images, resume, and other static asse

## Storage Model

- PostgreSQL stores portfolio project information.
- Prisma is the database access layer.
- Static assets such as images and the resume are stored in public.
- UI components do not access the database directly.


## Invariants

- Prisma is used for PostgreSQL database access.
- Database logic stays separate from UI components.
- API routes remain small and focused.
- Server Components are preferred unless client-side interactivity is required.
- Project data should not be duplicated as hardcoded UI data.
- Shared functionality belongs in reusable modules or components.

## GitHub Activity

- `lib/github.ts` retrieves and validates public contribution data from the GitHub Contributions API (https://github.com/grubersjoe/github-contributions-api), cached for one hour on the server. No token or database is required.
- The About section renders a purple calendar from real activity, with an explicit unavailable state when the upstream request fails. The avatar uses the public GitHub avatar URL.

## Projects frontend update

- Next.js Image permits HTTPS UploadThing images at `utfs.io/f/**` without query parameters, for project thumbnails and detail photos.

- The initial frontend phase deferred backend integration; Prisma integration is now active. The Projects section receives serializable project records through props; no database logic or project records live in UI components. PostgreSQL/Prisma are the source of truth.
- `09-project-detail.md` defines View Project as a large accessible modal with optional photos/video, Challenge/Solution, and metrics. Shared app-level pills and links serve both cards and details; a dedicated client media component owns carousel state and timers.
- Photos contain `src` and meaningful `alt` text. Video is a browser-playable URL and takes precedence over photos. Gallery images use local public assets with Next.js Image; external image hosts must be explicitly configured when real records are integrated. Card thumbnails do not implicitly become detail photos.

## Database project queries

- `GET /api/projects` calls `getProjectList()` in the server-only query module, selecting only card fields. It validates a single optional database category, filters published records, and returns numeric ID descending ordering. Missing links and thumbnails are null; thumbnail URLs map to metadata with a stable project-derived slot ID and title-based alt text. Database failures return a generic 500 response. The existing page/detail data flow remains separate.
- `lib/project-queries.ts` uses the shared Prisma client to read only published projects, sorted by numeric ID descending using the shared comparator, with legacy nonnumeric IDs before numeric records so ID 1 remains last.
- It maps PostgreSQL categories to frontend labels, shortDescription to card copy, description to detail copy, nullable fields to optional values, images to numbered project-specific alt text, and videoUrl to video.
- `app/page.tsx` uses `connection()` before querying so database edits appear on the next request without rebuilding. Database errors surface rather than silently showing demo data.
- The sample JSON adapter and file have been removed. UI components continue to receive serializable records through props.

## Project database model

- `prisma/schema.prisma` implements the exact PostgreSQL `ProjectCategory` enum and `Project` model from `11-prisma-model.md`: unique slug, required category, string arrays, nullable media/links/challenge/solution/metrics, featured and published defaults, and timestamps. The provider declaration enables PostgreSQL schema validation; connection and client configuration are implemented.
- Database categories map `WEB` → Web, `MOBILE` → Mobile, `AI_ML` → AI/ML, and `ROBOTICS` → Robotics. `All`, pill colors, and animation settings are frontend concerns.
- Database queries filter `published: true`; writes must use empty arrays for absent lists and null for missing optional data, never placeholder metrics. These application rules are not enforced by the schema alone.
- The existing frontend contract remains separate. Database integration must map `shortDescription`/`description` to card/detail copy, `images` to accessible photos with meaningful alt text, and `videoUrl` to detail video. The query adapter now implements this mapping.

## Prisma connection

- `prisma.config.ts` loads private environment variables with `@next/env` and configures Prisma 7 CLI. `lib/prisma.ts` uses `@prisma/adapter-pg` and reuses the generated client during hot reloads. Generated files are ignored and recreated on install.
- `scripts/check-database.ts` performs a read-only Project count using the shared client. Errors omit credentials. The initial migration creates the Project enum/table and unique slug index.
- Project UI reads published PostgreSQL records through the server query adapter.

## Contact email

- `POST /api/contact` accepts bounded JSON, validates through shared `lib/validation/contact.ts`, reserves rate/duplicate limits, and sends through server-only `lib/email.ts` using Resend. It returns sanitized errors and confirms success only after provider acceptance.
- Credentials and configured sender/recipient stay server-side. Plain-text email contains visitor details, with the visitor as Reply-To and the verified portfolio address as From. No database access or message persistence.
- `lib/contact-protection.ts` keeps bounded, expiring hashes/counters per process; provider idempotency handles duplicate sends across instances. Local rate quotas are not distributed and reset on restart.
- The Contact form owns pending/success/error state, prevents repeat submissions, clears only on confirmed success, and preserves input on failure.

## Project seeding

- `npm run db:seed` runs `prisma/seed.ts` through Prisma config with the React server condition required by the shared client. The seed loads private Next.js environment files before importing the client, upserts the supplied projects by slug, and disconnects on completion. Existing unrelated records remain intact.
