# AGENTS.md

## Purpose

This file is the default agent playbook for work in this repository. Use it to orient quickly, make safe changes, and preserve the current behavior of the Arlette site.

## Current State

Last Update: 2026-03-28

- Active Branch: `dev`
- Visual Direction: Soft editorial with warm neutrals, serif-forward headings, and image-led portfolio layouts.
- Recent Change: The portfolio refresh introduced featured homepage work, auto-rotating project reels, editable social links, shared footer treatment, and a fixed-radius mobile navigation shell.
- Known Issue: Real project imagery, real hero imagery, and production social/profile URLs still need to replace placeholder content in `site.json` and `projects.json`.
- Next Priority: Replace placeholder content with final assets and copy, then do a visual QA pass on desktop and small-screen mobile.

## Project Overview

- This repo contains a small static marketing and portfolio site in `Arlette-site/`.
- The site is built from plain HTML pages, a shared browser script, JSON content files, and Netlify CMS config.
- Current priorities should favor minimal, targeted edits over broad refactors unless the task explicitly asks for structural cleanup.
- The current visual direction is soft editorial: warm neutrals, serif-forward headings, image-led layouts, and restrained interaction.

## Repo Map

- `Arlette-site/index.html`, `projects.html`, `project.html`, `about.html`, `contact.html`: page entry points.
- `Arlette-site/script.js`: shared client-side behavior for site data loading, featured-work rendering, project list reels, project detail pages, contact/footer social links, and mobile navigation.
- `Arlette-site/data/site.json`: site-wide content such as title, tagline, optional page-level editorial copy blocks for home/about/projects/contact, email, optional hero image, and social links.
- `Arlette-site/data/projects.json`: project content stored as an object with a top-level `projects` array. Each project currently uses `title`, `slug`, `description`, `featured`, `featured_order`, and `images`.
- `Arlette-site/admin/config.yml`: Netlify CMS configuration and content schema assumptions.
- `Arlette-site/styles.css`: additional or legacy stylesheet. The current pages rely primarily on Tailwind utility classes from the CDN plus small inline page styles, so treat CSS changes carefully and keep styling patterns consistent with the page being edited.
- `decisions.md`, `patterns.md`, `todo.md`: living project docs for rationale, UI/content patterns, and current priorities.

## Working Principles

- Start by reading the specific page and any shared data or script files it depends on before editing.
- Prefer the smallest change that solves the request.
- Preserve the current visual language unless the task explicitly asks for a redesign.
- Assume `script.js` is a shared behavior surface. Changes there can affect multiple pages.
- Do not change JSON shapes or CMS schema assumptions unless the task explicitly requires it.
- Keep content changes in JSON when the page already reads that content from data files.
- Keep behavior changes in `script.js` unless a page-specific inline script already owns that behavior.
- Keep page structure changes in the relevant HTML file unless the same markup pattern is duplicated across multiple pages and the task calls for cleanup.
- When updating shared chrome such as the header, mobile nav, or footer, apply the change consistently across all page entry points in the same task.

## How To Approach Common Tasks

### Content updates

- Check whether the content is data-driven before editing page markup.
- For site-wide copy, page-level editorial text, email, or social links, prefer `Arlette-site/data/site.json`.
- For portfolio items, homepage featured-work selection, and project image reels, prefer `Arlette-site/data/projects.json`.
- If you add a new required field to content, update `Arlette-site/admin/config.yml` in the same task.
- Record important product or design decisions in `decisions.md` when the task changes a long-lived site convention.

### Layout or page updates

- Edit only the affected page first.
- Confirm the shared mobile navigation still works after markup changes.
- Preserve existing accessibility basics such as button semantics, link behavior, alt text, and heading order where practical.
- Keep the page responsive on mobile and desktop.
- When adjusting branding in headers, keep the logo text consistent as `Studio Arlette` unless the task explicitly changes it.
- Keep the footer visually and structurally consistent on every page unless the task explicitly calls for a one-off exception.

### Project-related changes

- Treat `index.html`, `projects.html`, and `project.html` as a connected portfolio flow.
- Preserve the contract expected by the featured-work renderer, the projects-page reel renderer, and `loadProjectPage()` in `Arlette-site/script.js`.
- Homepage `Selected Work` is driven by per-project `featured` flags and optional `featured_order` values.
- Projects-page cards are image-led and may auto-rotate through `images`; make sure single-image projects remain stable.
- If you change project fields or rendering assumptions, verify the homepage featured section, projects listing page, and project detail page still work.

### Shared script changes

- Review every function in `Arlette-site/script.js` that touches the area you are editing.
- Watch for cross-page dependencies:
  - `loadSite()` reads `site.json`, updates text content, email links, social links, and the homepage hero image.
  - `loadFeaturedProjects()` reads `projects.json` and populates `featured-projects`.
  - `loadProjects()` reads `projects.json`, populates `projects-grid`, and initializes the projects-page image reels.
  - `loadProjectPage()` reads the `slug` query param and renders a matching project.
  - `initNavigation()` controls the mobile menu.
- Guard DOM queries defensively, following the existing pattern where features no-op on pages that do not include the relevant elements.

## Validation Checklist

Before finishing a task, verify the change against the surfaces it can affect.

- Open the directly affected page or pages and check for visible regressions.
- If shared chrome changed, verify the header, mobile navigation, and footer on every page.
- If `script.js` changed, verify home, projects, project detail, and contact/footer behavior still work.
- If `site.json` changed, verify site title, tagline, about text, email, social links, and hero behavior as applicable.
- If `projects.json` changed, verify homepage featured work renders correctly, projects-page reels render correctly, and detail pages still resolve by `slug`.
- If markup changed, check the mobile navigation toggle still opens, closes, and resets on larger screens.
- Check for obvious console/runtime errors in the browser.
- Ensure links, image paths, and JSON field names still match the current implementation.
- If CMS-related files changed, confirm the content schema in `admin/config.yml` still matches both JSON files and the runtime code.
- Verify the footer Instagram icon is visually recognizable and that footer/contact social links stay in sync.

## Defaults And Guardrails

- Default to balanced, maintainable changes rather than speculative rewrites.
- Prefer consistency with existing code over introducing a new pattern for a small task.
- Leave unrelated files untouched.
- Call out any mismatch you notice between CMS schema, JSON content, and runtime code if it is not safe to fix within the task.
