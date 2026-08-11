import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import process from 'node:process';

const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site: site,
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    ...(site ? [sitemap()] : []),
  ],
});

