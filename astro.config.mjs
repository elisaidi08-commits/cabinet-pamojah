// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Le site est statique (pages pré-construites) ; seul l'espace d'administration /keystatic tourne sur le serveur Vercel.
// Le domaine définitif reste à confirmer (lecabinetpamojah.com / cabinetpamojah.com).
export default defineConfig({
  site: 'https://lecabinetpamojah.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Navigation fluide : les pages se préchargent dès que le pointeur survole un lien.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [react(), keystatic()],
  adapter: vercel({ webAnalytics: { enabled: false } }),
});
