// L'offre du Cabinet (décisions du 28/09/2026) : la Consultation d'Axe, point d'entrée obligatoire,
// puis trois programmes — Bilan de soi, Madame la CEO, Leadership durable & Influence maîtrisée.
// Les programmes sont accessibles sur candidature, à l'issue d'une Consultation d'Axe.
// Textes : optimisation éditoriale ynn design (p.6, p.8) et brief fondatrice (p.5–7), voir CONTENU-SOURCE.md.
import type { ImageMetadata } from 'astro';
// Le décor : l'hôtel particulier parisien, photos extraites des clips du film (28/09/2026).
import bureauAccueil from '../assets/images/cabinet/hp-bureau-accueil.jpg';
import salon from '../assets/images/cabinet/hp-salon.jpg';
import tableReunion from '../assets/images/cabinet/hp-table-reunion.jpg';
import bureauExecutif from '../assets/images/cabinet/hp-bureau-executif.jpg';
import sourire from '../assets/images/portraits/portrait-sourire.jpg';
import travail from '../assets/images/portraits/ordinateur.jpg';
import tailleur from '../assets/images/portraits/portrait-tailleur.jpg';
import type { Avis } from './avis';
import bilanJson from '../contenu/programme-bilan-de-soi.json';
import ceoJson from '../contenu/programme-madame-la-ceo.json';
import leadershipJson from '../contenu/programme-leadership-durable.json';
import consultationJson from '../contenu/consultation.json';

// Phrase unique d'accès aux programmes (décision du 28/09/2026), reprise partout.
export const ACCES = 'Les programmes sont accessibles uniquement sur candidature, à l’issue d’une Consultation d’Axe.';
// Version courte, pour les listes « en bref » des cartes et des pages.
export const ACCES_COURT = 'Sur candidature, après une Consultation d’Axe';

// Les programmes (une page chacun).
export type Service = {
  slug: 'bilan-de-soi' | 'madame-la-ceo' | 'leadership-durable';
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
  image: ImageMetadata;     // l'image de la carte et du haut de page (décor actuel)
  alt: string;
  // Vidéo d'ambiance du haut de page : la pièce s'anime en boucle derrière le titre.
  // Le plan vertical manque pour le bureau exécutif : sur téléphone, la photo reste.
  ambiance?: { large: string; vertical?: string };
  photo: { image: ImageMetadata; position: string };
  avis: Avis['accompagnement'];
};

// Les textes viennent de l'administration (src/contenu/programme-*.json) ; les images restent liées ici.
const texteDe = (j: typeof bilanJson) => ({ ...j, fondation: j.fondation || undefined });

export const services: Service[] = [
  {
    slug: 'bilan-de-soi',
    ...texteDe(bilanJson),
    image: salon,
    alt: 'Le salon de l’hôtel particulier : deux fauteuils bouclés, une table de marbre et de hautes fenêtres sur Paris.',
    ambiance: { large: '/film/ambiance-salon.mp4', vertical: '/film/ambiance-salon-tel.mp4' },
    photo: { image: sourire, position: '50% 12%' },
    avis: 'bilan-de-soi',
  },
  {
    slug: 'madame-la-ceo',
    ...texteDe(ceoJson),
    image: tableReunion,
    alt: 'La table de réunion de l’hôtel particulier, sous un lustre de laiton, entourée de fauteuils clairs.',
    ambiance: { large: '/film/ambiance-reunion.mp4', vertical: '/film/ambiance-reunion-tel.mp4' },
    photo: { image: travail, position: '40% 30%' },
    avis: 'madame-la-ceo',
  },
  {
    slug: 'leadership-durable',
    ...texteDe(leadershipJson),
    image: bureauExecutif,
    alt: 'Le bureau exécutif de l’hôtel particulier : une bibliothèque sombre, un bureau massif et un petit salon privatif.',
    ambiance: { large: '/film/ambiance-executif.mp4' },
    photo: { image: tailleur, position: '50% 20%' },
    avis: 'leadership-durable',
  },
];

// La Consultation d'Axe, présentée comme le premier des trois services (le livre = le livret d'axe).
export const consultationCarte = {
  nom: 'La Consultation d’Axe',
  surtitre: 'Le point d’entrée · 75 min · Visio ou présentiel',
  ...consultationJson.carte,
  href: '/consultation-axe/',
  image: bureauAccueil,
  alt: 'Le bureau d’accueil de l’hôtel particulier : un plateau noir, un ordinateur ouvert et une lampe de laiton devant la bibliothèque.',
};
