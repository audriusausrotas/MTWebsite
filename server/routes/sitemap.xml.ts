import { queryCollection } from "@nuxt/content/server";
import { SITE_URL } from "#shared/site";

// Puslapiai su abiem kalbomis [lt, en]. Neužbaigti puslapiai (kiemo vartai, lauko žaliuzės,
// parduotuvė, skaičiuoklė) čia neįtraukti ir turi noindex – įtraukti, kai bus turinys.
const PAGES: [string, string][] = [
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
  ["/pristatymas-ir-grazinimas", "/en/shipping-and-return"],
];

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const loc = (path: string) => escapeXml(SITE_URL + encodeURI(path));

const pageEntry = ([lt, en]: [string, string]) => {
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="lt" href="${loc(lt)}"/>`,
    `<xhtml:link rel="alternate" hreflang="en" href="${loc(en)}"/>`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(lt)}"/>`,
  ].join("");
  return [lt, en].map((path) => `<url><loc>${loc(path)}</loc>${alternates}</url>`).join("\n");
};

// content kelias -> svetainės adresas (/articles/x -> /en/articles/x)
const sitePath = (contentPath: string) =>
  contentPath.startsWith("/articles/") ? "/en" + contentPath : contentPath;

export default defineEventHandler(async (event) => {
  const [lt, en] = await Promise.all([
    queryCollection(event, "content_lt").select("path", "translation").all(),
    queryCollection(event, "content_en").select("path", "translation").all(),
  ]);

  const ltArticles = lt.filter((item) => item.path.startsWith("/straipsniai/"));
  const enArticles = en.filter((item) => item.path.startsWith("/articles/"));

  // Susieti straipsniai (frontmatter `translation`) – su hreflang; poros įrašomos iš LT pusės
  const linked: [string, string][] = ltArticles
    .filter((item) => item.translation)
    .map((item) => [item.path, sitePath(item.translation!)]);
  const linkedPaths = new Set(linked.flat());

  const single = [...ltArticles, ...enArticles]
    .map((item) => sitePath(item.path))
    .filter((path) => !linkedPaths.has(path));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...PAGES.map(pageEntry),
    ...linked.map(pageEntry),
    ...single.map((path) => `<url><loc>${loc(path)}</loc></url>`),
    "</urlset>",
  ].join("\n");

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=3600");
  return xml;
});
