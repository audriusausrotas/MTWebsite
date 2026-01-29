import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: {
        include: "en/**",
        prefix: "",
      },
      schema: z.object({
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        image: z.string().optional(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      }),
    }),

    content_lt: defineCollection({
      type: "page",
      source: {
        include: "lt/**",
        prefix: "",
      },
      schema: z.object({
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        image: z.string().optional(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      }),
    }),
  },
});
