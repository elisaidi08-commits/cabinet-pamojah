# Site du Cabinet Pamojah — avancement

> Site codé sur mesure avec **Astro 7** : des pages statiques, sans base de données, déposables chez n'importe quel hébergeur.
> Références : `09_SITE_V2/02-conception-site-public.md` (architecture, sections, interactions) · `09_SITE_V2/05-film-d-entree.md` (film) · `CONTENU-SOURCE.md` (textes des sources, cités mot pour mot).

## Utiliser le site

| Action | Commande (dans ce dossier) |
|---|---|
| Voir le site en travaillant (rechargement automatique) | `npm run dev` puis ouvrir http://localhost:4321 |
| Construire la version à mettre en ligne | `npm run build` → dossier `dist/` (≈ 69 Mo, dont 51 Mo de film) |
| Voir la version construite | `npx astro preview` |

Mise en ligne : déposer le contenu de `dist/` chez l'hébergeur (Netlify, Vercel, OVH, Hostinger…), puis faire pointer le domaine. Si Odoo garde le domaine principal, le mettre sur un sous-domaine (ex. `gestion.`) pour le CRM et la facturation.

## Décisions de Sady (18/09/2026) — à respecter partout

- **Les 3 services sont la Consultation d'Axe, le Bilan de soi et Madame la CEO.** Leadership durable & Influence maîtrisée n'est pas un service du site : il est seulement mentionné, « accessible uniquement sur candidature, à l'issue d'une Consultation d'Axe ».
- **La Consultation d'Axe est obligatoire** avant tout programme ; c'est écrit sur l'accueil, dans le film, sur les pages des programmes et dans la FAQ.
- **Aucun prix sur le site** : ni les 250 € de la Consultation, ni « sur proposition personnalisée ». Le paiement est seulement mentionné (« paiement sécurisé pour confirmer votre créneau ») ; le montant n'apparaît que dans Calendly.

## Ce qui est fait (18/09/2026)

**16 pages** : accueil · Consultation d'Axe · Bilan de soi · Madame la CEO · La Sphère de pouvoir · L'architecte · Le Cabinet · Apprendre + 3 articles · mentions légales · confidentialité et cookies · conditions de la Consultation · confirmation de réservation · page 404. Plus `robots.txt` et `sitemap.xml`.

- **Film d'entrée** piloté par le scroll, avec ses textes (demande de Sady) : devant la villa, un texte pour situer le lieu ; logo et « Bienvenue chez Pamojah » à l'arrivée dans le cabinet ; puis chaque service quand la caméra se pose sur son objet (lampe → Bilan de soi, ordinateur → Madame la CEO, livre = livret d'axe → la Consultation d'Axe, avec le bouton de réservation). Pas d'écran de clôture : après le livre, on entre directement dans le site. Le film ralentit à ces moments pour laisser lire (réglage `RYTHME` dans `FilmEntree.astro`). Flèche pour passer le film ; image fixe sans JavaScript ou si le mouvement est réduit ; bande centrale sur téléphone.
- **Accueil** dans l'ordre validé : phrase-miroir → « Elles tiennent. Elles réussissent. Elles avancent. » et les 5 situations → le Passage → les 3 services (Consultation d'Axe, Bilan de soi, Madame la CEO) et la mention de Leadership durable → la Consultation d'Axe → l'architecte → les avis → la Sphère → la Bibliothèque → retour au seuil et questions fréquentes.
- **Réservation** : le calendrier Calendly (paiement Stripe) ne se charge que quand la visiteuse clique sur « Voir les créneaux disponibles » ; après la réservation, elle est renvoyée vers `/confirmation/`.
- **Logos vectorisés** depuis la charte (`src/assets/logos/`) : le Pilier prend la couleur du texte, la bande reste dorée. Icône d'onglet : le Pilier.
- **Photos Pexels choisies par la cliente**, étalonnées (chaud, désaturé) : portraits de la cible, jamais présentées comme clientes ni comme Huguette.
- **Aucun cookie ni mesure d'audience** déposés par le site ; polices hébergées sur le site (pas de Google Fonts) : pas de bandeau cookies nécessaire.
- **Vérifié dans Brave**, ordinateur (1440 px) et téléphone (390 px) : 17 pages sans erreur, aucun lien interne cassé, film testé dans les deux sens, menu mobile (focus gardé, fermeture par Échap).
- **Accessibilité** : audit axe-core WCAG 2.2 AA — **0 violation** sur les 13 pages auditées.

## Fluidité (18/09/2026, soir)

| Mesure sur une connexion 4G simulée (10 Mbit/s) | Avant | Après |
|---|---|---|
| Film réactif au scroll, ordinateur | 36,9 s | **5,4 s** |
| Film réactif au scroll, téléphone | 8,8 s | **2,2 s** |
| Page affichée | 3,9 s | 0,5 s |

- **Film en deux temps** : version légère d'abord (6,5 Mo ordinateur, 2,3 Mo téléphone), puis HD chargée en arrière-plan et substituée sans saut. Pas de HD en mode économie de données ou en 2G/3G.
- **« Passer le film »** saute immédiatement dans le site ; **retour à l'accueil pendant la même visite** (logo, menu) : on arrive directement après le film.
- **Pages préchargées au survol** des liens, **fondu enchaîné de 450 ms** entre les pages (Chrome, Edge, Safari récents), défilement doux vers les ancres, polices préchargées. Tout est désactivé si la visiteuse demande moins d'animations.
- **Données structurées** (schema.org) : fiche du Cabinet sur toutes les pages, questions fréquentes sur l'accueil et la page Consultation.

## Décisions prises en construisant (main libre donnée par Sady)

- Les textes du film sont réglés sur des fenêtres de temps (`data-debut` / `data-fin` en secondes). Si le film est régénéré (2K, correctif de l'ordinateur), il faudra recaler ces fenêtres.
- Les pages des programmes affichent la liste complète du brief (7 et 9 points), plutôt qu'une sélection de 6.
- Texte Calendly : « qui protège du burn-out » devient « qui aide à prévenir l'épuisement » (promesse de santé trop affirmative).
- Non publiés sur la page de l'architecte, en attendant sa validation : le rôle en église, la formation de décoratrice, les autres entreprises (Pamojaah, Madame Afya).
- Le cadre « visio et présentiel » n'est pas repris : la Consultation est en visio uniquement et aucune adresse n'est donnée.
- La Lettre (inscription email) n'est pas en ligne : il faut d'abord choisir un outil d'envoi (Brevo, Mailchimp…). Un formulaire qui ne mène nulle part serait pire que pas de formulaire.

## À fournir ou valider par la cliente avant la mise en ligne

1. **Mentions légales** : raison sociale, adresse, SIRET, hébergeur (champs « À compléter » dans les 3 pages légales).
2. **Politique d'annulation, de report et de remboursement** de la Consultation, et modalités du droit de rétractation (à faire relire par un juriste).
3. **Le domaine** : `lecabinetpamojah.com` (carte de visite) ou `cabinetpamojah.com` (email, Calendly).
4. **Portrait d'Huguette** (shooting) : la page L'architecte est prête à l'accueillir.
5. **Validation des textes** : les textes ynn design (« en attente de validation finale »), la page La Sphère et les 3 articles de départ, composés à partir de ses propres textes.
6. **Calendly** : régler la redirection après réservation vers `https://<domaine>/confirmation/` ; les couleurs du module intégré nécessitent un abonnement Calendly payant.
7. **Le libellé du bouton** : « Réserver ma Consultation d'Axe » (site) ou « Demander… » (brochure ynn).

## Points ouverts côté production

- **Film** : l'ordinateur pivote tout seul entre la lampe et l'ordinateur (correctif ≈ 430 crédits OpenArt) ; passage de porte un peu rapide. Version 2K possible avec Kling 4K (≈ 2 500 crédits, recharge nécessaire).
- **Poids du film** : 41 Mo sur ordinateur, 10 Mo sur téléphone. Il ne se charge qu'en arrivant sur l'accueil ; à surveiller sur les connexions lentes.

## Structure du code

```
src/
  pages/        une page = un fichier ([service].astro génère les 2 programmes)
  components/   FilmEntree, Header (menu), Footer, MobileBar, Reservation, Faq, Citations, Cercles, Logo, Photo, Titre
  layouts/      Base (en-tête, pied, métadonnées) · PageTexte (pages de lecture)
  data/         site (coordonnées, Calendly), services, consultation, faq, avis — les textes se modifient ici
  content/      articles/*.md — un fichier Markdown par article
  styles/       global.css — couleurs, typographie, espacements, boutons
  assets/       logos (SVG), images du cabinet, portraits étalonnés
public/film/    le film (ordinateur, téléphone) et ses affiches
```
