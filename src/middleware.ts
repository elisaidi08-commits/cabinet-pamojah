// Espace d'administration : sur le site en ligne, il ne s'ouvre qu'une fois la connexion activée
// (Keystatic Cloud ou GitHub, voir ADMIN.md). Avant cela, il afficherait un espace vide qui ne peut rien enregistrer.
import { defineMiddleware } from 'astro:middleware';

const active = Boolean(import.meta.env.PUBLIC_KEYSTATIC_PROJET || import.meta.env.PUBLIC_KEYSTATIC_DEPOT);
const ADMIN = /^\/(api\/)?keystatic(\/|$)/;

const PAGE = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Administration — Le Cabinet Pamojah</title>
<body style="font:18px/1.6 Georgia,serif;background:#F4EEE8;color:#0D0D0D;max-width:34rem;margin:15vh auto;padding:0 16px">
<h1 style="font-weight:400">L’administration en ligne n’est pas encore activée.</h1>
<p>Elle s’ouvrira ici dès que la connexion sera configurée. En attendant, les textes se modifient en local (voir ADMIN.md).</p>
<p><a href="/" style="color:#614C24">Retour au site</a></p></body></html>`;

export const onRequest = defineMiddleware((context, next) => {
  if (import.meta.env.PROD && !active && ADMIN.test(context.url.pathname)) {
    return new Response(PAGE, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  return next();
});
