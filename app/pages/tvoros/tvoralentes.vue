<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "tvoralentes",
});

useSeo("tvoralentes");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="tvoralentes" />
</template>
