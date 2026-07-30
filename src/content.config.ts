import { defineCollection } from 'astro:content';

import { repositoryCuration } from './data/repository-curation';
import { githubRepositoriesLoader } from './loaders/github-repositories';

const repositories = defineCollection({
  loader: githubRepositoriesLoader({
    username: 'jyoungblood',
    organizations: ['vergekit'],
    token: process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN,
    curation: repositoryCuration,
  }),
});

export const collections = { repositories };
