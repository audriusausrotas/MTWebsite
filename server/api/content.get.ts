import { queryCollection } from "@nuxt/content/server";

// Vienas content dokumentas (straipsnis ar tekstinis puslapis) pagal kelią
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const locale = localeOf(query.locale);
  const path = String(query.path ?? "");

  const doc = await queryCollection(event, collectionOf(locale)).path(path).first();
  if (!doc) throw createError({ statusCode: 404, statusMessage: "Page not found" });

  return { doc };
});
