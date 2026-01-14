<!-- <script setup>
useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXX');
      `,
    },
  ],
});
</script> -->

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
