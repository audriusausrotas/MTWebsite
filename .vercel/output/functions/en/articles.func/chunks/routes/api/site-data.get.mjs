import { d as defineEventHandler, h as getSiteData, a as getQuery } from '../../_/nitro.mjs';
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

const siteData_get = defineEventHandler(async (event) => {
  const { complete, ...data } = await getSiteData();
  const part = getQuery(event).part;
  if (part === "fences" || part === "gallery" || part === "funded") return { [part]: data[part] };
  return data;
});

export { siteData_get as default };
//# sourceMappingURL=site-data.get.mjs.map
