import { defineCollection } from 'astro:content';

import { githubRepositoriesLoader } from './loaders/github-repositories';

const repositories = defineCollection({
  loader: githubRepositoriesLoader({
    username: 'jyoungblood',
    organizations: ['vergekit'],
    token: process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN,
  }),
});

export const collections = { repositories };
