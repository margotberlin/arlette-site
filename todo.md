# Todo

## Current Priorities

1. Replace placeholder project imagery and descriptions with final Studio Arlette content.
2. Add the real hero image in site settings and visually tune the hero crop on mobile and desktop.
3. Replace placeholder Instagram, LinkedIn, Facebook, and Pinterest URLs with production links.
4. Run a browser-based visual QA pass across homepage, projects, project detail, about, and contact pages.
5. Do a CMS authoring pass to confirm the new page-level content groups feel clear and intuitive for editing.

## Known Issues

- `Arlette-site/data/site.json` still contains placeholder social URLs.
- `Arlette-site/data/projects.json` still uses placeholder images and sample copy.
- The site has been smoke-tested in Node, but it still needs an in-browser visual check for spacing, font rendering, and hover states.

## Backlog

- Consider extracting shared header/footer markup if the stack later supports includes, templating, or componentization.
- Consider richer project metadata if the portfolio needs locations, categories, or years.
- Consider adding a lightweight image loading strategy if the portfolio grows significantly.
