// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Served from GitHub Pages as a project site: https://j0suefdz.github.io/portfolio/
// For a custom domain: set `site` to the domain, remove `base`, add public/CNAME.
// https://astro.build/config
export default defineConfig({
  site: 'https://j0suefdz.github.io',
  base: '/portfolio',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon(), sitemap()]
});
