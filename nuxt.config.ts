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
      "lauko-zaliuzes": { en: "/outdoor-blinds", lt: "/lauko-zaliuzes" },
      "kiemo-vartai": { en: "/yard-gates", lt: "/kiemo-vartai" },
      tvoros: { en: "/fences", lt: "/tvoros" },
      "tvoros-skardines-tvoros": {
        en: "/fences/sheet-metal-fence",
        lt: "/tvoros/skardines-tvoros",
      },
      "tvoros-metalines-tvoros": { en: "/fences/metal-fence", lt: "/tvoros/metalines-tvoros" },
      "apie-mus": { en: "/about-us", lt: "/apie-mus" },
      galerija: { en: "/gallery", lt: "/galerija" },
      kontaktai: { en: "/contacts", lt: "/kontaktai" },
      "tvoru-skaiciuokle": { en: "/fence-calculator", lt: "/tvoru-skaiciuokle" },
      straipsniai: { en: "/articles", lt: "/straipsniai" },
      "straipsniai/[slug]": { en: "/articles/[slug]", lt: "/straipsniai/[slug]" },
      parduotuve: { en: "/shop", lt: "/parduotuve" },
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
