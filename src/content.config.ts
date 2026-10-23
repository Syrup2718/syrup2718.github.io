import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
			github: z.string().url().optional(),
			demo: z.string().url().optional(),
			status: z.enum(['進行中', '已完成', '維護中', '封存']).default('已完成'),
		}),
});

const library = defineCollection({
	loader: glob({ base: './src/content/library', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string(),
			description: z.string(),
			finishedDate: z.coerce.date(),
			rating: z.number().min(0).max(5),
			tags: z.array(z.string()).default([]),
			cover: z.optional(image()),
			spineColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#b98d87'),
			favorite: z.boolean().default(false),
			sample: z.boolean().default(false),
		}),
});

export const collections = { blog, projects, library };
