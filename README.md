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
`GITHUB_TOKEN` (or `GH_TOKEN`) to populate latest-release and default-branch
commit-count metadata through GitHub's GraphQL API.
Without a token, those two table columns remain blank. For local development,
copy `.env.example` to `.env`, replace the placeholder with a read-only token,
and restart the development server.

## Deployment

GitHub Pages publishes the locally generated site from `/docs` on `master`.
Configure the repository's Pages source once as **Deploy from a branch**, using
the `master` branch and `/docs` folder. Then commit source changes normally and
run `npm run deploy` from a clean working tree to build, commit, and push the
generated site. No GitHub Actions secret is required.
