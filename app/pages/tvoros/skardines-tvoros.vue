<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "skardines-tvoros",
});

useSeo("skardines-tvoros");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="skardines-tvoros" />
</template>
