# JYOUNGBLOOD.GITHUB.IO

- Source files for [jyoungblood.github.io](https://jyoungblood.github.io)

- Created with [astro](https://astro.build)

## Repository catalog

The homepage is generated from Jonathan's public GitHub repositories and the
VergeKit organization using a first-party Astro Content Layer loader.

GitHub owns factual metadata such as language, stars, archive status, URLs, and
last-updated dates. Editorial overrides live in
`src/data/repository-curation.ts`, where a repository can be featured, ordered,
retitled, pointed to a canonical homepage, or given a portfolio-specific
description.

Personal repository overrides can use the short repository name. Organization
overrides should use the full GitHub name, such as `vergekit/repository-name`,
so repositories with matching names never collide.

The loader works without authentication for local development. Set
`GITHUB_TOKEN` (or `GH_TOKEN`) to use GitHub's higher authenticated API rate
limit. The GitHub Pages workflow passes its read-only repository token to the
build automatically.
