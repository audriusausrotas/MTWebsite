<script setup lang="ts">
definePageMeta({
  pathVia: ["tvoros"],
  breadcrumb: "tvoralentes",
});

const { fenceboards } = useData();
</script>

<template>
  <BaseWrapper breadcrumb="tvoralentes">
    <div class="max-w-default w-full m-auto flex flex-col gap-10 py-10">
      <FencesSheetFenceCard v-for="fence in fenceboards" :key="fence._id" :fence="fence" />
    </div>
  </BaseWrapper>
</template>

<style scoped></style>
