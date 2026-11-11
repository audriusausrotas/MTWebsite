<script setup lang="ts">
definePageMeta({
  breadcrumb: "galerija",
  hero: "/images/tvoros/tvora12.jpg",
});

useSeo("galerija");

await loadSiteData("gallery");
</script>

<template>
  <BaseWrapper>
    <GalleryMain filters />
  </BaseWrapper>
</template>

<style scoped></style>
