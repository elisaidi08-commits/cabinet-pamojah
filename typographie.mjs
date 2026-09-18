// Typographie française, appliquée une fois sur les pages construites (textes du code, de l'administration et des articles) :
// espace insécable avant : ; ? ! », après «, et entre un nombre et son unité (« 75 min », « 12 semaines »).
// Seul le texte visible est touché : balises, attributs, scripts et styles restent intacts.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const INSECABLE = ' ';
const UNITES = 'min|minutes?|h|heures?|jours?|semaines?|mois|ans|€';

export const corriger = (texte) =>
  texte
    .replace(/[  ]+([:;?!»])/g, `${INSECABLE}$1`)
    .replace(/«[  ]+/g, `«${INSECABLE}`)
    .replace(new RegExp(`(\\d)[ \\u00A0]+(${UNITES})(?=[\\s.,;:!?)»<]|$)`, 'g'), `$1${INSECABLE}$2`);

// Découpe le HTML : on ne modifie que les morceaux de texte entre les balises.
const DECOUPE = /(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]*>)/i;

export const typographier = (html) =>
  html
    .split(DECOUPE)
    .map((morceau, i) => (i % 2 === 1 ? morceau : corriger(morceau)))
    .join('');

async function* pagesHtml(dossier) {
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) yield* pagesHtml(chemin);
    else if (entree.name.endsWith('.html')) yield chemin;
  }
}

export default function typographie() {
  return {
    name: 'pamojah-typographie',
    hooks: {
      // L'adaptateur Vercel a déjà copié les pages dans .vercel/output/static : on traite les deux emplacements.
      'astro:build:done': async ({ dir, logger }) => {
        const dossiers = [fileURLToPath(dir), fileURLToPath(new URL('./.vercel/output/static/', import.meta.url))].filter(existsSync);
        let n = 0;
        for (const dossier of new Set(dossiers)) {
          for await (const fichier of pagesHtml(dossier)) {
            const avant = await readFile(fichier, 'utf8');
            const apres = typographier(avant);
            if (apres !== avant) { await writeFile(fichier, apres); n++; }
          }
        }
        logger.info(`espaces insécables ajoutées dans ${n} pages`);
      },
    },
  };
}
