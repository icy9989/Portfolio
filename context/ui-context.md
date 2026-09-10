# UI Context

## Visual Direction
The portfolio should feel modern, polished, minimal, and developer-focused.
Use purple as the primary brand color across both light and dark themes. Gradients and glows should be subtle and used mainly for emphasis rather than decoration everywhere.

## Theme

Support both light and dark mode.

### Dark Mode

Use a near-black base with deep purple tones and soft violet gradients.

| Role             | Hex         |    
| -----------------| ------------|             
| Page background  | #09090B   |  
| Surface          | #121016   |     
| Elevated surface | #1A1623   |  
| Primary Text     | #F5F3FF   |  
| Secondary Text   | #A8A3B3   |     
| Border           | #2A2433   |
| Primary Purple   | #8B5CF6   |    
| Bright Purple    | #A78BFA   |

#### Primary gradient 

#7C3AED → #A855F7 → #C084FC
Use subtle purple glow effects around important hero elements, buttons, and selected project cards.

### Light Mode

Use white and soft lavender backgrounds with clean purple accents.

| Role             | Hex         |    
| -----------------| ------------|             
| Page background  | #FAFAFF   |  
| Surface          | #FFFFFF   |     
| Elevated surface | #F5F3FF  |  
| Primary Text     | #18181B   |  
| Secondary Text   | #6B6575  |     
| Border           | #2A2433   |
| Primary Purple   | #7C3AED  |    
| Bright Purple    | #9333EA  |

#### Primary gradient 

#F5F3FF → #EDE9FE → #F3E8FF
Use stronger purple gradients for buttons, highlighted text, icons, and small decorative elements.


## Typography

| Role      | Font       | CSS Variable        |
| --------- | ---------- | ------------------- |
| UI text   | Geist Sans | `--font-geist-sans` |
| Code/mono | Geist Mono | `--font-geist-mono` |

Hero typography should be bold and prominent while body content remains clean and easy to scan.

Both fonts are loaded via `next/font/google` and applied as CSS variables on the `<html>` element. The base `body` uses Geist Sans with `antialiased`.

## Border Radius

Radius increases with surface depth — smaller for inner elements, larger for outer containers.

| Context           | Class         |
| ----------------- | ------------- |
| Inline / small UI | `rounded-xl`  |
| Cards / panels    | `rounded-2xl` |
| Modal / overlay   | `rounded-3xl` |


## Component Library

shadcn/ui on top of Tailwind. No custom design system. Components live in `components/ui/`. Use the `shadcn` CLI to add new components rather than writing them from scratch.

## Navbar

- Clean and minimal.
- Portfolio section navigation.
- Light/dark mode toggle.
- Responsive mobile menu.
- Subtle backdrop blur when appropriate.

## Icons

Lucide React. Stroke-based icons only — no filled variants. Icon sizes: `h-4 w-4` for inline, `h-5 w-5` for buttons, `h-8 w-8` for feature icons in empty states.


The installed Lucide version omits brand icons. Hero GitHub and LinkedIn links use small app-level stroke SVG brand marks; general interface icons continue to use Lucide.

## Accessibility

- Maintain sufficient contrast in both themes.
- Keep keyboard focus states visible.
- Add accessible labels to icon-only controls.
- Do not place important text over distracting gradients.
- Respect reduced-motion preferences.
## Reference refinements

- Keep the profile ring band compact, with a cyan outer ring and violet inner ring, and a stationary photo close to the inner ring.
- Use soft violet/cyan radial background washes in both themes.
- Remove the navbar bottom divider on mobile. Give icon controls tinted surfaces, borders, and padding in both themes.

- Mobile sidebar title is visually hidden but retained for screen readers; links clear the close button. Circular profile composition is capped at 27rem. Background washes have stronger opacity and an additional violet gradient.

- Scatter ten decorations within the hero only: gold stroke stars in light mode and green </> symbols in dark mode, with slow staggered shimmer; keep them decorative, non-interactive, and static with reduced motion. The technology ring includes Web and UI/UX, with spacing calculated from the label count.

- Below 640px, main content has 28px side padding, hero actions use content-width 44px-high buttons, and the circular profile is capped at 18rem. Larger breakpoints retain the existing layout.

- Center the hero introduction, action buttons, and social links in the stacked mobile/tablet layout; restore left alignment in the desktop two-column layout (1024px and above).

- About developer code card uses a fixed black editor surface in both themes, with blue keywords, cyan properties, orange strings, gold brackets, and red/yellow/green window controls. GitHub uses an opaque theme surface without an outer border or header divider, and a coordinated purple contribution scale.

- About Me has a plain, full-width theme background in both modes, masking the page gradient across the section. Its heading underline is solid purple.

- Skills is a separate section below About Me with a centered heading, purple gradient underline, and consistent vertical section spacing. Its scrolling strip stays outside the padded content container, using an opaque elevated surface with subtle purple accents, primary text, larger unboxed icon/name pairs, and no edge mask. A toolkit eyebrow and brief introduction frame the heading. Supplied technology PNG logos retain their original colors; existing stroke icons cover missing assets. The monochrome Next.js logo uses a light token surface for contrast in both themes.

- Services cards have no border in light mode, including hover and focus-within states. Dark mode retains subtle purple borders and their hover/focus emphasis.

- Projects uses responsive one/two/three-column cards, wrapping category tabs, purple active states, theme-aware placeholders, and a fixed six-color technology pill palette derived from existing theme tokens. Details use a scrollable rounded-3xl Dialog; entrance and hover motion respect reduced motion.

- Project details use a centered, wide, vertically scrollable modal with accessible close control; optional Challenge/Solution panels form two columns on desktop, and compact metrics wrap to available space. Media is omitted when absent, shows a contained photo gallery with 44px controls, or a native controlled video. Gallery fades last 700ms, advance every six seconds, pause on keyboard focus entering the gallery or the pause control, and disable automatic motion for reduced-motion preferences.

- Project list cards have no outer border or action divider. View Project stays left; GitHub and Live Preview use accessible icon-only buttons aligned right. Detail dialogs hide the scrollbar while retaining scrolling, add icons to category/Challenge/Solution/metrics, and use icon-and-text GitHub (filled purple) and Live Preview (purple outline) buttons.

- Contact uses a centered gradient heading, unboxed contact details beside a bordered theme-aware form on desktop, stacked on mobile, purple icon accents, labeled inputs with associated validation errors, and a purple gradient action. Footer follows Contact with an elevated lavender light surface/deep dark surface, wrapping navigation, accessible social icons, and a copyright divider. Entrance motion respects reduced-motion preferences.

- Contact form submission now shows Sending, disables inputs and repeat submissions while pending, announces results, clears only after server-confirmed provider acceptance, and preserves entered text on errors for retry. Client/server share field length and format rules.

- Projects display highest numeric ID first (ID 1 is oldest), with persistent soft card shadows. Legacy nonnumeric IDs appear before numeric IDs so ID 1 remains last. Gallery photos stay mounted and preload, crossfading over 700ms once the requested image loads. Automatic advance runs every six seconds; entering the gallery with keyboard focus pauses it, and Resume restarts even while the control retains focus. Reduced motion disables autoplay and fades.

- Project cards retain soft light-mode shadows; dark mode uses larger purple shadows at 20% opacity, increasing to 30% with a wider shadow on hover.

- Every full page load starts in dark mode. Theme switching remains available during the visit; saved browser theme preferences are no longer read or written. Contact information has no outer card background, border, shadow, or rounded frame; the form retains its card styling.
