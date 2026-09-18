// Avis réels, publiables sous forme anonyme (modifiables dans l'administration : src/contenu/avis.json).
// Règle : jamais de photo de banque d'images à côté d'une citation.
import donnees from '../contenu/avis.json';

export type Avis = { citation: string; accompagnement: 'consultation' | 'bilan-de-soi' | 'madame-la-ceo' | 'leadership-durable' };

export const avis = donnees.avis as Avis[];

export const libelles: Record<Avis['accompagnement'], string> = {
  consultation: 'Consultation d’Axe',
  'bilan-de-soi': 'Bilan de soi',
  'madame-la-ceo': 'Madame la CEO',
  'leadership-durable': 'Leadership durable & Influence maîtrisée',
};
