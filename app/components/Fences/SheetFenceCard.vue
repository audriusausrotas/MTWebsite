<script setup lang="ts">
import type { Fence } from "~/data/interfaces";

const props = defineProps<{ fence: Fence }>();
const localePath = useLocalePath();
const { locale } = useI18n();

const text = computed(() => {
  return locale.value === "lt"
    ? props.fence?.aditional?.description.split("<br>")
    : props.fence?.aditional?.descriptionEn.split("<br>");
});
</script>

<template>
  <div class="flex gap-8 shadow-lg p-8 rounded-lg border border-gray-100">
    <div class="flex flex-1">
      <BaseGallerySmall :images="fence.aditional.images" />
    </div>
    <div class="flex flex-col gap-8 flex-1">
      <div class="font-bold text-4xl text-center">{{ fence?.name }}</div>
      <div class="flex flex-col gap-4 text-justify font-medium">
        <div v-for="item in text" :key="item">
          {{ item }}
        </div>
      </div>
      <div class="flex justify-evenly">
        <BaseButton @click="navigateTo(localePath(`/tvoru-skaiciuokle`))">{{
          $t("fences.getPrice")
        }}</BaseButton>
        <BaseButton @click="navigateTo(localePath(`/kontaktai`))">{{
          $t("fences.constact")
        }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
