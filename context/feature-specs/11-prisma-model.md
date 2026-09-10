# Prisma Model

## Purpose

Define the PostgreSQL data model used to store portfolio projects.

This file only defines project data structure and database rules.

Prisma installation, PostgreSQL configuration, Prisma Client setup, migrations, and seed setup belong in `prisma-setup.md`.

## Project Category

Each project belongs to one category.

```prisma
enum ProjectCategory {
  WEB
  MOBILE
  AI_ML
  ROBOTICS
}
```

Frontend labels:

| Database Value | Display Label |
| --- | --- |
| `WEB` | Web |
| `MOBILE` | Mobile |
| `AI_ML` | AI/ML |
| `ROBOTICS` | Robotics |

`All` is not stored in the database.

It is a frontend filter that displays projects from every category.

## Project Model

```prisma
model Project {
  id               String          @id @default(cuid())
  slug             String          @unique

  title            String
  shortDescription String
  description      String          @db.Text
  category         ProjectCategory

  technologies     String[]
  features         String[]
  lessonsLearned   String[]

  challenge        String?         @db.Text
  solution         String?         @db.Text

  thumbnail        String?
  images           String[]
  videoUrl         String?

  githubUrl        String?
  liveUrl          String?

  uptime           String?
  loadTime         String?
  performanceScore String?
  deploymentStatus String?

  featured         Boolean         @default(false)
  published        Boolean         @default(true)

  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
}
```

## Core Fields

### `id`

Unique database identifier.

```prisma
id String @id @default(cuid())
```

Use `id` internally when identifying project records.

### `slug`

Unique human-readable project identifier.

```prisma
slug String @unique
```

Examples:

```text
portfolio-website
ghost-ai
water-management-system
```

The slug can support clean project URLs such as:

```text
/projects/ghost-ai
```

### `title`

Project name displayed on project cards and project details.

### `shortDescription`

Short description intended primarily for the project card.

Keep this concise and easy to scan.

### `description`

Full project overview used in Project Details.

```prisma
description String @db.Text
```

### `category`

Determines which Projects tab contains the project.

```prisma
category ProjectCategory
```

Available categories:

- Web
- Mobile
- AI/ML
- Robotics

## Technologies

Store the project's technology stack as a string array.

```prisma
technologies String[]
```

Example:

```text
[
  "Next.js",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS"
]
```

The frontend displays these values as colorful technology pills.

Pill colors are UI styling and must not be stored in the database.

## Features

Store important project features as:

```prisma
features String[]
```

Example:

```text
[
  "Responsive dashboard",
  "REST API integration",
  "Project filtering"
]
```

If a project has no feature list, use an empty array.

## Lessons Learned

Store project lessons as:

```prisma
lessonsLearned String[]
```

This information is optional from the UI perspective.

If there are no lessons to display, use an empty array.

## Challenge

The project challenge is optional.

```prisma
challenge String? @db.Text
```

If `challenge` is `null`, the Project Details UI should not render a Challenge section.

## Solution

The project solution is optional.

```prisma
solution String? @db.Text
```

If `solution` is `null`, the Project Details UI should not render a Solution section.

Challenge and Solution are independent.

A project may contain:

- both Challenge and Solution
- Challenge only
- Solution only
- neither

## Thumbnail

Project card thumbnail is optional.

```prisma
thumbnail String?
```

Store a media path or URL rather than image binary data.

Example:

```text
/projects/ghost-ai/thumbnail.png
```

If no thumbnail exists, the Projects List UI should use its theme-aware fallback design.

## Project Images

Store project screenshots as:

```prisma
images String[]
```

Example:

```text
[
  "/projects/ghost-ai/dashboard.png",
  "/projects/ghost-ai/editor.png",
  "/projects/ghost-ai/results.png"
]
```

The Project Details UI determines behavior based on the number of images.

### No Images

```text
[]
```

Do not render the photo gallery.

### One Image

Display the image normally.

Do not enable:

- automatic transitions
- previous button
- next button

### Multiple Images

The Project Details UI can use the array for:

- automatic image transitions
- previous navigation
- next navigation
- looping gallery

Carousel behavior belongs to the frontend and should not be stored in the database.

## Video

Project video is optional.

```prisma
videoUrl String?
```

Store a video path or URL.

If a project uses video as its detail media, the frontend should display the video according to `project-details.md`.

Do not store video binary data directly in the Project record.

## Media States

Project Details should support three primary media states.

### No Media

```text
images = []
videoUrl = null
```

No media section is rendered.

### Photos

```text
images = [ ... ]
videoUrl = null
```

Display the project image/gallery UI.

### Video

```text
videoUrl = "..."
```

Display the project video UI.

Media presentation rules belong in `project-details.md`.

## GitHub Link

GitHub repository URL is optional.

```prisma
githubUrl String?
```

If a value exists, GitHub actions may appear on:

- project card
- project details

If it is `null`, do not render the GitHub action.

## Live Preview

Live project URL is optional.

```prisma
liveUrl String?
```

If a value exists, Live Preview actions may appear on:

- project card
- project details

If it is `null`, do not render the Live Preview action.

A project may contain:

- GitHub and Live Preview
- GitHub only
- Live Preview only
- neither

## Project Metrics

Project metrics are optional.

```prisma
uptime           String?
loadTime         String?
performanceScore String?
deploymentStatus String?
```

Examples:

```text
uptime = "99.9%"
loadTime = "0.4s"
performanceScore = "98"
deploymentStatus = "Live"
```

Only metrics containing values should be displayed.

Do not store placeholder values such as:

```text
N/A
Unknown
None
-
```

Use `null` instead.

## Featured

```prisma
featured Boolean @default(false)
```

Allows selected projects to be highlighted or prioritized by the portfolio.

## Published

```prisma
published Boolean @default(true)
```

Controls whether a project should be publicly available.

Unpublished projects should not appear in the public Projects section.

## Timestamps

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

Use these fields to track when project records are created and updated.

## Data Rules

1. Every project must have a category.
2. `All` is a frontend filter and is not stored as a category.
3. Challenge and Solution are optional and independent.
4. GitHub and Live Preview links are optional.
5. Project media is optional.
6. Store media paths or URLs instead of binary files.
7. Technology pill colors belong to the frontend.
8. Do not store UI animation settings in the database.
9. Do not use placeholder values for missing optional data.
10. Keep project slugs unique.
11. Public project queries should return only published projects.
12. UI components should conditionally render optional project data.

## Check When Done

- `ProjectCategory` enum contains Web, Mobile, AI/ML, and Robotics
- `Project` model validates successfully
- project slug is unique
- technologies can store multiple values
- features can store multiple values
- Challenge is optional
- Solution is optional
- thumbnail is optional
- multiple project images can be stored
- video is optional
- GitHub link is optional
- Live Preview is optional
- metrics are optional
- projects without media can be stored
- published and unpublished projects are supported
- no frontend styling information is stored in the database