# Prisma Context

## Purpose

Use Prisma with PostgreSQL as the database layer for portfolio project data.

Prisma should handle:

- database schema
- migrations
- project queries
- project seed data
- PostgreSQL access

Project UI and database implementation should remain separate.

## Prisma Skill

Before implementing or modifying Prisma-related code:

- use the available Prisma skill/documentation when available
- follow the Prisma version installed in the project
- do not assume APIs from older Prisma versions
- inspect the existing Prisma configuration before making changes
- preserve existing migrations and database conventions

Use Prisma for database access instead of writing raw SQL unless explicitly required.

## Installation

Install Prisma and Prisma Client using the project's package manager.

```bash
npm install --save-exact prisma@7.10.0 @prisma/client@7.10.0
```

## Version Alignment Update

Use matching Prisma CLI and Client versions, pinned to `7.10.0`. This replaces the Prisma 8 preview CLI installed by the original unversioned command and enables the Prisma ORM schema and migration commands.

## Connection setup

Use the existing private `DATABASE_URL` with the Prisma 7 PostgreSQL driver adapter.
Load environment variables for Prisma CLI using `@next/env`, matching Next.js.
Generate the client into `lib/generated/prisma` and reuse a server-only client
across development hot reloads. Provide a read-only connection check.
Apply the initial migration to create the missing Project table. Project-query integration is now complete: published PostgreSQL records replace the removed sample adapter and are loaded on each page request.
