<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "skardines-tvoros",
});

useSeo("skardines-tvoros", "/images/tvoros/daimond6090.jpg");

await loadSiteData("fences");
</script>

<template>
  <FencesCategoryPage category="skardines-tvoros" />
</template>
