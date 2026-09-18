// Informations partagées par toutes les pages.
// Les coordonnées se modifient dans l'administration (« Coordonnées et réglages » → src/contenu/reglages.json).
// ⚠️ À confirmer avec la cliente : le domaine (lecabinetpamojah.com sur la carte de visite,
// cabinetpamojah.com dans l'adresse email).
import reglages from '../contenu/reglages.json';

export const site = {
  name: 'Le Cabinet Pamojah',
  baseline: 'Clinique du leadership multi-talents',
  signature: reglages.signature,
  email: reglages.email,
  instagram: reglages.instagram,
  instagramHandle: reglages.instagramHandle,
  calendly: reglages.calendly,
  // Aucun prix n'est affiché sur le site (décision de Sady, 18/09/2026).
  consultation: {
    name: 'Consultation d’Axe',
    duration: '75 min',
    format: 'Visio',
  },
};

export const nav = [
  { href: '/#accompagnements', label: 'Accompagnements' },
  { href: '/consultation-axe/', label: 'La Consultation' },
  { href: '/le-cabinet/', label: 'Le Cabinet' },
  { href: '/huguette/', label: 'L’architecte' },
  { href: '/apprendre/', label: 'Apprendre' },
];

export const legal = [
  { href: '/mentions-legales/', label: 'Mentions légales' },
  { href: '/confidentialite/', label: 'Confidentialité et cookies' },
  { href: '/conditions-consultation/', label: 'Conditions de la Consultation' },
];

export const disclaimer = reglages.avertissement;
