import { queryCollection } from "@nuxt/content/server";
import type { SearchResult } from "#shared/types/website";

// „egle“ randa „Eglė“: lyginama be diakritikų ir be didžiųjų raidžių
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export default defineEventHandler(async (event): Promise<SearchResult[]> => {
  const query = getQuery(event);
  const term = normalize(String(query.q ?? "").trim()).slice(0, 100);
  if (term.length < 2) return [];

  const english = query.locale === "en";

  const { fences } = await getSiteData();
  const fenceResults: SearchResult[] = fences
    .filter((fence) => normalize(fence.name).includes(term))
    .map((fence) => ({ type: "fence", title: fence.name, category: fence.category }));

  const articlesPath = english ? "/articles/" : "/straipsniai/";
  const articles = await queryCollection(event, english ? "content_en" : "content_lt")
    .select("title", "description", "path")
    .all();

  const articleResults: SearchResult[] = articles
    .filter((article) => article.path.startsWith(articlesPath))
    .filter((article) => normalize(`${article.title} ${article.description ?? ""}`).includes(term))
    .slice(0, 10)
    .map((article) => ({ type: "article", title: article.title, path: article.path }));

  return [...fenceResults, ...articleResults];
});
