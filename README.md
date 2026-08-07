# JYOUNGBLOOD.GITHUB.IO

- Source files for [jyoungblood.github.io](https://jyoungblood.github.io)

- Created with [astro](https://astro.build)

## Repository catalog

The homepage is generated from Jonathan's public GitHub repositories and the
VergeKit organization using a first-party Astro Content Layer loader. Private,
internal, and archived repositories are excluded before the page is generated.

GitHub owns factual metadata such as language, stars, archive status, URLs, and
last-updated dates, including the repository name and description. The only
local curation lives at the top of `src/pages/index.astro`:
`featuredRepositoryNames` selects and orders featured projects, while
`hiddenRepositoryNames` removes projects from the repository table.

A short repository name in either list matches that name under any fetched
owner. Use the full GitHub name, such as `vergekit/repository-name`, when you
need to distinguish repositories with matching names.

The loader works without authentication for local development. Set
`GITHUB_TOKEN` (or `GH_TOKEN`) to use GitHub's higher authenticated API rate
limit. The GitHub Pages workflow passes its read-only repository token to the
build automatically.
