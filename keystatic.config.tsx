// L'espace d'administration du site (Keystatic), à l'adresse /keystatic.
// Huguette y modifie les textes et publie ses articles ; chaque enregistrement met le site à jour.
//
// Stockage :
//  - en local (npm run dev) : les fichiers du dossier sont modifiés directement ;
//  - en ligne : Keystatic Cloud si PUBLIC_KEYSTATIC_PROJET est défini (connexion par email, sans compte GitHub),
//    sinon GitHub si PUBLIC_KEYSTATIC_DEPOT est défini (« compte/depot »). Voir ADMIN.md.
import { collection, config, fields, singleton } from '@keystatic/core';

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
const projetCloud = env.PUBLIC_KEYSTATIC_PROJET;
const depotGithub = env.PUBLIC_KEYSTATIC_DEPOT as `${string}/${string}` | undefined;

const texte = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const ligne = (label: string, description?: string) => fields.text({ label, description });
const liste = (label: string, element = 'Élément', description?: string) =>
  fields.array(texte(element), { label, description, itemLabel: (p) => p.value || element });
const titreTexte = (label: string, element = 'Bloc') =>
  fields.array(fields.object({ titre: ligne('Titre'), texte: texte('Texte') }), {
    label,
    itemLabel: (p) => p.fields.titre.value || element,
  });

const programme = (nom: string, fichier: string) =>
  singleton({
    label: `Programme — ${nom}`,
    path: `src/contenu/${fichier}`,
    format: { data: 'json' },
    schema: {
      nom: ligne('Nom du programme'),
      devise: ligne('Devise', 'Trois verbes, ex. « Se comprendre. Clarifier. Choisir. »'),
      duree: ligne('Durée', 'ex. « 12 semaines »'),
      porte: texte('Situation dans laquelle la visiteuse se reconnaît', 'Affichée en citation, à la première personne.'),
      description: liste('Description', 'Paragraphe', 'Le premier paragraphe apparaît aussi sur l’accueil et dans le film.'),
      fondation: texte('Mention complémentaire (facultatif)', 'ex. « Le parcours intègre le Bilan de soi comme fondation. »'),
      pourVous: liste('Vous êtes au bon endroit si vous…', 'Situation'),
      construit: liste('Ce que nous construisons ensemble', 'Étape'),
      gains: liste('Ce que vous emportez', 'Gain'),
      transformation: ligne('Phrase de transformation', 'ex. « Pour transformer votre multiplicité en direction. »'),
    },
  });

export default config({
  storage: projetCloud
    ? { kind: 'cloud' }
    : depotGithub
      ? { kind: 'github', repo: depotGithub }
      : { kind: 'local' },
  cloud: projetCloud ? { project: projetCloud } : undefined,

  ui: {
    brand: { name: 'Le Cabinet Pamojah' },
    navigation: {
      Pages: ['accueil', 'huguette', 'leCabinet', 'laSphere'],
      Services: ['consultation', 'bilanDeSoi', 'madameLaCeo', 'leadershipDurable'],
      Contenus: ['articles', 'faq', 'avis'],
      Réglages: ['reglages'],
    },
  },

  collections: {
    articles: collection({
      label: 'Articles (Apprendre)',
      slugField: 'titre',
      path: 'src/content/articles/*',
      format: { contentField: 'contenu' },
      entryLayout: 'content',
      columns: ['titre', 'date'],
      schema: {
        titre: fields.slug({ name: { label: 'Titre' }, slug: { label: 'Adresse de la page', description: 'Générée à partir du titre.' } }),
        resume: texte('Résumé', 'Deux lignes, affichées dans la liste des articles et sous le titre.'),
        theme: ligne('Thème', 'ex. « Leadership », « Multipotentialité »'),
        date: fields.date({ label: 'Date de publication', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        brouillon: fields.checkbox({ label: 'Brouillon', description: 'Cochée : l’article n’apparaît pas sur le site.', defaultValue: false }),
        contenu: fields.markdoc({
          label: 'Texte de l’article',
          extension: 'md',
          // Images glissées dans un article : rangées avec les autres images, puis optimisées à la construction du site.
          options: { image: { directory: 'src/assets/images/articles', publicPath: '../../assets/images/articles/' } },
        }),
      },
    }),
  },

  singletons: {
    accueil: singleton({
      label: 'Page d’accueil',
      path: 'src/contenu/accueil',
      format: { data: 'json' },
      schema: {
        film: fields.object(
          {
            ouvertureSurtitre: ligne('Devant la villa — surtitre'),
            ouvertureTitre: ligne('Devant la villa — titre'),
            ouvertureTexte: texte('Devant la villa — texte'),
            ouvertureIndice: ligne('Devant la villa — invitation à défiler'),
            bienvenue: ligne('Arrivée dans le cabinet'),
          },
          { label: 'Textes du film' },
        ),
        parvis: fields.object(
          {
            surtitre: ligne('Surtitre'),
            titre: texte('Titre principal'),
            sousTexte: texte('Sous-texte'),
            cible: texte('À qui s’adresse le Cabinet'),
            promesse: liste('Promesse', 'Ligne'),
          },
          { label: 'Ouverture (après le film)' },
        ),
        vestibule: fields.object(
          {
            titre: ligne('Titre'),
            texte: texte('Texte'),
            texteSuite: texte('Suite du texte'),
            situations: fields.array(fields.object({ nom: ligne('Nom'), texte: texte('Description') }), {
              label: 'Les situations',
              itemLabel: (p) => p.fields.nom.value || 'Situation',
            }),
          },
          { label: '« Elles tiennent. Elles réussissent. Elles avancent. »' },
        ),
        passage: fields.object(
          {
            fort: ligne('Première phrase'),
            fortSuite: texte('Deuxième phrase (en doré)'),
            paragraphes: liste('Paragraphes', 'Paragraphe'),
            nature: texte('Ligne finale'),
          },
          { label: 'Comprendre votre besoin' },
        ),
        services: fields.object(
          {
            surtitre: ligne('Surtitre'),
            titre: texte('Titre'),
            intro: texte('Introduction'),
            question: ligne('Question'),
            axe: texte('Phrase de conclusion'),
          },
          { label: 'Les trois services' },
        ),
        seuil: fields.object(
          {
            surtitre: ligne('Surtitre'),
            titre: texte('Titre'),
            sousTitre: texte('Sous-titre'),
            pointEntree: texte('Phrase en gras'),
            texte: texte('Texte'),
            moments: liste('Moments (séparés par des flèches)', 'Moment'),
            clarifions: titreTexte('Ensemble, nous clarifions', 'Point'),
            issue: texte('À l’issue de la consultation'),
            sphere: texte('Mention de la Sphère'),
          },
          { label: 'La Consultation d’Axe (sur l’accueil)' },
        ),
        architecte: fields.object(
          { citation: texte('Citation'), texte: texte('Texte'), ensemble: texte('Pamojah = ensemble') },
          { label: 'L’architecte (sur l’accueil)' },
        ),
        avisTitre: ligne('Titre de la section des avis'),
        sphere: fields.object(
          { titre: ligne('Titre'), accroche: texte('Accroche'), texte: texte('Texte') },
          { label: 'La Sphère de pouvoir (sur l’accueil)' },
        ),
        retour: texte('Phrase finale (au-dessus du dernier bouton)'),
      },
    }),

    huguette: singleton({
      label: 'L’architecte (Huguette)',
      path: 'src/contenu/huguette',
      format: { data: 'json' },
      schema: {
        portrait: fields.image({
          label: 'Portrait',
          description: 'Vrai portrait d’Huguette (format vertical). Pas affiché pour l’instant : sa vidéo occupe le haut de la page.',
          directory: 'src/assets/images/huguette',
          publicPath: '/src/assets/images/huguette/',
        }),
        presentation: texte('Présentation (en haut de page)'),
        posture: liste('Architecte de souveraineté', 'Paragraphe'),
        parcours: titreTexte('Mon parcours', 'Étape'),
        genese: liste('La genèse du Cabinet', 'Paragraphe'),
        citation: texte('Citation', 'Seule parole à la première personne de la page, affichée entre guillemets et signée.'),
      },
    }),

    leCabinet: singleton({
      label: 'Le Cabinet',
      path: 'src/contenu/le-cabinet',
      format: { data: 'json' },
      schema: {
        identite: fields.object(
          {
            titre: ligne('Titre'),
            phraseForte: texte('Phrase forte'),
            ensemble: texte('Ce que signifie Pamojah'),
          },
          { label: 'Le Cabinet Pamojah (bandeau)' },
        ),
      },
    }),

    laSphere: singleton({
      label: 'La Sphère de pouvoir',
      path: 'src/contenu/la-sphere',
      format: { data: 'json' },
      schema: {
        surtitre: ligne('Surtitre'),
        titre: ligne('Titre'),
        chapo: texte('Chapô'),
        reservee: texte('À qui elle est réservée'),
        entrez: liste('Vous y entrez pour', 'Raison'),
        inclutTitre: ligne('Titre de la liste des contenus'),
        inclut: liste('Ce que le cercle inclut', 'Élément'),
        acces: texte('Comment elle s’ouvre'),
      },
    }),

    consultation: singleton({
      label: 'La Consultation d’Axe',
      path: 'src/contenu/consultation',
      format: { data: 'json' },
      schema: {
        carte: fields.object(
          {
            porte: texte('Phrase d’accroche'),
            devise: ligne('Devise'),
            description: texte('Description courte (accueil et film)'),
            transformation: texte('Phrase sur l’accès aux programmes'),
          },
          { label: 'Présentation courte (accueil et film)' },
        ),
        definition: texte('Définition (en haut de la page)'),
        pourQui: texte('Vous êtes…'),
        decalage: texte('Vous sentez…'),
        periode: texte('Vous traversez…'),
        temps: titreTexte('Les trois dimensions', 'Dimension'),
        axe: fields.object({ intro: texte('Introduction'), verbes: liste('Verbes', 'Verbe') }, { label: 'L’axe' }),
        travail: liste('Nous travaillons sur', 'Point'),
        nature: texte('Ce que ce n’est pas'),
        clinique: texte('Travail clinique'),
        approche: texte('Notre approche'),
        attention: texte('Parcours attentifs'),
        cible: texte('À qui elle s’adresse'),
        souhaits: liste('Pour les femmes qui souhaitent', 'Souhait'),
        pasPourVous: liste('Pas adaptée si vous recherchez', 'Point'),
        cadreOriente: texte('Le cadre'),
        conditions: liste('Conditions et cadre', 'Condition', 'Aucun prix ne doit apparaître sur le site.'),
        sortie: liste('Ce que vous recevrez', 'Point'),
        diagnostic: fields.object({ intro: texte('Introduction'), options: liste('Options', 'Option') }, { label: 'Diagnostic stratégique' }),
        preparation: liste('Préparation avant la séance', 'Paragraphe'),
      },
    }),

    bilanDeSoi: programme('Bilan de soi', 'programme-bilan-de-soi'),
    madameLaCeo: programme('Madame la CEO', 'programme-madame-la-ceo'),
    leadershipDurable: programme('Leadership durable & Influence maîtrisée', 'programme-leadership-durable'),

    faq: singleton({
      label: 'Questions fréquentes',
      path: 'src/contenu/faq',
      format: { data: 'json' },
      schema: {
        accueil: fields.array(fields.object({ question: ligne('Question'), reponse: texte('Réponse') }), {
          label: 'Sur l’accueil',
          itemLabel: (p) => p.fields.question.value || 'Question',
        }),
        consultation: fields.array(fields.object({ question: ligne('Question'), reponse: texte('Réponse') }), {
          label: 'Sur la page Consultation',
          itemLabel: (p) => p.fields.question.value || 'Question',
        }),
      },
    }),

    avis: singleton({
      label: 'Avis clientes',
      path: 'src/contenu/avis',
      format: { data: 'json' },
      schema: {
        avis: fields.array(
          fields.object({
            citation: texte('Citation (sans guillemets)'),
            accompagnement: fields.select({
              label: 'Accompagnement',
              options: [
                { label: 'Consultation d’Axe', value: 'consultation' },
                { label: 'Bilan de soi', value: 'bilan-de-soi' },
                { label: 'Madame la CEO', value: 'madame-la-ceo' },
                { label: 'Leadership durable', value: 'leadership-durable' },
              ],
              defaultValue: 'consultation',
            }),
          }),
          { label: 'Avis (publiés sous forme anonyme)', itemLabel: (p) => p.fields.citation.value.slice(0, 60) || 'Avis' },
        ),
      },
    }),

    reglages: singleton({
      label: 'Coordonnées et réglages',
      path: 'src/contenu/reglages',
      format: { data: 'json' },
      schema: {
        email: fields.text({
          label: 'Email de contact',
          validation: { isRequired: true, pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Adresse email invalide.' } },
        }),
        instagram: fields.url({ label: 'Lien Instagram' }),
        instagramHandle: ligne('Nom du compte Instagram', 'ex. @lecabinetpamojah'),
        linkedin: fields.url({ label: 'LinkedIn d’Huguette' }),
        calendly: fields.url({ label: 'Lien de réservation Calendly', validation: { isRequired: true } }),
        signature: ligne('Signature', 'ex. « Confidentialité · Discernement · Exigence »'),
        avertissement: texte('Mention « non médical » (pied de page)'),
      },
    }),
  },
});
