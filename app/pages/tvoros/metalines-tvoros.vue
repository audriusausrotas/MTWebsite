<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "metalines-tvoros",
});

const { metalFences } = useData();
</script>

<template>
  <BaseWrapper breadcrumb="metalines-tvoros">
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard v-for="fence in metalFences" :key="fence._id" :fence="fence" />
    </div>
  </BaseWrapper>
</template>

<style scoped></style>
