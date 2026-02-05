<script setup lang="ts">
definePageMeta({
  breadcrumb: "galerija",
});
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('menu.galerija')" />
    <GalleryMain />
  </div>
</template>

<style scoped></style>
