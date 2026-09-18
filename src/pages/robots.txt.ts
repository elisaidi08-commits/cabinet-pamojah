// robots.txt : fermé aux moteurs de recherche tant que PUBLIC_INDEXER n'est pas « oui » (voir Base.astro).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const ouvert = import.meta.env.PUBLIC_INDEXER === 'oui';
  const corps = ouvert
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
