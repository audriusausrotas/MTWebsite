<script setup lang="ts">
import type { StepKey } from "~/composables/useCalculatorSteps";

// 6 išdėstymas: konfigūratorius su nuotrauka. Viršuje – didelė pasirinktos tvoros nuotrauka su pasirinkimų žymomis
// (kaip automobilių konfigūratoriuose), po ja – žingsnių skirtukai ir pasirinkto skirtuko turinys.
const { t, locale } = useI18n();
const { fence, model, isBlinds } = useCalculator();
const { steps } = useCalculatorSteps();

const active = ref<StepKey>(steps.value.find((step) => !step.done)?.key ?? steps.value[0]!.key);
const current = computed(() => steps.value.find((step) => step.key === active.value) ?? steps.value[0]!);

// nuotrauka: pasirinkto modelio (pirma iš objektų), kol nepasirinkta – bendra
const image = computed(() =>
  isBlinds.value
    ? { url: "/images/zaliuzes/blinds.jpg", alt: t("calc.scope.blinds") }
    : model.value?.images[0]
      ? {
          url: model.value.images[0].url,
          alt: (locale.value === "en" ? model.value.images[0].altEN : model.value.images[0].alt) || model.value.name,
        }
      : { url: "/images/tvoros/tvora14.jpg", alt: t("calc.scope.both") },
);

// žymos ant nuotraukos: tai, kas jau pasirinkta (be pirmo žingsnio)
const badges = computed(() =>
  steps.value.filter((step) => step.key !== "scope" && step.done && step.value).map((step) => ({ key: step.key, text: step.value })),
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <CalculatorFenceTabs v-if="!isBlinds" />

    <div class="relative overflow-hidden rounded-lg bg-gray-900">
      <NuxtImg
        :key="image.url"
        :src="image.url"
        :alt="image.alt"
        sizes="sm:100vw lg:800px"
        class="w-full aspect-16/9 sm:aspect-21/9 object-cover"
      />
      <div class="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-3 pt-10 bg-linear-to-t from-black/80 to-transparent">
        <button
          v-for="badge in badges"
          :key="badge.key"
          type="button"
          class="px-3 py-1 text-sm font-semibold bg-white/95 text-black hover:bg-white hover:cursor-pointer"
          :class="badge.key === current.key ? 'outline-2 outline-red-main' : ''"
          @click="active = badge.key"
        >
          {{ badge.text }}
        </button>
      </div>
    </div>

    <div class="flex gap-1 overflow-x-auto overflow-y-hidden border-b-2 border-gray-300" role="tablist">
      <button
        v-for="step in steps"
        :key="step.key"
        type="button"
        role="tab"
        :aria-selected="step.key === current.key"
        class="flex items-center gap-2 shrink-0 px-3 py-3 border-b-4 font-bold whitespace-nowrap transition-colors hover:cursor-pointer"
        :class="
          step.key === current.key
            ? 'border-red-main text-red-main'
            : 'border-transparent text-gray-700 hover:text-black hover:border-gray-400'
        "
        @click="active = step.key"
      >
        <span
          class="flex items-center justify-center w-6 h-6 shrink-0 text-xs"
          :class="step.done ? 'bg-red-main text-white' : 'border-2 border-gray-400 text-gray-600'"
        >
          {{ step.number }}
        </span>
        {{ step.title }}
      </button>
    </div>

    <div class="flex flex-col gap-8 p-4 sm:p-6 rounded-lg border border-gray-300 bg-white shadow-md">
      <p v-if="current.hint" class="text-gray-600 -mb-2">{{ current.hint }}</p>
      <CalculatorSection :key="`${fence.id}-${current.key}`" :step="current.key" />
    </div>
  </div>
</template>
