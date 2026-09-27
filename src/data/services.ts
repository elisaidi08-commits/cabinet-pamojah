// Les services du Cabinet (décision de Sady, 18/09/2026) : la Consultation d'Axe, le Bilan de soi, Madame la CEO.
// La Consultation d'Axe est le point d'entrée obligatoire : aucun programme ne s'ouvre sans elle.
// Leadership durable & Influence maîtrisée n'est pas un service public : il est seulement mentionné,
// accessible sur candidature après une Consultation d'Axe.
// Textes : optimisation éditoriale ynn design (p.6, p.8) et brief fondatrice (p.5–7), voir CONTENU-SOURCE.md.
import type { ImageMetadata } from 'astro';
import lampe from '../assets/images/cabinet/S2-lampe.png';
import ordinateur from '../assets/images/cabinet/S3-ordinateur.png';
import livre from '../assets/images/cabinet/S4-livre.png';
import sourire from '../assets/images/portraits/portrait-sourire.jpg';
import travail from '../assets/images/portraits/ordinateur.jpg';
import type { Avis } from './avis';
import bilanJson from '../contenu/programme-bilan-de-soi.json';
import ceoJson from '../contenu/programme-madame-la-ceo.json';
import consultationJson from '../contenu/consultation.json';

// Phrase unique d'accès aux programmes (décision du 28/09/2026), reprise partout.
export const ACCES = 'Les programmes sont accessibles uniquement sur candidature, à l’issue d’une Consultation d’Axe.';
// Version courte, pour les listes « en bref » des cartes et des pages.
export const ACCES_COURT = 'Sur candidature, après une Consultation d’Axe';

// Les programmes (une page chacun).
export type Service = {
  slug: 'bilan-de-soi' | 'madame-la-ceo';
  nom: string;
  devise: string;
  duree: string;
  porte: string;            // la situation dans laquelle la visiteuse se reconnaît
  description: string[];
  fondation?: string;
  pourVous: string[];
  construit: string[];
  gains: string[];
  transformation: string;
  objet: { image: ImageMetadata; alt: string; nom: string };
  photo: { image: ImageMetadata; position: string };
  avis: Avis['accompagnement'];
};

// Les textes viennent de l'administration (src/contenu/programme-*.json) ; les images restent liées ici.
const texteDe = (j: typeof bilanJson) => ({ ...j, fondation: j.fondation || undefined });

export const services: Service[] = [
  {
    slug: 'bilan-de-soi',
    ...texteDe(bilanJson),
    objet: {
      image: lampe,
      nom: 'La lampe',
      alt: 'Gros plan sur la lampe de laiton du cabinet, allumée, qui éclaire le bureau de bois sombre.',
    },
    photo: { image: sourire, position: '50% 12%' },
    avis: 'bilan-de-soi',
  },
  {
    slug: 'madame-la-ceo',
    ...texteDe(ceoJson),
    objet: {
      image: ordinateur,
      nom: 'L’ordinateur',
      alt: 'Gros plan sur l’ordinateur ouvert du cabinet, écran en veille où se reflète la lumière de la lampe.',
    },
    photo: { image: travail, position: '40% 30%' },
    avis: 'madame-la-ceo',
  },
];

// La Consultation d'Axe, présentée comme le premier des trois services (le livre = le livret d'axe).
export const consultationCarte = {
  nom: 'La Consultation d’Axe',
  surtitre: 'Le point d’entrée · 75 min · Visio',
  ...consultationJson.carte,
  href: '/consultation-axe/',
  objet: {
    image: livre,
    nom: 'Le livret d’axe',
    alt: 'Gros plan sur le livre relié de lin du cabinet, son signet de laiton posé sur le bureau : le livret d’axe.',
  },
};

// Leadership durable & Influence maîtrisée : mentionné, jamais présenté comme un service.
export const leadershipDurable = {
  nom: 'Leadership durable & Influence maîtrisée',
  mention: consultationJson.mentionLeadership,
};
