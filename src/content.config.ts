import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			categories: z.array(z.string()).optional(),

			// ➕ 추가로 넣으면 좋은 선택 사항들
      draft: z.boolean().default(false),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
      author: z.string().default('세광'),
		}),
});

export const collections = { blog };
