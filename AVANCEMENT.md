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
| Construire la version à mettre en ligne | `npm run build` → dossier `dist/` (dont ≈ 29 Mo de film) |
| Voir la version construite | `npx astro preview` |

Mise en ligne : déposer le contenu de `dist/` chez l'hébergeur (Netlify, Vercel, OVH, Hostinger…), puis faire pointer le domaine. Si Odoo garde le domaine principal, le mettre sur un sous-domaine (ex. `gestion.`) pour le CRM et la facturation.

## Décisions de fond (28/09/2026) — à respecter partout

Elles remplacent les décisions du 18/09/2026 et priment en cas de conflit avec le reste de ce document.

- **La Consultation d'Axe est le point de départ obligatoire**, suivie de **trois programmes** : Bilan de soi, Madame la CEO et **Leadership durable & Influence maîtrisée**. Leadership durable devient un programme à part entière, avec sa carte et sa page (cela remplace la décision du 18/09 qui le cantonnait à une mention).
- **Phrase d'accès unique, reprise partout** : « Les programmes sont accessibles uniquement sur candidature, à l'issue d'une Consultation d'Axe. » Version courte dans les listes « en bref » : « Sur candidature, après une Consultation d'Axe ».
- **Aucun prix sur le site** : ni montant, ni « sur proposition personnalisée ». Le paiement est seulement mentionné (« paiement sécurisé pour confirmer votre créneau ») ; le montant n'apparaît que dans Calendly.
- **Format** : visio par défaut ; **présentiel possible sur demande particulière par mail** à contact@cabinetpamojah.com.
- **Décor à venir** : un hôtel particulier parisien, maison de famille confidentielle et cocooning luxueux. Les images actuelles restent en place ; chaque service porte son image dans `src/data/services.ts`, avec le décor cible en commentaire (une ligne à changer le moment venu).
- **La page de l'architecte est écrite à la 3e personne**, à l'exception de la citation signée.

## Ce qui est fait (18/09/2026)

**18 pages** : accueil · **Accompagnements** · Consultation d'Axe · Bilan de soi · Madame la CEO · **Leadership durable & Influence maîtrisée** · La Sphère de pouvoir · L'architecte · Le Cabinet · Apprendre + 3 articles · mentions légales · confidentialité et cookies · conditions de la Consultation · confirmation de réservation · page 404. Plus `robots.txt` et `sitemap.xml`.

- **Film d'entrée** piloté par le scroll (voir la section « Film d'entrée : l'hôtel particulier » plus bas).
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

## Film d'entrée : l'hôtel particulier (28/09/2026)

Le film de la villa (arrêts lampe, ordinateur, livre) est remplacé par un film court tourné dans un **hôtel particulier parisien**. Trois temps seulement, et le film ralentit à chacun pour laisser lire :

1. **L'ouverture** — « Le Cabinet Pamojah », « Un espace confidentiel pour les femmes leaders multipotentielles. »
2. **L'arrivée** — le logo et « Bienvenue ».
3. **L'ordinateur du bureau d'accueil** — « Le point d'entrée de notre univers » : la Consultation d'Axe, sa devise, sa description et les deux boutons. La légende reste jusqu'à la fin, puis on entre directement dans le site.

**Deux montages**, choisis selon le format de l'écran (`MONTAGES` dans `FilmEntree.astro`) :

| Format | Contenu | Durée | Poids (léger → HD) |
|---|---|---|---|
| Téléphone 720 × 1280 | enfilade d'arches (0 → 15 s), fondu, bureau d'accueil (14 → 29 s) | 29,04 s | 3,1 Mo → 12 Mo |
| Ordinateur 1280 × 720 | bureau d'accueil seul, en attendant l'enfilade en 16:9 | 15,04 s | 2,5 Mo → 11 Mo |

Réglages par montage : `duree`, `rythme` (`[début, fin, poids]`, poids 3 = la caméra se pose) et `legendes` (`[apparition, disparition]` par légende nommée). La section du film mesure 700vh. Le reste du mécanisme est inchangé : version légère puis HD, compatibilité Safari et iPhone, flèche « Passer le film », mémorisation de la visite, affiche fixe sans JavaScript ou en mouvement réduit.

### Quand l'enfilade en 16:9 arrivera

Sources attendues : `enfilade-16x9.mp4` et `bureau-16x9.mp4`, 15 s chacune.

```bash
X="-c:v libx264 -preset slow -pix_fmt yuv420p -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -movflags +faststart -an"
ffmpeg -i enfilade-16x9.mp4 -i bureau-16x9.mp4 -filter_complex \
 "[0:v]settb=AVTB,fps=24,format=yuv420p[a];[1:v]settb=AVTB,fps=24,format=yuv420p[b];[a][b]xfade=transition=fade:duration=1:offset=14,setsar=1[v]" \
 -map "[v]" -c:v libx264 -crf 12 -preset slow -an master-ordinateur.mp4
ffmpeg -i master-ordinateur.mp4 $X -crf 19 public/film/film-ordinateur.mp4
ffmpeg -i master-ordinateur.mp4 -vf scale=960:540 $X -crf 26 public/film/film-ordinateur-leger.mp4
ffmpeg -i master-ordinateur.mp4 -frames:v 1 -q:v 3 public/film/affiche-ordinateur.jpg
```

Ensuite, dans `MONTAGES`, copier le montage `telephone` dans `ordinateur` (mêmes durées, rythme et légendes).

## Retours de la cliente (28/09/2026) — ce qui est fait

Branche `retours-huguette-2809`, un commit par bloc. Construction sans erreur, 0 violation d'accessibilité sur 15 pages, aucun lien interne cassé, contrôlé à 390 px et 1440 px.

| Bloc | Fait | Fichiers |
|---|---|---|
| **A — Accueil** | Surtitre du Parvis « Un espace confidentiel pour les femmes leaders multipotentielles » ; section des services en « Trois programmes · un même point de départ » (4 cartes) ; mention séparée de Leadership durable remplacée par la phrase d'accès ; « Visio ou présentiel sur demande » | `contenu/accueil.json`, `pages/index.astro`, `data/services.ts` |
| **B — Consultation** | Nouveau titre « Renforcer l'axe qui soutient votre pouvoir d'agir et de devenir. » ; fin de « prévenir l'épuisement » retirée ; section « Pour qui » fusionnée ; champ `mentionLeadership` supprimé partout ; lien vers `/accompagnements/` suivi de la phrase d'accès ; présentiel dans les conditions | `contenu/consultation.json`, `pages/consultation-axe.astro`, `data/site.ts`, `keystatic.config.tsx` |
| **C — Accompagnements + Leadership durable** | Page `/accompagnements/` ; Leadership durable devient le 3e programme (page, carte, contenu éditable) ; cartes mutualisées en composant ; menu et plan du site mis à jour ; FAQ reformulée | `pages/accompagnements.astro`, `components/CartesServices.astro`, `contenu/programme-leadership-durable.json`, `contenu/faq.json`, `pages/sitemap.xml.ts` |
| **D — L'architecte** | Textes à la 3e personne ; « Étudiante à vie » → « Une signature d'évolution permanente » ; citation signée ; portrait branché ; texte « bien-vivre ensemble » déplacé | `contenu/huguette.json`, `pages/huguette.astro` |
| **E — Le Cabinet** | Bandeau « Le Cabinet Pamojah » : bien-vivre ensemble + « Pamojah signifie ensemble », éditable ; commentaire du format corrigé | `contenu/le-cabinet.json`, `pages/le-cabinet.astro` |
| **F — Film et images** | « Bienvenue » sous le logo (vidéos intactes) ; une image par service + décor cible en commentaire ; citation du Bilan de soi | `contenu/accueil.json`, `data/services.ts`, `contenu/programme-bilan-de-soi.json` |
| **G — La Sphère** | Textes de la cliente mot pour mot, éditables ; « La Sphère » dans le menu, doublons retirés ; accueil aligné | `contenu/la-sphere.json`, `pages/la-sphere.astro`, `data/site.ts`, `components/Header.astro`, `components/Footer.astro` |
| **H — Contrôles** | Présentiel dans les questions fréquentes (adresse cliquable) ; données structurées avec les quatre accompagnements ; vérifications globales (aucun prix, aucun lien `#accompagnements`, aucune mention « pas proposé en accès direct ») | `contenu/faq.json`, `components/Faq.astro`, `layouts/Base.astro` |

### Textes complétés le 28/09/2026 (accord de Sady) — à relire par Huguette

| Où | Ce qui a été écrit |
|---|---|
| `contenu/consultation.json` → `diagnostic.intro` | Rien à compléter : le texte du site est déjà celui de Calendly, en entier (voir CONTENU-SOURCE B9). |
| `contenu/accueil.json` → `services.intro` | Phrase complétée avec ses propres mots : « …une trajectoire **cohérente et alignée** avec qui vous êtes, ce que vous portez et l'impact que vous souhaitez créer. » |
| `pages/le-cabinet.astro` → pilier « Clinique et préventive » et article « Clinique du leadership » | « la prévention de la surcharge, du burn-out » devient « l'attention portée aux signaux de surcharge et à l'équilibre global », dans la même logique que le retrait de « prévenir l'épuisement ». |
| `contenu/consultation.json` → `souhaits` | « structurer leur intensité pour éviter l'épuisement » devient « …pour préserver leur énergie ». |
| `pages/conditions-consultation.astro` | **Projet** de politique de report, d'annulation et de rétractation (48 h sans frais, report unique sous 3 mois, séance non honorée due, rétractation de 14 jours avec exécution immédiate demandée). **À faire relire par un juriste avant le lancement.** |
| `pages/confidentialite.astro` | Durées de conservation : trois ans après le dernier contact, dix ans pour les pièces comptables. |
| `contenu/programme-leadership-durable.json` | Textes repris du brief (p.7) et de l'optimisation éditoriale (p.6) : à relire, aucun champ vide. |

**Reste à fournir par Huguette** (données réelles, impossibles à écrire à sa place) : raison sociale et forme juridique, adresse du siège, numéro SIRET, RCS/RNE et TVA le cas échéant — dans les mentions légales et la page Confidentialité.

### À valider par Sady

- **Surtitre de l'accueil** : ancien « Le Cabinet Pamojah · Clinique du leadership multi-talents » → nouveau « Un espace confidentiel pour les femmes leaders multipotentielles ».
- **Citation de la page L'architecte** : seule parole à la 1re personne, entre guillemets et signée « — Huguette Tolo-Tolo Ngemeyeme ».
- **Images provisoires** : Madame la CEO (le livre) et Leadership durable (le cabinet) en attendant le décor « hôtel particulier ».
- **Titre de section** ajouté sur la page Consultation : « À qui s'adresse la Consultation d'Axe » (l'ancien « Pour les femmes qui souhaitent » faisait doublon avec la nouvelle introduction).
- **Fin de la page L'architecte** : le bandeau reprend la phrase « Toutes les portes du cabinet s'ouvrent par la Consultation d'Axe » à la place du texte déplacé.

### Assets manquants

1. **Portrait HD d'Huguette** (cadrage buste) : à déposer dans `src/assets/images/portraits/huguette.jpg` ou dans l'administration. Tant qu'il manque, le Pilier s'affiche.
2. **Quatre images du décor « hôtel particulier »** : bureau d'accueil (Consultation), salon (Bilan de soi), table de réunion (Madame la CEO), bureau exécutif avec salon privatif (Leadership durable).

### Hors périmètre (phase vidéos)

Nouveau décor du film, un seul arrêt sur l'ordinateur pour présenter la Consultation d'Axe comme le point d'entrée de l'univers, suppression des arrêts lampe et livre.

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

Ce sont ses mots ; rien n'a été changé sans son accord. La mention « qui aide à prévenir l'épuisement » a été retirée le 28/09 à sa demande. Objectif : ne jamais présenter la lectrice comme fragile ni faire de promesse de santé (le site précise qu'il ne remplace pas un soin).

| Où | Aujourd'hui | Proposition |
|---|---|---|
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

- Les textes du film sont réglés par montage, dans `MONTAGES` (`FilmEntree.astro`) : une fenêtre `[apparition, disparition]` par légende nommée. Si un montage change, ce sont les seules valeurs à recaler.
- **Téléphone : plus de barre de réservation fixe en bas de l'écran** (jugée trop présente par Sady). Le bouton « Réserver » est dans l'en-tête, qui se cache en descendant et revient en remontant ; les boutons dans la page et dans le menu restent.
- Les pages des programmes affichent la liste complète du brief (7 et 9 points), plutôt qu'une sélection de 6.
- Texte Calendly : « qui protège du burn-out » est devenu « qui aide à prévenir l'épuisement » le 18/09, puis la mention a été retirée le 28/09 à la demande de la cliente.
- Non publiés sur la page de l'architecte, en attendant sa validation : le rôle en église, la formation de décoratrice, les autres entreprises (Pamojaah, Madame Afya).
- Le cadre « visio et présentiel » n'est pas repris : la Consultation est en visio uniquement et aucune adresse n'est donnée.
- La Lettre (inscription email) n'est pas en ligne : il faut d'abord choisir un outil d'envoi (Brevo, Mailchimp…). Un formulaire qui ne mène nulle part serait pire que pas de formulaire.

## À fournir ou valider par la cliente avant la mise en ligne

1. **Mentions légales** : raison sociale, adresse du siège, SIRET (seuls champs « À compléter » restants, dans les mentions légales et la page Confidentialité).
2. **Politique d'annulation, de report et de remboursement** : un projet complet est en ligne depuis le 28/09/2026 (page Conditions de la Consultation) — à faire relire par un juriste et valider par Huguette.
3. **Le domaine** : `lecabinetpamojah.com` (carte de visite) ou `cabinetpamojah.com` (email, Calendly).
4. **Portrait d'Huguette** (shooting) : la page L'architecte est prête à l'accueillir.
5. **Validation des textes** : les textes ynn design (« en attente de validation finale »), la page La Sphère et les 3 articles de départ, composés à partir de ses propres textes.
6. **Calendly** : régler la redirection après réservation vers `https://<domaine>/confirmation/` ; les couleurs du module intégré nécessitent un abonnement Calendly payant.
7. **Le libellé du bouton** : « Réserver ma Consultation d'Axe » (site) ou « Demander… » (brochure ynn).

## Points ouverts côté production

- **Film** : l'enfilade en 16:9 reste à générer (le format ordinateur montre seulement le bureau d'accueil) ; le bureau exécutif en 9:16 et l'upscale 1080p des plans horizontaux restent à faire.
- **Poids du film** : version légère (2,5 Mo ordinateur, 3,1 Mo téléphone) à l'arrivée sur l'accueil ; la HD (11 Mo / 12 Mo) seulement si la visiteuse fait défiler le film.

## Structure du code

```
src/
  pages/        une page = un fichier ([service].astro génère les 2 programmes)
  components/   FilmEntree, Header (menu), Footer, Consentement (cookies), Reservation, CartesServices, Faq, Citations, Cercles, Logo, Photo, Titre
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
