<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "metalines-tvoros",
});

useSeo("metalines-tvoros");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="metalines-tvoros" />
</template>
