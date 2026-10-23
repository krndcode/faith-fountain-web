import { z } from "zod";

export const storyFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title is too long"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary is too long"),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters"),
  category: z
    .string()
    .min(2, "Category is required"),
  author: z
    .string()
    .min(2, "Author is required"),
  published: z.boolean().default(false),
  featuredImage: z.string().optional().or(z.literal("")),
});

export type StoryFormData = z.infer<typeof storyFormSchema>;
