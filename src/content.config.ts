import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const placement = z.object({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  rotation: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  z: z.number().int().nonnegative(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    number: z.string().min(1),
    type: z.enum(['GAME', 'WORK', 'ARTICLE']),
    category: z.string().optional(),
    year: z.number().int(),
    status: z.enum(['WIP', 'RELEASED', 'ARCHIVE', 'STUDY']),
    summary: z.string().min(1),
    description: z.string().optional(),
    featuredInField: z.boolean(),
    order: z.number().int(),
    fieldId: z.string().optional(),
    field: placement.optional(),
    fieldType: z.enum(['GAME', 'WORK', 'ARTICLE']).optional(),
    eyebrow: z.string().optional(),
    fieldMeta: z.array(z.string()).optional(),
    openLabel: z.string().optional(),
    thumbnail: z.string().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
  }).superRefine((data, context) => {
    if (data.featuredInField && (!data.fieldId || !data.field)) {
      context.addIssue({
        code: 'custom',
        message: 'A featured project needs a stable fieldId and field placement.',
        path: ['field'],
      });
    }
  }),
});

export const collections = { projects };
