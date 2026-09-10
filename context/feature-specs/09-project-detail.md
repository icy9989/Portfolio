# Project Detail

Build the detailed project view that opens when a visitor selects a project.

The layout must adapt to the information available for each project. Do not assume every project contains media, links, metrics, challenge, or solution information.

## Detail Layout

Create a large responsive project detail card or modal.

Include:

- close button
- project title
- category
- description
- technology pills
- optional media
- optional Challenge
- optional Solution
- optional metrics
- optional GitHub link
- optional Live Preview link

The layout should remain balanced when optional sections are missing.

## Project Header

Include:

- project title
- project category
- main project description
- technology stack

If suitable media exists, it may be used as the main visual/header area.

## Technology Pills

Display the project's technologies as colorful pills.

Requirements:

- use the same color system as the Projects List
- different technologies may use different colors
- maintain consistent colors for the same technology
- allow pills to wrap
- maintain readable contrast in both themes

## Project Links

Support:

- GitHub
- Live Preview

Both are optional.

Requirements:

- show GitHub only when `githubUrl` exists
- show Live Preview only when `liveUrl` exists
- do not display empty or disabled buttons
- use recognizable icons
- open external links in a new tab

## Project Overview

Display the main project description explaining:

- what the project is
- its purpose
- important functionality

Only display information provided by the project data.

## Challenge and Solution

### The Challenge

Optional.

Show this section only when `challenge` exists.

### The Solution

Optional.

Show this section only when `solution` exists.

If either field is missing, omit that section completely.

Challenge and Solution may appear side by side on desktop and stack vertically on smaller screens.

## Project Media

Project media is optional.

Support three states:

1. No media
2. Photo gallery
3. Video

The UI must adapt automatically to the available project data.

## No Media

When no photos or video exist:

- do not render a media section
- do not reserve empty media space
- allow project content to naturally fill the layout

## Photo Gallery

When project photos exist, display them in a responsive gallery.

Requirements:

- show one photo at a time
- automatically move slowly to the next photo
- use a smooth fade or slide transition
- loop continuously
- include `<` previous button
- include `>` next button
- manual navigation immediately changes the photo
- reset or pause the automatic timer after manual interaction
- preserve image aspect ratio
- optimize images with Next.js `Image`

### Single Photo

If only one photo exists:

- display it normally
- hide previous and next buttons
- disable automatic transitions

### Multiple Photos

If multiple photos exist:

- enable automatic transitions
- enable previous and next controls
- loop from the last image back to the first

## Video

When a project provides a video:

- display the video instead of the photo carousel
- maintain responsive aspect ratio
- provide playback controls
- do not autoplay with sound
- do not display photo navigation controls

## Optional Metrics

Support project metrics such as:

- uptime
- load time
- performance score
- deployment status

Requirements:

- display only metrics provided by the project
- use compact stat cards
- do not display `N/A`
- do not reserve space for missing metrics

## Conditional Rendering

Optional project detail fields may include:

- photos
- video
- challenge
- solution
- GitHub URL
- Live Preview URL
- uptime
- load time
- performance score
- deployment status

If optional information does not exist, completely omit its UI.

Never display:

- empty headings
- empty media containers
- broken images
- disabled external-link buttons
- placeholder metrics

## Responsive Behavior

Desktop:

- large centered project detail view
- media uses available width
- Challenge and Solution may display side by side
- metrics may display horizontally

Mobile:

- project content stacks vertically
- technology pills wrap
- Challenge and Solution stack
- gallery controls remain accessible
- project actions remain easy to tap
- no horizontal overflow

## Theme

Support both light and dark mode.

Use:

- purple gradient accents
- theme-aware surfaces
- colorful technology pills
- subtle purple borders
- soft shadows in light mode
- subtle purple glow in dark mode

## Animation

Use subtle animation for:

- detail view entrance
- photo transitions
- technology pills
- links and buttons
- optional section entrance

Photo transitions should remain slow and smooth.

Respect reduced-motion preferences.

## Accessibility

- close button requires an accessible label
- images require meaningful alt text
- previous and next buttons require accessible labels
- external links require clear labels
- video controls must remain accessible
- maintain visible keyboard focus states

## Check When Done

- project detail view opens correctly
- close button works
- technology pills are colorful
- GitHub appears only when available
- Live Preview appears only when available
- Challenge appears only when available
- Solution appears only when available
- no-media projects display correctly
- single-photo projects display without carousel controls
- multiple photos transition automatically
- previous and next controls work
- video projects display correctly
- optional metrics appear only when provided
- missing data does not create empty sections
- layout is responsive
- light and dark mode work correctly
- no TypeScript errors
- no lint errors

## Data and interaction contract

- `photos` is an optional array of `{ src, alt }`; `video` is an optional browser-playable URL. Video takes precedence over photos. Card thumbnails remain separate from detail media.
- `challenge`, `solution`, `uptime`, `loadTime`, and `deploymentStatus` are optional text; `performanceScore` accepts text or a number, including zero. Whitespace-only optional values are omitted.
- Multiple photos advance every six seconds with a smooth fade. Photos remain mounted for smooth 700ms crossfades, and the current photo remains visible until the requested photo loads. Keyboard focus entering the gallery pauses automatic advance; the labeled resume control restarts it even while focused. Manual navigation restarts the interval when playing. Reduced-motion preferences disable automatic advance and transitions.
- Failed photos are removed from the gallery; failed video is omitted. If no usable media remains, the media section is omitted.

## Detail styling update

- Hide the modal scrollbar while retaining wheel, touch, and keyboard scrolling.
- Add decorative icons to category, Challenge, Solution, and metric labels.
- External actions are icon-and-text buttons: filled purple GitHub and purple outline Live Preview.
