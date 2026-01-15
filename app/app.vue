<script setup>
const { locale } = useI18n();
const route = useRoute();

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
  link: [
    {
      rel: "canonical",
      href:
        locale.value === "lt"
          ? "https://modernitvora.lt" + route.path
          : "https://modernitvora.lt/en" + route.path,
    },
    {
      rel: "alternate",
      hreflang: "lt",
      href: "https://modernitvora.lt" + route.path,
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://modernitvora.lt/en" + route.path,
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://modernitvora.lt",
    },
  ],
  meta: [
    {
      property: "og:locale",
      content: locale.value === "lt" ? "lt_LT" : "en_US",
    },
    {
      property: "og:locale:alternate",
      content: locale.value === "lt" ? "en_US" : "lt_LT",
    },
  ],
}));

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
