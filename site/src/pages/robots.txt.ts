import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response('User-agent: *\nAllow: /\nSitemap: https://pnp.github.io/powerplatform-samples/sitemap-index.xml\n', { headers: { 'Content-Type': 'text/plain' } });
