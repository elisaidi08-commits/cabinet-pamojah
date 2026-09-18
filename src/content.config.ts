import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Articles de « Apprendre » : un fichier Markdown par article dans src/content/articles/.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string(),
    theme: z.string(),
    date: z.coerce.date(),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { articles };
