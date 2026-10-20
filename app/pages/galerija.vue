<script setup lang="ts">
definePageMeta({
  breadcrumb: "galerija",
});

useSeo("galerija");

await loadSiteData("gallery");
</script>

<template>
  <BaseWrapper>
    <GalleryMain />
  </BaseWrapper>
</template>

<style scoped></style>
