# Portfolio project updates

Prepared for `Bongani-Dindi/bongani-dindi.github.io` on 5 October 2026.

## Changes

- `updates.html`: a new page with dated notes on the UV ageing chamber, irradiance calculator, solar and battery modelling, and piping/flange thermal-stress analysis. Includes category filters, search, direct links to each note, and an empty state. All notes remain readable without JavaScript.
- `index.html`: navigation and hero links to the updates page, responsive navigation, keyboard focus styling, and a corrected email link.
- Existing project pages, images and CV files stay in the repository.

## Apply to the existing repository

The patch was prepared against main commit `26594376f5006dcc4eb80dcdaf5d20f92a1e0af3`. From the repository root:

```sh
git switch -c add-project-updates
git apply --check /path/to/portfolio-project-updates.patch
git apply /path/to/portfolio-project-updates.patch
```

Alternatively, copy `index.html` and `updates.html` to the repository root after reviewing the existing homepage for intervening changes. The other portfolio assets are required to display the full homepage.

## Add another project update

Copy an `<article class="update">` in `updates.html`, give it a unique ID, and update its title, date, status, recent focus, next focus and tags. Use space-separated `engineering`, `software` and/or `energy` values in `data-category`. Update the page publication date separately from the project-note date, and update the static result-count text for browsers with JavaScript disabled. The filters and enhanced result count pick up new articles automatically.

## Verification

Checked internal links and anchors, unique IDs, accessible labels, JavaScript syntax, category filters, combined category/text search, empty-state reset, and direct-note recovery. Verified that the patch applies cleanly and reproduces the delivered source files. Browser rendering could not be checked in this session because the preview browser cannot access local files.

## GitHub status

These changes have not been uploaded. GitHub returned HTTP 403, Resource not accessible by integration. No GitHub repository installation was configured for this connection. Automatic approval review then rejected a retry to commit directly to main after that access denial. Repository access and approval to submit a review branch are needed to continue.
