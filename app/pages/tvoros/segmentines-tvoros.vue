<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "segmentines-tvoros",
});

const { segmentFences } = useData();
</script>

<template>
  <BaseWrapper breadcrumb="segmentines-tvoros">
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard v-for="fence in segmentFences" :key="fence._id" :fence="fence" />
    </div>
  </BaseWrapper>
</template>

<style scoped></style>
