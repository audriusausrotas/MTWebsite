import { d as defineEventHandler, a as getQuery, l as localeOf, q as queryCollection, f as createError, e as collectionOf } from '../../_/nitro.mjs';
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

const content_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  const locale = localeOf(query.locale);
  const path = String((_a = query.path) != null ? _a : "");
  const doc = await queryCollection(event, collectionOf(locale)).path(path).first();
  if (!doc) throw createError({ statusCode: 404, statusMessage: "Page not found" });
  return { doc };
});

export { content_get as default };
//# sourceMappingURL=content.get.mjs.map
