import { defineContentConfig, defineCollection } from "@nuxt/content";

const commonSchema = {
  fields: {
    seoTitle: { type: "string" },
    seoDescription: { type: "string" },
    image: { type: "string" },
  },
};

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: {
        include: "en/**",
        prefix: "",
      },
    }),
    content_lt: defineCollection({
      type: "page",
      source: {
        include: "lt/**",
        prefix: "",
      },
    }),
  },
});
