<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "tvoralentes",
});

useSeo("tvoralentes");

await loadSiteData("fences");

const { fenceboards } = useFences();
</script>

<template>
  <BaseWrapper>
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard v-for="fence in fenceboards" :key="fence._id" :fence="fence" />
    </div>
  </BaseWrapper>
</template>
