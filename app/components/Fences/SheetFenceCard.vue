<script setup lang="ts">
import type { WebsiteFence } from "#shared/types/website";

const props = defineProps<{ fence: WebsiteFence }>();
const localePath = useLocalePath();
const { locale } = useI18n();

// Aprašymas MTSoft'e skirstomas <br>
const text = computed(() =>
  (locale.value === "en" ? props.fence.descriptionEn : props.fence.description)
    .split("<br>")
    .map((line) => line.trim())
    .filter(Boolean),
);
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 shadow-lg p-4 md:p-8 rounded-lg border border-gray-100"
  >
    <div v-if="fence.images.length" class="flex flex-1 min-w-0">
      <BaseGallerySmall :images="fence.images" :fallback-alt="fence.name" />
    </div>
    <div class="flex flex-col gap-8 flex-1">
      <h2 class="font-bold text-4xl text-center">{{ fence.name }}</h2>
      <div class="flex flex-col gap-4 text-justify font-medium">
        <p v-for="(item, index) in text" :key="index">
          {{ item }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-evenly">
        <BaseButton :to="localePath('/tvoru-skaiciuokle')">{{ $t("fences.getPrice") }}</BaseButton>
        <BaseButton :to="localePath('/kontaktai')">{{ $t("fences.constact") }}</BaseButton>
      </div>
    </div>
  </div>
</template>
