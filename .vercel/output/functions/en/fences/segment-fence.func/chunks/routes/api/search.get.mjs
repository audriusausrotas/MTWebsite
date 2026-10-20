import { d as defineEventHandler, a as getQuery, h as getSiteData, q as queryCollection } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'node:crypto';

const normalize = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const search_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  const term = normalize(String((_a = query.q) != null ? _a : "").trim()).slice(0, 100);
  if (term.length < 2) return [];
  const english = query.locale === "en";
  const { fences } = await getSiteData();
  const fenceResults = fences.filter((fence) => normalize(fence.name).includes(term)).map((fence) => ({ type: "fence", title: fence.name, category: fence.category }));
  const articlesPath = english ? "/articles/" : "/straipsniai/";
  const articles = await queryCollection(event, english ? "content_en" : "content_lt").select("title", "description", "path").all();
  const articleResults = articles.filter((article) => article.path.startsWith(articlesPath)).filter((article) => {
    var _a2;
    return normalize(`${article.title} ${(_a2 = article.description) != null ? _a2 : ""}`).includes(term);
  }).slice(0, 10).map((article) => ({ type: "article", title: article.title, path: article.path }));
  return [...fenceResults, ...articleResults];
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
