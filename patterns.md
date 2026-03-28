# Patterns

This file captures the recurring product, content, and implementation patterns that define the current Studio Arlette site.

## Visual Patterns

### Editorial Typography

- Use `Cormorant Garamond` for major headings and brand marks.
- Use `Manrope` for body copy, navigation, and utility text.
- Keep uppercase eyebrow labels lightly tracked and understated.

### Color and Surface System

- Page background: warm neutral (`#f6f1e8` range).
- Raised content surfaces: lighter cream panels with soft borders and subtle shadows.
- Footer: deep brown/charcoal background with muted stone text.

### Rounded Geometry

- Shared header shell: fixed large radius with overflow clipped.
- Content panels: large rounded corners for a soft, residential feel.
- Project imagery: rounded cards with gentle shadows.

## Layout Patterns

### Shared Header

- Fixed header on every page.
- Desktop nav stays inline.
- Mobile nav expands downward inside the same rounded shell.
- Mobile menu background should match the header shell so the open state feels continuous.

### Shared Footer

- All pages use the same three-part footer:
  - Studio branding/copy
  - Navigation links
  - Social icons linked from site settings

### Homepage Portfolio

- The homepage uses an editorial `Selected Work` layout rather than a generic card grid.
- Each featured item includes:
  - Large lead image
  - Project title
  - Project description
  - Text link to the detail page
- Featured projects alternate orientation for rhythm.

### Projects Listing

- The projects page is a portfolio grid of image-led cards.
- Each card shows:
  - Auto-rotating image reel
  - Project title underneath
  - Click-through image area to the project detail page

### Project Detail

- Project detail pages use a simple editorial intro block followed by a gallery grid.
- The detail page continues to resolve projects by `slug`.

### Contact Page

- Contact is presented as an editorial contact list rather than icon tiles.
- Email and social handles are rendered as text links populated from site data.

## Content Patterns

### Site Settings

Use `Arlette-site/data/site.json` for:

- Brand title
- Tagline
- About page copy
- Email
- Hero image
- Social URLs
- Page-level editorial content objects:
  - `about_page`
  - `home_page`
  - `projects_page`
  - `contact_page`

### Page-Level CMS Structure

- `about_page` stores the About page section label, title, and body.
- `home_page` stores the homepage section label, title, intro, and featured-item label.
- `projects_page` stores the projects-page section label, title, and intro.
- `contact_page` stores the contact-page section label, title, intro, and visible row labels.
- Header, navigation, and footer copy remain hardcoded unless a future task explicitly changes that decision.

### Project Data

Use `Arlette-site/data/projects.json` for:

- Project title
- Slug
- Description
- Featured status
- Featured order
- Image list
- Add/remove/reorder project entries through the CMS list interface

## Implementation Patterns

### Shared Rendering Logic

- Keep shared page behavior in `Arlette-site/script.js`.
- Functions should no-op safely when their target DOM nodes are missing.
- Shared data is fetched once and cached in memory.

### Defensive Image Handling

- Project image lists may contain strings or CMS-style objects; normalize before rendering.
- Single-image projects should never break reel or gallery rendering.

### Documentation Hygiene

- Update `decisions.md` when a long-lived choice changes.
- Update `patterns.md` when a reusable visual or implementation convention changes.
- Update `todo.md` when priorities or known issues change.
