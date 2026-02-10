import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  ssr: true,

  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
    },
  },

  devtools: { enabled: true },

  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  pages: true,

  modules: ["@nuxtjs/i18n", "@nuxt/image", "@nuxt/fonts", "vue3-carousel-nuxt", "@nuxt/content"],

  image: {
    format: ["webp"],
    quality: 80,
  },

  i18n: {
    defaultLocale: "lt",
    baseUrl: "https://modernitvora.lt",
    strategy: "prefix_except_default",
    customRoutes: "config",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
    },

    locales: [
      { code: "lt", iso: "lt-LT", name: "Lietuvių", file: "lt.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],

    pages: {
      tvoros: { en: "/fences", lt: "/tvoros" },
      galerija: { en: "/gallery", lt: "/galerija" },
      kontaktai: { en: "/contacts", lt: "/kontaktai" },
      taisykles: { en: "/rules", lt: "/taisykles" },
      parduotuve: { en: "/shop", lt: "/parduotuve" },
      straipsniai: { en: "/articles", lt: "/straipsniai" },
      "kiemo-vartai": { en: "/yard-gates", lt: "/kiemo-vartai" },
      "lauko-zaliuzes": { en: "/outdoor-blinds", lt: "/lauko-zaliuzes" },
      "tvoros-metalines-tvoros": { en: "/fences/metal-fence", lt: "/tvoros/metalines-tvoros" },
      "apie-mus": { en: "/about-us", lt: "/apie-mus" },
      "tvoros-tvoralentes": { en: "/fences/fenceboards", lt: "/tvoros/tvoralentes" },
      "tvoru-skaiciuokle": { en: "/fence-calculator", lt: "/tvoru-skaiciuokle" },
      "privatumo-politika": { en: "/privacy-policy", lt: "/privatumo-politika" },
      "pristatymas-ir-grazinimas": { en: "/shipping-and-return", lt: "/pristatymas-ir-grazinimas" },
      "finansuojamas-projektas": { en: "/funded-project", lt: "/finansuojamas-projektas" },
      "straipsniai/[slug]": { en: "/articles/[slug]", lt: "/straipsniai/[slug]" },
      "tvoros-skardines-tvoros": {
        en: "/fences/sheet-metal-fence",
        lt: "/tvoros/skardines-tvoros",
      },
      "tvoros-segmentines-tvoros": {
        en: "/fences/segment-fence",
        lt: "/tvoros/segmentines-tvoros",
      },
    },
  },

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: ["400", "500", "600", "700", "800"],
        styles: ["normal"],
      },
    ],
    defaults: { subsets: ["latin", "latin-ext"] },
  },
});
