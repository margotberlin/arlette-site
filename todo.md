# Todo

## Current Priorities

1. [ ] Finish replacing placeholder project imagery and descriptions with final Studio Arlette content.
2. [ ] Visually tune the hero image crop on mobile and desktop.
3. [ ] Replace placeholder Instagram and Pinterest URLs with production links.
4. [ ] Run a browser-based visual QA pass across homepage, projects, project detail, services, about, and contact pages.
5. [ ] Do a CMS authoring pass to confirm the new page-level content groups feel clear and intuitive for editing.
6. [ ] Remove homepage section labels, including any remaining label fields on homepage sections in the CMS/content model.

## Completed

- [x] Add the real hero image in site settings.
- [x] Confirm project detail routing still works when the CMS project `slug` field is blank.
- [x] Remove LinkedIn and Facebook links from the contact page and the shared footer.
- [x] Add a new `services` page and integrate it into the shared site navigation.
- [x] Extend the CMS and content model so each page can support multiple sections with optional images per section.
- [x] Add the studio email as a mailto link beneath the Instagram and Pinterest links in the footer.
- [x] Remove the project `slug` field from the CMS now that live routing can fall back to project titles.

## Known Issues

- `Arlette-site/data/site.json` still contains placeholder Instagram and Pinterest URLs.
- Some project content still needs final content QA, especially shorter draft copy and any temporary project imagery.
- The site has been smoke-tested in Node, but it still needs an in-browser visual check for spacing, font rendering, and hover states.

## Backlog

- Consider extracting shared header/footer markup if the stack later supports includes, templating, or componentization.
- Consider richer project metadata if the portfolio needs locations, categories, or years.
- Consider adding a lightweight image loading strategy if the portfolio grows significantly.
- Consider reorganizing the CMS sidebar so page editing and section/image management feel more distinct than the current combined content view.
