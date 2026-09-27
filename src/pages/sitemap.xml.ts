// Plan du site pour les moteurs de recherche (les pages en noindex n'y figurent pas).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { services } from '../data/services';

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection('articles', ({ data }) => !data.brouillon);
  const chemins = [
    '/',
    '/accompagnements/',
    '/consultation-axe/',
    ...services.map((s) => `/${s.slug}/`),
    '/la-sphere/',
    '/huguette/',
    '/le-cabinet/',
    '/apprendre/',
    ...articles.map((a) => `/apprendre/${a.id}/`),
  ];
  const urls = chemins.map((c) => `  <url><loc>${new URL(c, site)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
