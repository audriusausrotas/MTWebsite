import { d as defineEventHandler, l as localeOf, a as getQuery, q as queryCollection, b as articlesPrefix, c as toListItem, e as collectionOf } from '../../_/nitro.mjs';
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

const articles_get = defineEventHandler(async (event) => {
  const locale = localeOf(getQuery(event).locale);
  const prefix = articlesPrefix(locale);
  const docs = await queryCollection(event, collectionOf(locale)).all();
  return docs.filter((doc) => doc.path.startsWith(prefix)).map(toListItem);
});

export { articles_get as default };
//# sourceMappingURL=articles.get.mjs.map
