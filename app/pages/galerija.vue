<script setup lang="ts">
definePageMeta({
  breadcrumb: "galerija",
  hero: "/images/tvoros/tvora12.jpg",
});

useSeo("galerija", "/images/tvoros/tvora12.jpg");

await loadSiteData("gallery");
</script>

<template>
  <BaseWrapper>
    <GalleryMain filters />
  </BaseWrapper>
</template>

<style scoped></style>
