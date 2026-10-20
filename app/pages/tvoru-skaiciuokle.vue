<script setup lang="ts">
definePageMeta({
  breadcrumb: "tvoru-skaiciuokle",
  // dar neužbaigtas – neindeksuojamas ir neįtrauktas į sitemap
  noindex: true,
});

useSeo("tvoru-skaiciuokle");

await loadSiteData("fences");
</script>

<template>
  <BaseWrapper>
    <CalculatorMain />
  </BaseWrapper>
</template>

<style scoped></style>
