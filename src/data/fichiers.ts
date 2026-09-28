// Empreinte des fichiers de public/ (vidéos, affiches), calculée à la construction du site.
// Les navigateurs gardent ces fichiers en cache un jour : sans empreinte dans l'adresse, une visiteuse
// déjà venue continuerait de voir l'ancien film. Avec elle, un nouveau fichier = une nouvelle adresse.
import { statSync } from 'node:fs';
import { join } from 'node:path';

export const empreinte = (cheminPublic: string) => {
  try {
    const f = statSync(join(process.cwd(), 'public', cheminPublic));
    return `${cheminPublic}?v=${(f.size % 1_000_000).toString(36)}${Math.round(f.mtimeMs / 1000).toString(36)}`;
  } catch {
    return cheminPublic;   // fichier absent : on sert l'adresse simple plutôt que de casser la page
  }
};
