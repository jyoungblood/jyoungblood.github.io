export interface RepositoryCuration {
  featured?: boolean;
  homepage?: string | null;
  order?: number;
  title?: string;
  description?: string;
}

/**
 * GitHub remains the source of truth for repository metadata. This map only
 * contains the editorial choices that GitHub cannot express for this site.
 */
export const repositoryCuration = {
  'vphp.dev': {
    featured: true,
    order: 10,
    title: 'VPHP',
    description: 'A collection of dependency-free utility PHP classes.',
    homepage: 'https://vphp.dev',
  },
  darkwave: {
    featured: true,
    order: 20,
    title: 'Darkwave',
    description: 'A web application development kit for Astro.',
  },
  pocketdocs: {
    featured: true,
    order: 30,
    title: 'Pocket Docs',
    description: 'An attractive template for single-page documentation built with semantic HTML.',
  },
  'smoke.js': {
    featured: true,
    order: 40,
    title: 'Smoke.js',
    description: 'A framework-agnostic styled alert system for JavaScript.',
    homepage: 'https://smoke.js.org',
  },
  'jquery-digital-sign': {
    featured: true,
    order: 50,
    title: 'jQuery Digital Sign',
    description: 'A simple digital signage solution built with jQuery and Tachyons.',
  },
  stereo: {
    featured: true,
    order: 60,
    title: 'STEREO',
    description: 'A pragmatic toolkit for internet makers working in PHP.',
  },
} satisfies Record<string, RepositoryCuration>;
