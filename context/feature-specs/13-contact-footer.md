# Contact and Footer

Build the Contact section and Footer for the portfolio.

For now, implement UI only.

Do not connect the contact form to an email service or backend yet.

## Contact Section

The Contact section should allow visitors to:

- view my contact information
- access GitHub and LinkedIn
- fill out a contact form
- prepare for future email sending functionality

## Section Header

Include:

- small label: `Contact`
- main heading: `Get In Touch`
- short supporting description

Suggested description:

`Have a project, opportunity, or question? Feel free to reach out and I’ll get back to you as soon as possible.`

Use a subtle purple gradient highlight in the heading.

## Contact Layout

Use a two-column layout on desktop.

### Left Side

Display personal contact information.

Include:

- Name
- Phone Number
- Email
- GitHub
- LinkedIn

Use clear icons for each item.

Suggested icons:

- User
- Phone
- Mail
- GitHub
- LinkedIn

Each item should have:

- icon
- label
- value or link

Example structure:

```text
Name
Your Name

Phone
Your Phone Number

Email
your@email.com

GitHub
github.com/yourusername

LinkedIn
linkedin.com/in/yourusername
```

## Contact Links

### Phone

Make the phone number clickable using:

```text
tel:
```

### Email

Make the email clickable using:

```text
mailto:
```

### GitHub

Open GitHub in a new tab.

### LinkedIn

Open LinkedIn in a new tab.

Use recognizable GitHub and LinkedIn icons.

## Contact Information Card

The contact information area may use a card layout.

Requirements:

- rounded corners
- subtle border
- theme-aware background
- purple accent icons
- comfortable spacing
- subtle hover effects on clickable items
- readable in light and dark mode

## Contact Form

Create a contact form on the right side.

Fields:

- First Name
- Last Name
- Email
- Message

Include a:

- `Send Message` button

Suggested layout:

```text
First Name        Last Name

Email

Message

Send Message
```

## First Name

Required text input.

Example placeholder:

```text
John
```

## Last Name

Required text input.

Example placeholder:

```text
Doe
```

## Email

Required email input.

Example placeholder:

```text
john@example.com
```

Use:

```text
type="email"
```

## Message

Required multiline textarea.

Example placeholder:

```text
Tell me about your project, opportunity, or question...
```

The textarea should have enough height for a meaningful message.

## Send Message Button

Display a clear primary action:

```text
Send Message
```

The button may include a Send or Mail icon.

Use the portfolio's purple gradient for the primary action.

For now:

- do not send an actual email
- do not connect to an API
- do not connect to an email provider
- do not simulate successful email delivery

The button can use temporary frontend behavior until backend wiring is implemented.

## Future Email Behavior

The final implementation should eventually send the form submission directly to my email address.

Future flow:

```text
Contact Form
      ↓
Contact API
      ↓
Email Service
      ↓
My Email Inbox
```

This behavior is out of scope for the current UI feature.

Backend/email integration should be defined in a separate feature file later.

## Form Validation

For the UI version, provide basic client-side validation.

Validate:

- First Name is not empty
- Last Name is not empty
- Email is not empty
- Email has a valid format
- Message is not empty

Display validation messages close to the related field.

Do not add backend validation yet.

## Form Styling

Inputs should use:

- theme-aware background
- subtle borders
- rounded corners
- clear labels
- visible focus states
- purple focus border or glow

Keep the form clean and professional.

## Responsive Behavior

### Desktop

Use two columns:

```text
Contact Information    Contact Form
```

### Mobile

Stack vertically:

```text
Contact Information

Contact Form
```

Requirements:

- inputs use full available width
- First Name and Last Name may stack on small screens
- button remains easy to tap
- no horizontal overflow

## Footer

Place the Footer directly below the Contact section.

The Footer should have a slightly different background from the normal page background so it is visually separated.

Do not make it dramatically different from the overall portfolio design.

## Footer Background

### Dark Mode

Use a slightly lighter or deeper purple-black surface than the main page background.

Example direction:

```text
Main Background:
#09090B

Footer Background:
#121016
```

A subtle purple gradient may also be used.

Example:

```text
#121016 → #171120
```

### Light Mode

Use a soft lavender or slightly darker off-white background.

Example direction:

```text
Main Background:
#FAFAFF

Footer Background:
#F5F3FF
```

A subtle light purple gradient may also be used.

Avoid strong gradients that distract from the footer content.

## Footer Content

Include:

- portfolio name or personal name
- short professional title
- navigation links
- GitHub
- LinkedIn
- email
- copyright text

Suggested layout:

### Left

```text
Your Name
Software Engineer
```

### Center

Navigation links:

- Home
- About
- Skills
- Services
- Milestones
- Projects
- Contact

### Right

Social links:

- GitHub
- LinkedIn
- Email

## Footer Social Links

Use icons for:

- GitHub
- LinkedIn
- Email

Requirements:

- open GitHub and LinkedIn in new tabs
- email uses `mailto:`
- provide accessible labels
- use subtle purple hover states

## Footer Bottom Area

Add a subtle divider.

Below the divider, include copyright information.

Example:

```text
© 2026 Your Name. All rights reserved.
```

The year may be generated dynamically.

Optional small text:

```text
Built with Next.js and TypeScript.
```

Keep this visually secondary.

## Theme

The Contact and Footer should follow the existing portfolio theme.

### Light Mode

Use:

- white or light card surfaces
- soft lavender footer background
- purple accents
- subtle shadows
- dark readable text

### Dark Mode

Use:

- near-black card surfaces
- slightly different deep-purple footer background
- purple borders and glow
- light text

## Animation

Use subtle animation only.

Contact section:

- gentle entrance animation
- input focus transition
- button hover
- contact link hover

Footer:

- minimal or no entrance animation
- social icon hover
- navigation link hover

Respect reduced-motion preferences.

## Accessibility

- every input must have a visible label
- do not rely only on placeholder text
- use correct input types
- provide accessible error messages
- maintain visible focus states
- icons used as links require accessible labels
- maintain sufficient contrast in both themes
- phone and email links should be keyboard accessible

## UI Scope

### In Scope

- Contact section
- contact information
- Name
- Phone Number
- Email
- GitHub
- LinkedIn
- contact form
- First Name
- Last Name
- Email field
- Message field
- Send Message button
- frontend validation
- responsive layout
- light and dark mode
- differentiated footer background
- footer navigation
- footer social links

### Out Of Scope

- email API
- email provider integration
- actual email sending
- database storage for messages
- spam protection
- CAPTCHA
- server-side validation
- success/failure responses from an email service

## Check When Done

- Contact section displays correctly
- Name is displayed
- Phone Number is displayed
- Email is displayed
- GitHub link works
- LinkedIn link works
- phone link is clickable
- email link is clickable
- First Name field exists
- Last Name field exists
- Email field exists
- Message field exists
- Send Message button exists
- basic frontend validation works
- form does not send real email yet
- desktop layout uses two columns
- mobile layout stacks correctly
- Footer has a slightly different background from the main page
- Footer works in light mode
- Footer works in dark mode
- footer navigation works
- footer social links work
- no horizontal overflow
- no TypeScript errors
- no lint errors
## Implementation Details

- Use the name, phone, and email from `public/resume-2026.pdf`: Khaing Min Htwe, (925) 319-8208, kmhtwe1999@gmail.com. Use the existing hero GitHub and LinkedIn URLs.
- Valid submissions retain all entered text and show an explicit notice that nothing was sent and email contact is available. No request or storage is performed.
