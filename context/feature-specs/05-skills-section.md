# Skills Section

Build a Skills section that presents my main technologies in a continuously scrolling horizontal animation inspired by the provided reference.

### Reference refinement

- Display Skills as a separate section below About Me, with a compact edge-to-edge scrolling strip.
- Show a centered `Skills` heading with a subtle purple gradient underline and section spacing consistent with About Me.
- No section side padding or separate skill cards.
- Use an opaque theme surface and readable theme text for the icon/name pairs; do not mask or fade text at the edges.

### Logo and visual refresh

- Prefer the supplied PNG logos in `public` for matching existing technologies; retain current stroke icons for technologies without a matching file.
- Keep all 17 existing technologies and the single edge-to-edge marquee.
- Add a small toolkit label, a concise introduction, larger contained logos, subtle purple strip accents, and gentle icon lift on hover. Keep skill entries unboxed and do not fade edge text.
- Place the monochrome Next.js logo on a light theme-token surface so it remains visible in dark mode.

### Skills Marquee

Display skills in a single horizontal scrolling row.

Requirements:

- skills move continuously from right to left
- animation loops seamlessly without visible jumps
- each skill includes its technology icon and name
- maintain generous spacing between skills: 64px on mobile and 96px on larger screens, with matching trailing gaps for a seamless loop
- separate each icon from its label by 20px on mobile and 24px on larger screens
- use the official or recognizable technology colors where appropriate
- keep the surrounding UI consistent with the portfolio's purple theme
- marquee should span the full available width
- hide horizontal overflow
- use subtle edge fading if appropriate

### Skills

Include technologies such as:

- HTML
- CSS
- JavaScript
- TypeScript
- React
- Next.js
- Node.js
- Python
- PostgreSQL
- MongoDB
- Prisma
- Git
- GitHub
- Docker
- AWS
- AI/ML
- NLP

The list should be easy to extend later.

### Animation

Requirements:

- continuously animate from right to left
- use a slow and smooth scrolling speed
- repeat the skill list when necessary to create an infinite loop
- no visible reset or animation jump
- optionally pause or slow the animation on hover
- respect reduced-motion preferences

### Theme

- support both light and dark mode
- use existing theme tokens
- use subtle purple borders, gradients, or glow accents
- technology icons may retain their recognizable brand colors
- maintain readable text contrast in both themes

### Responsive Behavior

- maintain horizontal scrolling animation on desktop and mobile
- use 18px labels and 48px logo containers on mobile, increasing to 24px labels and 56px logo containers on larger screens; fallback stroke icons are 40px/44px
- prevent horizontal page overflow
- keep the marquee smooth across screen sizes

### Accessibility

- technology names should remain readable without relying only on icons
- decorative icons should not create unnecessary screen-reader noise
- respect reduced-motion preferences

### Check when done

- `Skills` heading displays correctly
- all configured skills display with icons and names
- skills continuously move from right to left
- animation loops seamlessly
- marquee works on mobile and desktop
- light and dark mode display correctly
- no horizontal page overflow
- no TypeScript errors
- no lint errors
