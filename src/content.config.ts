import { defineCollection } from 'astro:content';
import { GH_TOKEN, GITHUB_TOKEN } from 'astro:env/server';

import { githubRepositoriesLoader } from './loaders/github-repositories';

const repositories = defineCollection({
  loader: githubRepositoriesLoader({
    username: 'jyoungblood',
    organizations: ['vergekit'],
    token: GITHUB_TOKEN ?? GH_TOKEN,
  }),
});

export const collections = { repositories };
