<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "tvoralentes",
});

const { fences } = useData();
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('breadcrumbs.tvoralentes')" />
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard
        v-for="fence in fences.filter((f) => f.aditional?.show && f.category === 'Tvoralentė')"
        :key="fence._id"
        :fence="fence"
      />
    </div>
  </div>
</template>

<style scoped></style>
