import { queryCollection } from "@nuxt/content/server";

// Straipsnių sąrašas (pavadinimas, nuotrauka, aprašymas, data) – naujausi viršuje
export default defineEventHandler(async (event) => {
  const locale = localeOf(getQuery(event).locale);
  const prefix = articlesPrefix(locale);
  const docs = await queryCollection(event, collectionOf(locale)).all();
  return docs
    .filter((doc) => doc.path.startsWith(prefix))
    .map(toListItem)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));
});
