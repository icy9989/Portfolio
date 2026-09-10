# Hero Section

Build the main introduction section shown at the top of the portfolio. It should immediately communicate who I am, what I do, and provide clear actions for recruiters or visitors.

### Hero Content

Create the hero section component.

Requirements:

* full-width introductory section below the navbar
* responsive two-column layout on desktop
* stacked layout on mobile
* left side contains introduction content
* right side contains the animated profile design
* layout should remain balanced in both light and dark mode
* use subtle purple gradient accents that match the portfolio theme

### Introduction

Include:

* short greeting
* name as the main heading : `Khaing Min Htwe`
* position: `Software Engineer`
* short professional introduction -`Full Stack Software Engineer passionate about building scalable web applications, AI-powered systems, and reliable products that solve real-world problems.`
* highlighted words may use the primary purple gradient

Keep the text concise and easy to scan.

### Hero Actions

Include:

* `Download Resume` - resume is inside public folder (resume-2026.pdf)
* `Contact Me`

Requirements:

* resume button downloads or opens the resume file
* contact button navigates to the contact section
* primary action may use a purple gradient
* buttons should work in both light and dark mode
* include subtle hover and focus states

### Social Links

Include:

* GitHub - `https://github.com/icy9989`
* LinkedIn - `https://www.linkedin.com/in/kmhtwe/`

Requirements:

* display below the hero action buttons
* use recognizable icons
* open links in a new tab
* include accessible labels
* use subtle purple hover effects

### Profile Design

Display my professional profile photo inside an animated circular design inspired by the provided reference.

my profile is inside pulbic folder - profile.png

Requirements:

* use my profile photo in the center
* crop the image into a clean circular shape
* maintain image quality and correct aspect ratio
* optimize the image using Next.js `Image`
* surround the photo with two circular rings
* use purple and complementary gradient accents
* design should work in both light and dark mode

### Rotating Technology Ring

Place the following words around or between the circular rings:

* Development
* AI/ML
* Code
* Cloud
* DevOps

Requirements:

* arrange the words around the circumference of the ring
* separate items with simple dots or similar separators
* rotate the outer ring continuously in a circular motion
* keep the profile photo stationary
* animation should be slow, smooth, and professional
* text should remain readable and visually balanced
* purple gradient may be used on the ring border or accents

### Responsive Behavior

* desktop: introduction on the left and profile design on the right
* mobile: stack content vertically
* introduction should appear before the profile design
* circular profile design should scale down on smaller screens
* buttons may stack when necessary
* prevent horizontal overflow

### Animation

Use subtle animation throughout the hero.

Support:

* introduction fade or slide-in
* profile design entrance
* continuous rotating technology ring
* button hover transitions
* subtle purple glow or gradient movement

Avoid excessive or distracting animation.

Respect reduced-motion preferences.

### Check when done

* hero works correctly in light and dark mode
* desktop layout shows content and profile side by side
* mobile layout stacks correctly
* profile photo appears inside the circular design
* technology labels appear around the ring
* circular ring rotates smoothly
* profile image remains stationary
* resume and contact buttons work
* GitHub and LinkedIn links work
* profile image is responsive and optimized
* no TypeScript errors
* no lint errors


