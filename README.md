# MTWebsite – modernitvora.lt

Nauja „Moderni Tvora“ svetainė (Nuxt 4, Tailwind 4, @nuxtjs/i18n, @nuxt/content). Talpinama Vercel.

## Paleidimas

```bash
npm install
npm run dev      # http://localhost:3000, duomenys iš http://localhost:3001 (MTSoftServer)
npm run build    # produkcinis build'as (Vercel preset)
```

## Diegimas

- **Savas serveris (laikinai `modernitvora.mtsoft.lt`):** push į `main` → `.github/workflows/deploy.yml` (tas pats principas kaip MTSoft) sukompiliuoja projektą ir įkelia `.output` į `/var/www/modernitvora`; PM2 procesas `moderni-tvora-website` klausosi `127.0.0.1:7000`, viešai – per Caddy. Reikalingi repozitorijos „secrets“: `VPS_IP`, `VPS_USERNAME`, `VPS_SSH_KEY`.
- **Vercel:** veikia kaip anksčiau (preset'as parenkamas automatiškai).
- Kanoninis adresas visur – `https://modernitvora.lt` (`shared/site.ts`), todėl laikinas subdomenas paieškoje nedubliuoja svetainės.

MTSoft API adresą galima perrašyti per `NUXT_API_BASE` (numatyta: dev – `http://localhost:3001`, prod – `https://mtsoft.lt`).

## Kas iš kur

- **Kalbos:** lietuvių be priešdėlio, anglų – `/en`. Išversti adresai – `nuxt.config.ts` → `i18n.pages`. Tekstai – `i18n/locales/*.json`, puslapių SEO – raktas `seo.<puslapis>`.
- **Straipsniai ir teisiniai tekstai:** `content/lt/straipsniai`, `content/en/articles`, `content/<kalba>/tekstai`. Frontmatter: `title`, `description`, `seoTitle`, `seoDescription`, `image`, `date`. Sąraše (kortelės) rodomas `title`, `description` ir `image`; rikiuojama pagal `date` (naujausi viršuje). Straipsnio pavadinimas rodomas viršutinėje juostoje, todėl teksto `# antraštė` praleidžiama.
- **Viršutinės juostos nuotrauka:** `definePageMeta({ hero: "/images/..." })` puslapyje; be jos – numatytoji (`Base/HeroImage.vue`).
- **Galerijos filtrai:** mygtukai sudaromi iš nuotraukų pavadinimų (MTSoft „Tinklapio nustatymai“) – vienodai pavadintos nuotraukos patenka į vieną filtrą.
- **Kontaktai:** darbuotojų kortelės – iš i18n `contacts` (`Contacts/Team.vue`); biurų žemėlapiai – `Contacts/Map.vue`.
- **Tvoros, galerija, vartų puslapio vaizdai ir galerija, finansuojamas projektas:** valdomi MTSoft'e (Tinklapio nustatymai, tvorų nustatymai „Rodyti tinklapyje“). Svetainės serveris juos ima per `server/api/site-data.get.ts` → `server/utils/siteData.ts`:
  - iš `getFences` paliekami tik vieši laukai (be kainų ir savikainos), tik tvoros su „Rodyti tinklapyje“;
  - atsakymas kešuojamas 10 min. (pakeitimai MTSoft'e svetainėje matomi per ≤10 min.);
  - jei mtsoft.lt nepasiekiamas, svetainė veikia toliau, tik be šių duomenų.
  - Nuotraukų failai (`/images/...`) turi būti šio projekto `public/` aplanke.
- **Lauko žaliuzės:** `app/pages/lauko-zaliuzes.vue`, tekstai – i18n raktas `blinds` (be kainų). Nuorodos į MTSoft skaičiuoklę nėra (MTSoft – privatus); žaliuzių skaičiuoklė bus prie tvorų skaičiuoklės.
- **Skaičiuoklė (`/tvoru-skaiciuokle`):** parinktys ir kaina – iš MTSoft (`server/api/calculator.get.ts`, `server/api/estimate.post.ts` → MTSoft `/api/webCalculator`, `/api/webEstimate`); naršyklė į MTSoft tiesiogiai nesikreipia. Modelių nuotraukos – tvorų nuotraukos iš MTSoft tvorų nustatymų. Būsena ir pasirinkimų taisyklės – `app/composables/useCalculator.ts`, žingsniai – `app/components/Calculator/`. Kol nėra užklausų formos, „Gauti pasiūlymą“ atidaro laišką su pasirinkimais.
- **Paieška:** `server/api/search.get.ts` (tvorų pavadinimai + straipsnių pavadinimai/aprašymai).
- **SEO:** canonical, hreflang, og ir `titleTemplate` – `app/app.vue`; `sitemap.xml` – `server/routes/sitemap.xml.ts`; neužbaigti puslapiai turi `definePageMeta({ noindex: true })` ir nėra sitemap'e.
