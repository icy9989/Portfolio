# Navbar Section

Build the main portfolio navigation shown at the top of the website.

The navbar should remain simple, responsive, and consistent across light and dark mode.

### Desktop Layout

Use a three-part navbar layout:

- left section — portfolio logo or icon
- center section — navigation links
- right section — theme toggle

### Left Section

Include:

Logo - is located inside public folder named logo.png

- clicking the logo should navigate to the top of the page
- keep the logo simple and recognizable
- maintain consistent size across themes
- logo use animation circular rotating


### Center Navigation

Include links to the main portfolio sections.

Example:

- Home
- About
- Skills
- Services
- Milestones
- Projects
- Contact

Requirements:

- clicking a link should navigate or smoothly scroll to the corresponding section
- active or hovered links may use the primary purple accent
- navigation should remain horizontally centered on desktop
- use subtle hover transitions

### Right Section

Include:

- light/dark theme toggle

Requirements:

- use a sun/moon style icon
- clicking the button switches between light and dark mode
- preserve the user's selected theme when appropriate
- use an accessible label
- maintain clear hover and focus states
- styling should match the purple theme

### Mobile Layout

On smaller screens:

- hide the center desktop navigation
- keep the logo on the left
- place the theme toggle and hamburger button on the right
- hamburger button opens the mobile navigation

### Mobile Sidebar

The mobile navigation should float above the page instead of pushing content.

Requirements:

- slides in from the right
- contains the same navigation links as desktop
- includes a close button
- closes when a navigation link is selected
- closes when the user clicks outside the sidebar
- uses a backdrop overlay
- works in both light and dark mode
- use subtle purple accents and borders

### Responsive Behavior

- desktop: logo left, navigation center, theme toggle right
- mobile: logo left, theme toggle and hamburger right
- navigation links move into the right-side mobile sidebar
- navbar should not overflow on smaller screens

### Styling

- clean and minimal appearance
- use the existing theme tokens from `globals.css`
- support both light and dark mode
- use subtle purple gradient or accent colors
- maintain readable contrast
- optionally use a subtle backdrop blur when scrolling

### Accessibility

- all navigation controls must be keyboard accessible
- icon-only buttons must include accessible labels
- visible focus states
- mobile sidebar should be dismissible with keyboard controls where appropriate

### Check when done

- desktop navbar shows logo, center navigation, and theme toggle
- mobile navbar shows logo, theme toggle, and hamburger button
- mobile navigation slides in from the right
- navigation links work correctly
- theme toggle works in both modes
- layout is responsive
- no TypeScript errors
- no lint errors