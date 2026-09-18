# L'espace d'administration du site

Adresse : **`/keystatic`** (par exemple `https://<adresse-du-site>/keystatic`).
Outil : [Keystatic](https://keystatic.com). Les textes sont enregistrés dans le dépôt GitHub du site ; chaque enregistrement relance automatiquement la mise en ligne sur Vercel (1 à 2 minutes).

## Ce que Huguette peut modifier

| Rubrique | Contenu |
|---|---|
| **Pages → Page d'accueil** | Tous les textes de l'accueil, y compris les textes du film (arrivée devant la villa, « Bienvenue chez Pamojah ») |
| **Pages → L'architecte (Huguette)** | Sa présentation, son parcours, la genèse du Cabinet, **son portrait** (tant qu'il est vide, le Pilier du logo s'affiche) |
| **Services → La Consultation d'Axe** | Toute la page Consultation, la présentation courte (accueil, film) et la mention de Leadership durable |
| **Services → Programme — Bilan de soi / Madame la CEO** | Nom, devise, durée, description, listes, phrase de transformation |
| **Contenus → Articles** | Écrire, modifier, dépublier (case « Brouillon ») les articles de la page Apprendre ; les images glissées dans le texte sont optimisées automatiquement |
| **Contenus → Questions fréquentes** | Les questions de l'accueil et de la page Consultation |
| **Contenus → Avis clientes** | Ajouter ou retirer un avis (publié sous forme anonyme) |
| **Réglages → Coordonnées et réglages** | Email, Instagram, lien Calendly, signature, mention « non médical » |

Restent dans le code (à demander à Sady) : la mise en page, les images du cabinet, le film, les pages Le Cabinet, La Sphère et les pages légales.

**Règles à respecter**

- **Aucun prix** nulle part sur le site.
- Aucune photo de banque d'images présentée comme une cliente ou comme Huguette.
- Les textes du film et de l'accueil sont courts : au-delà de deux ou trois lignes, ils débordent de l'image sur téléphone.
- Écrire les espaces avant « : ; ? ! » comme d'habitude : le site les rend insécables (la ponctuation ne se retrouve jamais seule en début de ligne). Les guillemets autour des citations et des avis sont ajoutés par le site : inutile de les taper.

## Activer l'administration en ligne (à faire une fois, par Sady)

En local, l'administration fonctionne déjà : `npm run dev`, puis http://localhost:4321/keystatic (les fichiers du dossier sont modifiés directement).

En ligne, tant que rien n'est activé, `/keystatic` affiche « L'administration en ligne n'est pas encore activée ». Il faut choisir comment Huguette se connecte :

### Option recommandée : Keystatic Cloud (connexion par email, sans compte GitHub)

1. Créer un compte sur [keystatic.cloud](https://keystatic.cloud), puis une équipe et un projet (gratuit jusqu'à 3 utilisatrices).
2. Relier le projet au dépôt GitHub du site (Keystatic demande d'installer son application GitHub sur le dépôt).
3. Dans Vercel → projet → *Settings → Environment Variables* : ajouter `PUBLIC_KEYSTATIC_PROJET` = `nom-equipe/nom-projet` (affiché dans Keystatic Cloud), puis redéployer.
4. Dans Keystatic Cloud, inviter Huguette par email.

### Autre option : connexion avec un compte GitHub

1. Huguette crée un compte GitHub ; Sady l'ajoute comme collaboratrice du dépôt.
2. Dans Vercel : ajouter `PUBLIC_KEYSTATIC_DEPOT` = `compte/depot`, redéployer.
3. Ouvrir `/keystatic` sur le site en ligne : Keystatic guide la création d'une application GitHub et fournit quatre valeurs (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`) à ajouter dans Vercel, puis redéployer.

## Autres réglages Vercel

| Variable | Rôle |
|---|---|
| `PUBLIC_INDEXER` = `oui` | **Au lancement officiel seulement** : ouvre le site aux moteurs de recherche (sinon `noindex` partout et robots.txt fermé). |
| Web Analytics | À activer dans Vercel → projet → *Analytics* : la mesure d'audience ne se déclenche qu'après l'accord de la visiteuse (bandeau cookies). |
