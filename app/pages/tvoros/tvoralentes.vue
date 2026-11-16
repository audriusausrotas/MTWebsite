<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "tvoralentes",
});

useSeo("tvoralentes", "/images/tvoros/dilė.jpg");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="tvoralentes" />
</template>
