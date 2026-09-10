# Milestones Section

Build a Milestones section that combines my education and professional experience into one chronological vertical timeline.

The timeline should visually represent my journey from education to professional software development.

### Section Header

Include:

- small label: `My Journey`
- main heading: `Milestones`
- short supporting description

Suggested description:

`A timeline of my education, experience, and growth as a software engineer.`

Use subtle purple gradient styling consistent with the portfolio.

### Timeline

Create a vertical timeline containing both:

- Education
- Work Experience

Requirements:

- newest milestone appears at the top
- oldest milestone appears at the bottom
- timeline visually progresses from bottom to top
- use a vertical connecting line
- each milestone has a timeline marker
- alternate cards between the left and right sides on desktop
- stack milestones into a single-column timeline on mobile

### Milestone Card

Each milestone should contain:

- year or date range
- milestone type: `Education` or `Experience`
- degree or job title
- university or company name
- location if applicable
- short description
- relevant technologies or skills where useful

Keep descriptions concise and focused on important accomplishments.

### Education Milestones

Education cards may include:

- degree
- field of study
- university
- graduation year
- short academic highlight

Use a graduation-cap or education-related icon.

### Experience Milestones

Experience cards may include:

- job title
- company
- employment period
- short description of responsibilities or impact
- relevant technologies

Use a briefcase or work-related icon.

### Visual Difference

Education and experience should belong to the same timeline but remain easy to distinguish.

Use:

- different icons
- small `Education` / `Experience` labels
- subtle variations of the purple accent

Do not use completely different card designs.

### Timeline Animation

Animate milestones as the visitor scrolls.

Requirements:

- cards subtly fade or slide into view
- timeline markers may activate as they enter the viewport
- timeline line may visually progress from bottom toward the top
- keep animations smooth and minimal
- respect reduced-motion preferences

### Theme

Support both light and dark mode.

#### Light Mode

- light or white milestone cards
- soft lavender surfaces
- purple timeline and markers
- subtle shadows and borders

#### Dark Mode

- dark purple/near-black cards
- purple gradient timeline
- light text
- subtle purple borders and glow

### Responsive Behavior

Desktop:

- vertical timeline centered
- milestone cards alternate left and right

Mobile:

- timeline moves toward the left
- all cards appear on the right side of the timeline
- maintain clear spacing between milestones
- no horizontal overflow

### Data Structure

Keep milestone content separate from the UI so additional education or work experience can be added easily.

Each milestone should support:

`type`, `title`, `organization`, `startDate`, `endDate`, `location`, `description`, and `skills`.

Sort milestones by date before displaying them.

### Check when done

- Milestones heading displays correctly
- education and work experience appear in one timeline
- newest milestone appears at the top
- oldest milestone appears at the bottom
- education and experience are visually distinguishable
- timeline animation works smoothly
- cards alternate on desktop
- timeline stacks correctly on mobile
- light and dark modes work correctly
- no TypeScript errors
- no lint errors
### Implementation content and ordering

- Use the two degree entries and three professional roles in `public/resume-2026.pdf` as the initial content source. The university capstone is an academic highlight of the master's degree. Omit locations because the resume does not explicitly provide them for these entries.
- Store year-precision dates as `YYYY`; also support `YYYY-MM` and `YYYY-MM-DD`. A null end date represents an ongoing milestone. Sort by end date descending (ongoing first), then start date descending.
- Reveal cards once as they enter the viewport; content remains visible without JavaScript and with reduced motion. The optional animated line fill is not required; a bottom-to-top purple gradient connects the markers.
