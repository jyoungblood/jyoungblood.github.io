import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';

import type { RepositoryCuration } from '../data/repository-curation';

interface GitHubRepository {
  archived: boolean;
  default_branch: string;
  description: string | null;
  disabled: boolean;
  fork: boolean;
  forks_count: number;
  full_name: string;
  homepage: string | null;
  html_url: string;
  is_template: boolean;
  language: string | null;
  license: { spdx_id: string | null } | null;
  name: string;
  open_issues_count: number;
  owner: {
    login: string;
    type: string;
  };
  pushed_at: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

interface GitHubRepositoriesLoaderOptions {
  username?: string;
  organizations?: string[];
  token?: string;
  curation?: Record<string, RepositoryCuration>;
}

const repositorySchema = z.object({
  name: z.string(),
  fullName: z.string(),
  owner: z.string(),
  ownerType: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  homepage: z.string().url().nullable(),
  language: z.string().nullable(),
  license: z.string().nullable(),
  topics: z.array(z.string()),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  openIssues: z.number().int().nonnegative(),
  updatedAt: z.string(),
  pushedAt: z.string().nullable(),
  defaultBranch: z.string(),
  archived: z.boolean(),
  disabled: z.boolean(),
  fork: z.boolean(),
  template: z.boolean(),
  featured: z.boolean(),
  order: z.number(),
});

function nextPage(linkHeader: string | null): string | null {
  if (!linkHeader) return null;

  for (const part of linkHeader.split(',')) {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match?.[2] === 'next') return match[1];
  }

  return null;
}

async function fetchRepositories(
  initialUrl: string,
  userAgent: string,
  token?: string,
): Promise<GitHubRepository[]> {
  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    'User-Agent': `${userAgent}-astro-portfolio`,
    'X-GitHub-Api-Version': '2022-11-28',
  });

  if (token) headers.set('Authorization', `Bearer ${token}`);

  const repositories: GitHubRepository[] = [];
  let url: string | null = initialUrl;

  while (url) {
    const response: Response = await fetch(url, { headers });

    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining');
      throw new Error(
        `GitHub repository request failed (${response.status} ${response.statusText}).` +
          (remaining === '0' ? ' Set GITHUB_TOKEN to increase the API rate limit.' : ''),
      );
    }

    repositories.push(...((await response.json()) as GitHubRepository[]));
    url = nextPage(response.headers.get('link'));
  }

  return repositories;
}

export function githubRepositoriesLoader({
  username,
  organizations = [],
  token,
  curation = {},
}: GitHubRepositoriesLoaderOptions) {
  return {
    name: 'github-repositories',
    schema: repositorySchema,
    load: async ({ store, parseData, logger }) => {
      const sources = [
        ...(username
          ? [
              `https://api.github.com/users/${encodeURIComponent(username)}/repos` +
                '?per_page=100&sort=updated&type=owner',
            ]
          : []),
        ...organizations.map(
          (organization) =>
            `https://api.github.com/orgs/${encodeURIComponent(organization)}/repos` +
            '?per_page=100&sort=updated&type=all',
        ),
      ];

      if (sources.length === 0) {
        throw new Error('The GitHub repositories loader needs a username or organization.');
      }

      const batches = await Promise.all(
        sources.map((source) => fetchRepositories(source, username ?? organizations[0], token)),
      );
      const repositories = [
        ...new Map(batches.flat().map((repository) => [repository.full_name, repository])).values(),
      ];

      // Only clear persisted content after a successful fetch.
      store.clear();

      for (const repository of repositories) {
        const isPersonalRepository =
          username?.toLocaleLowerCase() === repository.owner.login.toLocaleLowerCase();
        const editorial =
          curation[repository.full_name] ??
          (isPersonalRepository ? curation[repository.name] : undefined) ??
          {};
        const id = repository.full_name;
        const data = await parseData({
          id,
          data: {
            name: repository.name,
            fullName: repository.full_name,
            owner: repository.owner.login,
            ownerType: repository.owner.type,
            title: editorial.title ?? repository.name,
            description: editorial.description ?? repository.description,
            url: repository.html_url,
            homepage:
              editorial.homepage !== undefined
                ? editorial.homepage
                : repository.homepage?.trim() || null,
            language: repository.language,
            license: repository.license?.spdx_id ?? null,
            topics: repository.topics ?? [],
            stars: repository.stargazers_count,
            forks: repository.forks_count,
            openIssues: repository.open_issues_count,
            updatedAt: repository.updated_at,
            pushedAt: repository.pushed_at,
            defaultBranch: repository.default_branch,
            archived: repository.archived,
            disabled: repository.disabled,
            fork: repository.fork,
            template: repository.is_template,
            featured: editorial.featured ?? false,
            order: editorial.order ?? Number.MAX_SAFE_INTEGER,
          },
        });

        store.set({ id, data });
      }

      logger.info(
        `Loaded ${repositories.length} public repositories from ${sources.length} GitHub sources.`,
      );
    },
  } satisfies Loader;
}
