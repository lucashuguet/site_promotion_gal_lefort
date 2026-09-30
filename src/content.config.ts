import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
  }),
});

const promotion = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/promotion' }),
  schema: z.object({
    title: z.string(),
  }),
});

const traditions = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/traditions' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts, promotion, traditions };
