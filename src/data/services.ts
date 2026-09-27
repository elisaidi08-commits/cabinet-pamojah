// L'offre du Cabinet (décisions du 28/09/2026) : la Consultation d'Axe, point d'entrée obligatoire,
// puis trois programmes — Bilan de soi, Madame la CEO, Leadership durable & Influence maîtrisée.
// Les programmes sont accessibles sur candidature, à l'issue d'une Consultation d'Axe.
// Textes : optimisation éditoriale ynn design (p.6, p.8) et brief fondatrice (p.5–7), voir CONTENU-SOURCE.md.
import type { ImageMetadata } from 'astro';
import cabinet from '../assets/images/cabinet/S1-cabinet.png';
import lampe from '../assets/images/cabinet/S2-lampe.png';
import ordinateur from '../assets/images/cabinet/S3-ordinateur.png';
import livre from '../assets/images/cabinet/S4-livre.png';
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
  photo: { image: ImageMetadata; position: string };
  avis: Avis['accompagnement'];
};

// Les textes viennent de l'administration (src/contenu/programme-*.json) ; les images restent liées ici.
const texteDe = (j: typeof bilanJson) => ({ ...j, fondation: j.fondation || undefined });

export const services: Service[] = [
  {
    slug: 'bilan-de-soi',
    ...texteDe(bilanJson),
    // Décor à venir : le salon de l'hôtel particulier.
    image: lampe,
    alt: 'Gros plan sur la lampe de laiton du cabinet, allumée, qui éclaire le bureau de bois sombre.',
    photo: { image: sourire, position: '50% 12%' },
    avis: 'bilan-de-soi',
  },
  {
    slug: 'madame-la-ceo',
    ...texteDe(ceoJson),
    // Décor à venir : la table à manger, qui sert de table de réunion.
    image: livre,
    alt: 'Gros plan sur le livre relié de lin du cabinet, son signet de laiton posé sur le bureau.',
    photo: { image: travail, position: '40% 30%' },
    avis: 'madame-la-ceo',
  },
  {
    slug: 'leadership-durable',
    ...texteDe(leadershipJson),
    // Décor à venir : le bureau exécutif et son petit salon privatif.
    image: cabinet,
    alt: 'Le cabinet Pamojah : un bureau de bois sombre sur l’axe, deux fauteuils vides face à lui, la lumière douce du soir.',
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
  // Décor à venir : le bureau d'accueil de l'hôtel particulier.
  image: ordinateur,
  alt: 'Gros plan sur l’ordinateur ouvert du cabinet, écran en veille où se reflète la lumière de la lampe.',
};
