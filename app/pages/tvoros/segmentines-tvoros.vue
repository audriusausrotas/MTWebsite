<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "segmentines-tvoros",
});

useSeo("segmentines-tvoros");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="segmentines-tvoros" />
</template>
