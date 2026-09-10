# Projects List

Build the main Projects section that allows visitors to browse and filter my portfolio projects.

Project data will eventually come from the backend/database. Keep the UI data-driven and do not define database logic here.

## Section Header

Include:

- main heading: `Projects`
- short supporting description

Suggested description:

`A collection of projects showcasing my experience across web, mobile, AI/ML, robotics, and software engineering.`

## Project Categories

Add filter tabs above the project grid.

Tabs:

- `All`
- `Web`
- `Mobile`
- `AI/ML`
- `Robotics`

Requirements:

- `All` displays every project
- other tabs display projects matching that category
- filtering should not reload the page
- active tab uses the primary purple accent or gradient
- tabs should be responsive on mobile

## Project Grid

Display projects using responsive cards.

Layout:

- 3 columns on large screens where appropriate
- 2 columns on medium screens
- 1 column on mobile

Each card may contain:

- thumbnail
- category
- technology pills
- project title
- short description
- `View Project`
- optional GitHub link
- optional Live Preview link

## Project Card

Card structure:

1. Thumbnail
2. Category and technology pills
3. Project title
4. Short description
5. `View Project` aligned left, with no divider above it
6. Optional icon-only GitHub and Live Preview actions aligned right

Clicking `View Project` opens the project details.

If no thumbnail exists, use a simple theme-aware placeholder.

## Technology Pills

Display technologies as colorful pills.

Examples:

- React
- Next.js
- TypeScript
- Node.js
- Python
- PostgreSQL
- MongoDB
- Prisma
- Tailwind

Requirements:

- use colors from a predefined pill palette
- vary colors between technologies
- keep the same technology color consistent where practical
- maintain readable contrast in light and dark mode
- allow pills to wrap naturally

Do not generate random colors on every render.

## Optional Links

Support:

- GitHub
- Live Preview

Requirements:

- show GitHub only when `githubUrl` exists
- show Live Preview only when `liveUrl` exists
- do not render disabled or empty actions
- open external links in a new tab
- use recognizable icons

## Conditional Rendering

Project cards should adapt to available project data.

Optional card fields include:

- thumbnail
- GitHub URL
- Live Preview URL

Missing optional information should not leave empty UI elements.

## Theme

Support light and dark mode using the existing purple visual identity.

Use:

- theme-aware surfaces
- purple gradient accents
- colorful technology pills
- borderless project cards
- subtle card hover elevation or glow

## Animation

Use subtle animation for:

- category filtering
- card entrance
- card hover
- buttons and links
- technology pills

Avoid excessive motion and respect reduced-motion preferences.

## Check When Done

- Projects heading displays correctly
- All, Web, Mobile, AI/ML, and Robotics tabs exist
- category filtering works
- project grid is responsive
- cards display technology pills
- pill colors vary consistently
- GitHub appears only when available
- Live Preview appears only when available
- View Project opens project details
- missing optional data does not create empty UI
- light and dark mode work correctly
- no TypeScript errors
- no lint errors
## Implementation decisions

- Accept project records through typed props with the data source separate from UI composition; backend integration is deferred.
- View Project opens the existing accessible Dialog primitive with the selected project’s details, as defined by `09-project-detail.md`.
- Empty lists and categories show a concise empty state.

- Card external actions show icons only, retain accessible labels, and sit at the right of the action row.

## Display ordering update

Sort published projects by numeric ID descending (10 before 9; 1 is oldest), independent of featured status and creation date. Legacy nonnumeric IDs appear before numeric IDs in deterministic alphabetical order so ID 1 remains last.
