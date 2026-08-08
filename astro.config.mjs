import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  site: 'https://jyoungblood.github.io',
  outDir: './docs',
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      GH_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
});
