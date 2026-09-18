// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import typographie from './typographie.mjs';

// Le site est statique (pages pré-construites) ; seul l'espace d'administration /keystatic tourne sur le serveur Vercel.
// Adresse publique : le domaine de production déclaré sur Vercel (cabinet-pamojah.vercel.app aujourd'hui,
// le nom de domaine définitif dès qu'il y est ajouté), pour que les liens canoniques et les aperçus de partage fonctionnent.
const adresse = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://lecabinetpamojah.com';

export default defineConfig({
  site: adresse,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Navigation fluide : les pages se préchargent dès que le pointeur survole un lien.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [react(), keystatic(), typographie()],
  adapter: vercel({ webAnalytics: { enabled: false } }),
});
