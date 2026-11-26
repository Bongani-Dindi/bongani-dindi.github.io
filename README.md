# Bongani Dindi – portfolio

Source for [bongani-dindi.github.io](https://bongani-dindi.github.io/), a static site served by GitHub Pages. There is no build step: edit the HTML and push.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Home: introduction, quick facts, project cards, skills, experience and contact |
| `updates.html` | Dated project update notes, with filters and search |
| `about.html` | About me |
| `projects/*.html` | One page per project |
| `404.html` | Shown by GitHub Pages for any missing address (uses root-relative links) |
| `assets/site.css` | The only stylesheet; every page links to it |
| `assets/site.js` | Shared behaviour: the footer year, and filters and search on Home and Updates |
| `images/` | Images used by the pages, plus original source photos |
| `BONGANI_DINDI_CV.pdf` | The CV behind every “Download CV” link |

Every page uses the same header, navigation and footer markup. When one changes, update it on every page.

## Add a project

1. Copy a project page in `projects/` (for example `uv_chamber.html`) and replace its content. Keep the `hero`, `contents`, `chapter` and `next-block` sections so the page matches the others.
2. Copy an `<article class="project-card">` in `index.html#projects`, point its title link at the new page, and set `data-category` to space-separated `engineering`, `software`, `energy` and/or `art`. A filter only appears when at least one card uses its category.
3. Update the static project count in the `data-filter-count` paragraph, for visitors without JavaScript.

## Add a project update

Copy an `<article class="update">` in `updates.html`, give it a unique `id`, and update its title, date, status, recent focus, next focus and tags. Set `data-category` as for project cards. Update the “Page updated” date and the static count separately; the filters and the enhanced count pick up new notes automatically.

## Images

Use JPEG or WebP for photos and renders, and SVG for charts and diagrams. Give every `<img>` its `width`, `height` and an `alt` text that describes what it shows. Browsers other than Safari cannot display TIFF, so convert TIFF files before using them.
