# AGENTS.md

## Purpose

This file is the default agent playbook for work in this repository. Use it to orient quickly, make safe changes, and preserve the current behavior of the Arlette site.

## Project Overview

- This repo contains a small static marketing and portfolio site in `Arlette-site/`.
- The site is built from plain HTML pages, a shared browser script, JSON content files, and Netlify CMS config.
- Current priorities should favor minimal, targeted edits over broad refactors unless the task explicitly asks for structural cleanup.

## Repo Map

- `Arlette-site/index.html`, `projects.html`, `project.html`, `about.html`, `contact.html`: page entry points.
- `Arlette-site/script.js`: shared client-side behavior for site data loading, project rendering, project detail pages, and mobile navigation.
- `Arlette-site/data/site.json`: site-wide content such as title, tagline, about text, email, and optional hero image.
- `Arlette-site/data/projects.json`: project card and project detail content. Each project currently uses `title`, `slug`, `description`, and `images`.
- `Arlette-site/admin/config.yml`: Netlify CMS configuration and content schema assumptions.
- `Arlette-site/styles.css`: additional or legacy stylesheet. The current pages rely primarily on Tailwind utility classes from the CDN, so treat CSS changes carefully and keep styling patterns consistent with the page being edited.

## Working Principles

- Start by reading the specific page and any shared data or script files it depends on before editing.
- Prefer the smallest change that solves the request.
- Preserve the current visual language unless the task explicitly asks for a redesign.
- Assume `script.js` is a shared behavior surface. Changes there can affect multiple pages.
- Do not change JSON shapes or CMS schema assumptions unless the task explicitly requires it.
- Keep content changes in JSON when the page already reads that content from data files.
- Keep behavior changes in `script.js` unless a page-specific inline script already owns that behavior.
- Keep page structure changes in the relevant HTML file unless the same markup pattern is duplicated across multiple pages and the task calls for cleanup.

## How To Approach Common Tasks

### Content updates

- Check whether the content is data-driven before editing page markup.
- For site-wide copy, prefer `Arlette-site/data/site.json`.
- For portfolio items, prefer `Arlette-site/data/projects.json`.
- If you add a new required field to content, update `Arlette-site/admin/config.yml` in the same task.

### Layout or page updates

- Edit only the affected page first.
- Confirm the shared mobile navigation still works after markup changes.
- Preserve existing accessibility basics such as button semantics, link behavior, alt text, and heading order where practical.
- Keep the page responsive on mobile and desktop.

### Project-related changes

- Treat `projects.html` and `project.html` as a paired flow.
- Preserve the contract expected by `createProjectCard()` and `loadProjectPage()` in `Arlette-site/script.js`.
- If you change project fields or rendering assumptions, verify both the listing page and the project detail page still work.

### Shared script changes

- Review every function in `Arlette-site/script.js` that touches the area you are editing.
- Watch for cross-page dependencies:
  - `loadSite()` reads `site.json`.
  - `loadProjects()` reads `projects.json` and populates `projects-grid` or `featured-projects`.
  - `loadProjectPage()` reads the `slug` query param and renders a matching project.
  - `initNavigation()` controls the mobile menu.
- Guard DOM queries defensively, following the existing pattern where features no-op on pages that do not include the relevant elements.

## Validation Checklist

Before finishing a task, verify the change against the surfaces it can affect.

- Open the directly affected page or pages and check for visible regressions.
- If `script.js` changed, verify home, projects, and project detail behavior still work.
- If `site.json` changed, verify site title, tagline, about text, email, and hero behavior as applicable.
- If `projects.json` changed, verify project cards render and detail pages still resolve by `slug`.
- If markup changed, check the mobile navigation toggle still opens, closes, and resets on larger screens.
- Check for obvious console/runtime errors in the browser.
- Ensure links, image paths, and JSON field names still match the current implementation.
- If CMS-related files changed, confirm the content schema in `admin/config.yml` still matches the JSON data shape used by the site.

## Defaults And Guardrails

- Default to balanced, maintainable changes rather than speculative rewrites.
- Prefer consistency with existing code over introducing a new pattern for a small task.
- Leave unrelated files untouched.
- Call out any mismatch you notice between CMS schema, JSON content, and runtime code if it is not safe to fix within the task.

