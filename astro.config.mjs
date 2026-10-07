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
  // Navigation fluide : les pages des liens visibles à l'écran se préchargent en arrière-plan
  // (le survol n'existe pas sur téléphone) ; rien n'est préchargé en économie de données ou connexion lente.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [react(), keystatic(), typographie()],
  adapter: vercel({ webAnalytics: { enabled: false } }),
});
