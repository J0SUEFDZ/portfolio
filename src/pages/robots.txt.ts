import type { APIRoute } from 'astro';
import { absoluteUrl } from '../utils/url';

export const GET: APIRoute = async ({ site }) => {
  const sitemapLine = site ? `\nSitemap: ${absoluteUrl('sitemap-index.xml', site)}\n` : '';

  const body = `User-agent: *
Allow: /${sitemapLine}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
