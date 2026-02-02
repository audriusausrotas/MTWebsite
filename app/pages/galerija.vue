<script setup lang="ts">
definePageMeta({
  breadcrumb: "galerija",
});
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('breadcrumbs.galerija')" />
    <GalleryMain />
  </div>
</template>

<style scoped></style>
