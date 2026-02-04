<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "skardines-tvoros",
});

const { fences } = useData();
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('breadcrumbs.skardines-tvoros')" />
    <div class="max-w-default w-full m-auto flex flex-col gap-8">
      <FencesSheetFenceCard v-for="fence in fences" :key="fence._id" :fence="fence" />
    </div>
  </div>
</template>

<style scoped></style>
