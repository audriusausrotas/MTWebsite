# MTWebsite – modernitvora.lt

Nauja „Moderni Tvora“ svetainė (Nuxt 4, Tailwind 4, @nuxtjs/i18n, @nuxt/content). Talpinama Vercel.

## Paleidimas

```bash
npm install
npm run dev      # http://localhost:3000, duomenys iš http://localhost:3001 (MTSoftServer)
npm run build    # produkcinis build'as (Vercel preset)
```

MTSoft API adresą galima perrašyti per `NUXT_API_BASE` (numatyta: dev – `http://localhost:3001`, prod – `https://mtsoft.lt`).

## Kas iš kur

- **Kalbos:** lietuvių be priešdėlio, anglų – `/en`. Išversti adresai – `nuxt.config.ts` → `i18n.pages`. Tekstai – `i18n/locales/*.json`, puslapių SEO – raktas `seo.<puslapis>`.
- **Straipsniai ir teisiniai tekstai:** `content/lt/straipsniai`, `content/en/articles`, `content/<kalba>/tekstai`. Frontmatter: `title`, `description`, `seoTitle`, `seoDescription`, `image`, `date`; `<!--more-->` atskiria ištrauką sąrašui.
- **Tvoros, galerija, finansuojamas projektas:** valdomi MTSoft'e (Tinklapio nustatymai, tvorų nustatymai „Rodyti tinklapyje“). Svetainės serveris juos ima per `server/api/site-data.get.ts` → `server/utils/siteData.ts`:
  - iš `getFences` paliekami tik vieši laukai (be kainų ir savikainos), tik tvoros su „Rodyti tinklapyje“;
  - atsakymas kešuojamas 10 min. (pakeitimai MTSoft'e svetainėje matomi per ≤10 min.);
  - jei mtsoft.lt nepasiekiamas, svetainė veikia toliau, tik be šių duomenų.
  - Nuotraukų failai (`/images/...`) turi būti šio projekto `public/` aplanke.
- **Paieška:** `server/api/search.get.ts` (tvorų pavadinimai + straipsnių pavadinimai/aprašymai).
- **SEO:** canonical, hreflang, og ir `titleTemplate` – `app/app.vue`; `sitemap.xml` – `server/routes/sitemap.xml.ts`; neužbaigti puslapiai turi `definePageMeta({ noindex: true })` ir nėra sitemap'e.
