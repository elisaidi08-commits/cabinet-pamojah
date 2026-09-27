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
    format: 'Visio ou présentiel sur demande',
  },
};

export const nav = [
  { href: '/accompagnements/', label: 'Accompagnements' },
  { href: '/consultation-axe/', label: 'La Consultation' },
  { href: '/le-cabinet/', label: 'Le Cabinet' },
  { href: '/huguette/', label: 'L’architecte' },
  { href: '/apprendre/', label: 'Apprendre' },
  { href: '/la-sphere/', label: 'La Sphère' },
];

export const legal = [
  { href: '/mentions-legales/', label: 'Mentions légales' },
  { href: '/confidentialite/', label: 'Confidentialité et cookies' },
  { href: '/conditions-consultation/', label: 'Conditions de la Consultation' },
];

export const disclaimer = reglages.avertissement;

/** Retire les guillemets saisis autour d'une citation : le site ajoute les siens (« … »). */
export const citer = (texte: string) => texte.trim().replace(/^[«"“„]\s*/, '').replace(/\s*[»"”]$/, '');

/** Raccourcit un texte pour la description des moteurs de recherche (≈155 signes, coupé sur un mot). */
export const resume = (texte: string, max = 155) => {
  const t = texte.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[\s,;:·—-]+$/, '') + '…';
};
