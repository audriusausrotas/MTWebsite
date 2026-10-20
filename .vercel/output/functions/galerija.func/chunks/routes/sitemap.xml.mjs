import { d as defineEventHandler, q as queryCollection, s as setHeader, S as SITE_URL } from '../_/nitro.mjs';
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

const PAGES = [
  ["/", "/en"],
  ["/tvoros", "/en/fences"],
  ["/tvoros/skardines-tvoros", "/en/fences/sheet-metal-fence"],
  ["/tvoros/metalines-tvoros", "/en/fences/metal-fence"],
  ["/tvoros/tvoralentes", "/en/fences/fenceboards"],
  ["/tvoros/segmentines-tvoros", "/en/fences/segment-fence"],
  ["/galerija", "/en/gallery"],
  ["/straipsniai", "/en/articles"],
  ["/apie-mus", "/en/about-us"],
  ["/kontaktai", "/en/contacts"],
  ["/finansuojamas-projektas", "/en/funded-project"],
  ["/taisykles", "/en/rules"],
  ["/privatumo-politika", "/en/privacy-policy"],
  ["/pristatymas-ir-grazinimas", "/en/shipping-and-return"]
];
const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const loc = (path) => escapeXml(SITE_URL + encodeURI(path));
const pageEntry = ([lt, en]) => {
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="lt" href="${loc(lt)}"/>`,
    `<xhtml:link rel="alternate" hreflang="en" href="${loc(en)}"/>`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(lt)}"/>`
  ].join("");
  return [lt, en].map((path) => `<url><loc>${loc(path)}</loc>${alternates}</url>`).join("\n");
};
const sitePath = (contentPath) => contentPath.startsWith("/articles/") ? "/en" + contentPath : contentPath;
const sitemap_xml = defineEventHandler(async (event) => {
  const [lt, en] = await Promise.all([
    queryCollection(event, "content_lt").select("path", "translation").all(),
    queryCollection(event, "content_en").select("path", "translation").all()
  ]);
  const ltArticles = lt.filter((item) => item.path.startsWith("/straipsniai/"));
  const enArticles = en.filter((item) => item.path.startsWith("/articles/"));
  const linked = ltArticles.filter((item) => item.translation).map((item) => [item.path, sitePath(item.translation)]);
  const linkedPaths = new Set(linked.flat());
  const single = [...ltArticles, ...enArticles].map((item) => sitePath(item.path)).filter((path) => !linkedPaths.has(path));
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...PAGES.map(pageEntry),
    ...linked.map(pageEntry),
    ...single.map((path) => `<url><loc>${loc(path)}</loc></url>`),
    "</urlset>"
  ].join("\n");
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=3600");
  return xml;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
