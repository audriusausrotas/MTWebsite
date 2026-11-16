<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "segmentines-tvoros",
});

useSeo("segmentines-tvoros", "/images/tvoros/tvora22.jpg");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="segmentines-tvoros" />
</template>
