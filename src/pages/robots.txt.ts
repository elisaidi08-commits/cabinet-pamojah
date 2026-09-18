// robots.txt : les moteurs peuvent parcourir le site, mais tant que PUBLIC_INDEXER n'est pas « oui », chaque page porte
// la balise noindex (voir Base.astro). Bloquer ici les empêcherait de lire cette balise.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const ouvert = import.meta.env.PUBLIC_INDEXER === 'oui';
  const corps = ouvert
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`
    : 'User-agent: *\nAllow: /\n';
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
