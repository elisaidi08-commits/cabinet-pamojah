# Site du Cabinet Pamojah — avancement

> Site codé sur mesure avec **Astro 7** : des pages statiques, sans base de données, déposables chez n'importe quel hébergeur.
> Références : `09_SITE_V2/02-conception-site-public.md` (architecture, sections, interactions) · `09_SITE_V2/05-film-d-entree.md` (film) · `CONTENU-SOURCE.md` (textes des sources, cités mot pour mot).

## En ligne

| | |
|---|---|
| **Site** | https://cabinet-pamojah.vercel.app (fermé aux moteurs de recherche jusqu'au lancement) |
| **Administration** | https://cabinet-pamojah.vercel.app/keystatic — à activer (voir `ADMIN.md`) |
| **Code** | dépôt privé https://github.com/elisaidi08-commits/cabinet-pamojah |
| **Hébergement** | Vercel, projet `cabinet-pamojah` (compte elisaidi08-5994) ; chaque envoi sur la branche `main` remet le site en ligne automatiquement |

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
- **Bandeau cookies** conforme CNIL (refus par défaut, choix conservé 6 mois, « Gérer les cookies » dans le pied de page) : mesure d'audience Vercel Analytics et affichage automatique du calendrier seulement après accord. Polices hébergées sur le site (pas de Google Fonts).
- **Administration Keystatic** (`/keystatic`) : Huguette modifie les textes de l'accueil et du film, sa page et son portrait, la Consultation, les deux programmes, les articles, la FAQ, les avis et les coordonnées. Mode d'emploi : `ADMIN.md`.
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

## Audit complet du site (18/09/2026, soir)

Relecture du code, des textes et tests dans Brave et Safari iPhone (6 largeurs d'écran, clavier, sans JavaScript, mouvement réduit, connexion lente). Corrigé :

- **Réservation** : le message « Chargement du calendrier… » restait affiché au-dessus de Calendly ; le calendrier débordait à 320 px ; en affichage automatique il volait le focus ; le retrait de l'accord cookies n'arrêtait pas l'affichage automatique.
- **Administration** : effacer la date d'un article bloquait toute mise en ligne ; un lien Calendly ou un email vidé cassait la réservation → champs désormais obligatoires. Les images glissées dans un article sont rangées et optimisées. Tant que la connexion en ligne n'est pas activée, `/keystatic` affiche un message au lieu d'un espace vide.
- **Film** : la vidéo HD (41 Mo) ne se charge plus que si la visiteuse fait défiler le film ; rien n'est chargé quand elle arrive directement dans le site ; sur connexion lente, les textes et le bouton suivent le scroll avant même que la vidéo soit prête ; le téléphone ne télécharge plus que son affiche ; le bouton Retour rend la position quittée (il renvoyait au début du site).
- **Navigation** : l'en-tête ne réapparaît plus en scroll lent ; menu mobile : page courante signalée, état ouvert/fermé annoncé ; anneau de focus visible sur fond noir ; bandeau cookies rouvert au clavier (focus dedans, Échap, retour du focus).
- **Sans JavaScript** : tous les textes s'affichent (ils restaient invisibles).
- **Textes** : espace manquante (« d'Axe.C'est »), grammaire (page Le Cabinet, article, Consultation, page de l'architecte), **typographie française** automatique sur tout le site (espaces insécables avant : ; ? ! et dans « »), titres et descriptions pour les moteurs de recherche (nom d'Huguette dans le titre de sa page, descriptions ≤ 160 signes), bouton du pied de page (texte doré sur doré au survol).
- **Partage et cache** : l'image d'aperçu et l'adresse canonique pointaient vers l'ancien site (lecabinetpamojah.com) → elles suivent maintenant le domaine de production Vercel ; les fichiers du site sont mis en cache par les navigateurs ; en-têtes de sécurité ajoutés (`vercel.json`).
- **Robustesse du contenu** : guillemets tapés en double, section d'avis ou d'articles vide, portrait en .JPG, texte de FAQ contenant « < » : tout est géré.

Vérifié : 0 violation d'accessibilité (axe, 13 pages), aucun défilement horizontal de 320 à 1920 px, film iPhone toujours fonctionnel.

## Textes : propositions à faire valider par Huguette

Ce sont ses mots ; rien n'a été changé sans son accord. Objectif : ne jamais présenter la lectrice comme fragile ni faire de promesse de santé (le site précise qu'il ne remplace pas un soin).

| Où | Aujourd'hui | Proposition |
|---|---|---|
| Consultation (`clinique`) | « …qui aide à prévenir l'épuisement » | « …en préservant votre énergie » |
| Consultation (`souhaits`) | « structurer leur intensité pour éviter l'épuisement » | « …pour préserver leur énergie » |
| Consultation (`approche`) | « la prévention des risques professionnels liés à la santé mentale » | « l'attention portée à l'équilibre au travail » |
| Le Cabinet + article « Clinique » | « la prévention de la surcharge, du burn-out » | « l'attention portée aux signaux de surcharge et à l'équilibre global » |
| Consultation (`decalage`) | « un décalage intérieur… perte de sens, surcharge et fatigue mentale » | « Vous sentez qu'un nouveau cap se dessine : plus de responsabilités, des choix à arbitrer, une trajectoire à réaligner. » |
| Consultation (`travail`, FAQ) | « zones de rupture », « mécanismes internes qui perturbent votre stabilité », « l'axe qui doit être restauré » | « zones de tension », « mécanismes qui orientent vos décisions », « l'axe à consolider » |
| Consultation (`sortie`) | « un état intérieur apaisé » (ressemble à une promesse thérapeutique) | à retirer |
| Bilan de soi | « fatigue mentale » ; « (phase de diagnostic approfondi) » ; « une consultation d'intégration » (confusion possible avec la Consultation d'Axe) | « une énergie dispersée » ; retirer la parenthèse ; « une séance d'intégration » |
| Madame la CEO | « manquez de structure » ; « trop d'idées et pas assez de priorités » | « …et voulez la structurer » ; « beaucoup d'idées à hiérarchiser » |
| L'architecte (genèse) | burn-out, maladie, syndrome de l'imposteur | son histoire, à elle de choisir ce qu'elle garde |

## Décisions prises en construisant (main libre donnée par Sady)

- Les textes du film sont réglés sur des fenêtres de temps (`data-debut` / `data-fin` en secondes). Si le film est régénéré (2K, correctif de l'ordinateur), il faudra recaler ces fenêtres.
- **Téléphone : plus de barre de réservation fixe en bas de l'écran** (jugée trop présente par Sady). Le bouton « Réserver » est dans l'en-tête, qui se cache en descendant et revient en remontant ; les boutons dans la page et dans le menu restent.
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
- **Poids du film** : version légère (6,5 Mo ordinateur, 2,3 Mo téléphone) à l'arrivée sur l'accueil ; la HD (41 Mo / 10 Mo) seulement si la visiteuse fait défiler le film.

## Structure du code

```
src/
  pages/        une page = un fichier ([service].astro génère les 2 programmes)
  components/   FilmEntree, Header (menu), Footer, Consentement (cookies), Reservation, Faq, Citations, Cercles, Logo, Photo, Titre
  layouts/      Base (en-tête, pied, métadonnées) · PageTexte (pages de lecture)
  contenu/      les textes modifiables dans l'administration (JSON)
  data/         lecture de ces textes pour les pages (services, consultation, faq, avis, site)
  middleware.ts ferme /keystatic en ligne tant que la connexion n'est pas activée
  content/      articles/*.md — un fichier Markdown par article
  styles/       global.css — couleurs, typographie, espacements, boutons
  assets/       logos (SVG), images du cabinet, portraits étalonnés
public/film/    le film (ordinateur, téléphone) et ses affiches
typographie.mjs espaces insécables ajoutées à la construction du site
vercel.json     cache et en-têtes de sécurité
```
