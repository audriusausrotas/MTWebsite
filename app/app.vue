<script setup lang="ts">
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "#shared/site";

const { locale } = useI18n();
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();

const canonical = computed(() => absoluteUrl(route.path));

// Straipsnių slug'ai abiem kalbomis skirtingi – jų adresus pateikia pats straipsnio puslapis
// (frontmatter `translation`); straipsniui be vertimo kitos kalbos nuorodų nededame
const articleAlternates = useArticleAlternates();

const alternates = computed(() => {
  const lt = route.meta.article ? articleAlternates.value.lt : switchLocalePath("lt");
  const en = route.meta.article ? articleAlternates.value.en : switchLocalePath("en");
  if (!lt || !en) return [];
  return [
    { rel: "alternate", hreflang: "lt", href: absoluteUrl(lt) },
    { rel: "alternate", hreflang: "en", href: absoluteUrl(en) },
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl(lt) },
  ];
});

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  // Pavadinimai su „Moderni Tvora“ (pvz. iš straipsnių seoTitle) nedubliuojami
  titleTemplate: (title?: string) =>
    !title ? SITE_NAME : /moderni\s*tvora/i.test(title) ? title : `${title} | ${SITE_NAME}`,
  link: [{ rel: "canonical", href: canonical.value }, ...alternates.value],
}));

useSeoMeta({
  ogSiteName: SITE_NAME,
  ogType: "website",
  ogUrl: () => canonical.value,
  ogImage: absoluteUrl(DEFAULT_OG_IMAGE),
  ogLocale: () => (locale.value === "lt" ? "lt_LT" : "en_US"),
  ogLocaleAlternate: () => (locale.value === "lt" ? "en_US" : "lt_LT"),
  twitterCard: "summary_large_image",
  robots: () => (route.meta.noindex ? "noindex, follow" : undefined),
});

// useHead({
//   script: [
//     {
//       src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX",
//       async: true,
//     },
//     {
//       children: `
//         window.dataLayer = window.dataLayer || [];
//         function gtag(){dataLayer.push(arguments);}
//         gtag('js', new Date());
//         gtag('config', 'G-XXXXXXX');
//       `,
//     },
//   ],
// });
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage class="font-sans" />
  </NuxtLayout>
</template>
