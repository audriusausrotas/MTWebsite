<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "skardines-tvoros",
});

const { metalSheetfences } = useData();
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('menu.skardines-tvoros')" />
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard v-for="fence in metalSheetfences" :key="fence._id" :fence="fence" />
    </div>
  </div>
</template>

<style scoped></style>
