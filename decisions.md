# Decisions

This file records durable project decisions so future changes can stay consistent with the current direction.

## 2026-03-28 - Adopt Soft Editorial Direction

- Decision: Use a soft editorial aesthetic inspired by Beata Heuman rather than a literal visual clone.
- Why: The goal was to capture the warmth, image-led storytelling, and editorial calm of the reference while keeping Studio Arlette distinct.
- Impact: Warm neutral backgrounds, serif-forward headings, restrained borders, and spacious portfolio layouts are now the baseline visual language.

## 2026-03-28 - Brand Name Standardized as `Studio Arlette`

- Decision: Use `Studio Arlette` as the logo/header brand text on all pages.
- Why: The project detail page already used this wording and it better matches the studio positioning.
- Impact: All page headers and footer branding should stay aligned unless a future branding change explicitly overrides this.

## 2026-03-28 - Homepage Selected Work Uses Featured Project Data

- Decision: Homepage selected work is driven by project-level `featured` flags and optional `featured_order` values.
- Why: This keeps the homepage curated without introducing a second disconnected content source.
- Impact: Any future homepage portfolio updates should happen in `Arlette-site/data/projects.json` and remain CMS-editable.

## 2026-03-28 - Projects Page Uses Auto-Rotating Image Reels

- Decision: Portfolio cards auto-rotate project images instead of using manual carousel controls.
- Why: It keeps the page image-led and elegant without adding heavy interface chrome.
- Impact: Reel behavior should remain subtle, and single-image projects must continue to render without errors.

## 2026-03-28 - Shared Footer Across All Pages

- Decision: Every page uses the same footer structure, branding, navigation, and social links.
- Why: The footer is part of the site identity and should feel consistent across the whole experience.
- Impact: Footer changes should be applied to every page entry point in the same task.

## 2026-03-28 - Mobile Navigation Expands Within a Fixed-Radius Shell

- Decision: The mobile nav opens downward inside a fixed-radius container rather than changing the header into a pill/ellipse shape.
- Why: The previous open state visually distorted the header shell and made the expanded area feel mismatched.
- Impact: Future header changes should preserve the shell radius and expand content vertically within it.

## 2026-03-28 - Project Memory Lives in Markdown Docs

- Decision: Maintain `decisions.md`, `patterns.md`, and `todo.md` alongside `AGENTS.md`.
- Why: `AGENTS.md` is operational guidance, while these files capture rationale, reusable UI/content patterns, and ongoing priorities.
- Impact: When a change alters product direction, reusable conventions, or current priorities, update the relevant markdown file in the same task.

## 2026-03-28 - Material Page Copy Lives in the CMS

- Decision: All non-header, non-footer page copy with editorial meaning should be editable in the CMS.
- Why: The site owner should be able to manage homepage, about, projects, contact, and per-project storytelling without editing HTML.
- Impact: Page-level editorial content now belongs in `Arlette-site/data/site.json`, and project-level content belongs in `Arlette-site/data/projects.json`.

## 2026-03-28 - Page Content Is Grouped by Page in Site Settings

- Decision: Shared site settings now include page-scoped content objects such as `about_page`, `home_page`, `projects_page`, and `contact_page`.
- Why: Grouping related fields by page keeps the CMS clearer, reduces ambiguity, and makes the JSON easier to reason about.
- Impact: Future additions to editable page copy should usually extend the relevant page object instead of adding loose top-level keys.
