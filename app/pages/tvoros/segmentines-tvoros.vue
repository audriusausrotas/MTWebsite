<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "segmentines-tvoros",
});

useSeo("segmentines-tvoros");

await loadSiteData("fences");

const { segmentFences } = useFences();
</script>

<template>
  <BaseWrapper>
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard v-for="fence in segmentFences" :key="fence._id" :fence="fence" />
    </div>
  </BaseWrapper>
</template>
