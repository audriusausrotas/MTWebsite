import type { ArticleListItem } from "#shared/types/website";

// Pagalbinės funkcijos straipsnių API (content čia skaitomas tik serveryje – naršyklei
// nereikia @nuxt/content WASM duomenų bazės)

export type Locale = "lt" | "en";

export const localeOf = (value: unknown): Locale => (value === "en" ? "en" : "lt");
export const collectionOf = (locale: Locale) => (locale === "en" ? "content_en" : "content_lt");
export const articlesPrefix = (locale: Locale) => (locale === "en" ? "/articles/" : "/straipsniai/");

export const toListItem = (doc: any): ArticleListItem => ({
  title: doc.title,
  path: doc.path,
  image: doc.image,
  excerpt: doc.excerpt,
});
