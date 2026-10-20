import { queryCollection } from "@nuxt/content/server";

// Straipsnių sąrašas (pavadinimas, nuotrauka, ištrauka iki <!--more-->)
export default defineEventHandler(async (event) => {
  const locale = localeOf(getQuery(event).locale);
  const prefix = articlesPrefix(locale);
  const docs = await queryCollection(event, collectionOf(locale)).all();
  return docs.filter((doc) => doc.path.startsWith(prefix)).map(toListItem);
});
