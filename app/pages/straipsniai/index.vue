<script setup lang="ts">
definePageMeta({
  breadcrumb: "straipsniai",
});
</script>

<template>
  <div class="bg-stone-100">
    <BaseHeroImage :name="$t('breadcrumbs.straipsniai')" />
    <ArticlesMain />
  </div>
</template>

<style scoped></style>
