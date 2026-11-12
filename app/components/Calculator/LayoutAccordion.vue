<script setup lang="ts">
import type { StepInfo, StepKey } from "~/composables/useCalculatorSteps";

// 2 išdėstymas: sutraukiami blokai. Kiekvienas žingsnis – viena eilutė su pasirinkta reikšme; atidarytas tik vienas,
// „Toliau“ atidaro kitą. Visas skaičiavimas telpa į vieną ekraną.
const { fence } = useCalculator();
const { steps, before, inFence, after } = useCalculatorSteps();

// atidarytas žingsnis: iš pradžių – pirmas neužpildytas
const open = ref<StepKey | null>(steps.value.find((step) => !step.done)?.key ?? null);

const toggle = (key: StepKey) => {
  open.value = open.value === key ? null : key;
};

const next = (key: StepKey) => {
  const index = steps.value.findIndex((step) => step.key === key);
  open.value = steps.value[index + 1]?.key ?? null;
};

// pasikeitus žingsnių sąrašui (pvz. nuėmus vartus) atidaryto gali nebelikti
watch(steps, (list) => {
  if (open.value && !list.some((step) => step.key === open.value)) open.value = null;
});

const groups = computed<{ key: string; fence: boolean; steps: StepInfo[] }[]>(() =>
  [
    { key: "before", fence: false, steps: before.value },
    { key: "fence", fence: true, steps: inFence.value },
    { key: "after", fence: false, steps: after.value },
  ].filter((group) => group.steps.length),
);
</script>

<template>
  <div class="flex flex-col gap-3">
    <template v-for="group in groups" :key="group.key">
      <CalculatorFenceTabs v-if="group.fence" class="mt-3" />

      <section
        v-for="step in group.steps"
        :key="step.key"
        class="rounded-lg border-2 bg-white overflow-hidden transition-shadow"
        :class="open === step.key ? 'border-red-main shadow-lg' : 'border-gray-300'"
      >
        <button
          type="button"
          class="w-full flex items-center gap-4 px-4 py-3 text-left hover:cursor-pointer"
          :class="open === step.key ? 'bg-gray-100' : 'hover:bg-gray-50'"
          :aria-expanded="open === step.key"
          @click="toggle(step.key)"
        >
          <span
            class="flex items-center justify-center w-9 h-9 shrink-0 text-lg font-bold"
            :class="step.done ? 'bg-red-main text-white' : 'border-2 border-gray-400 text-gray-600'"
          >
            {{ step.number }}
          </span>
          <span class="flex flex-col min-w-0 flex-1 sm:flex-row sm:items-baseline sm:gap-4">
            <span class="text-lg font-bold shrink-0">{{ step.title }}</span>
            <span class="truncate" :class="step.value && step.done ? 'text-gray-700' : 'text-red-main font-semibold'">
              {{ step.done && step.value ? step.value : $t("calc.layout.choose") }}
            </span>
          </span>
          <svg
            class="w-5 h-5 shrink-0 fill-none stroke-current stroke-2 transition-transform"
            :class="open === step.key ? 'rotate-180' : ''"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div v-if="open === step.key" class="flex flex-col gap-8 p-4 sm:p-6 border-t border-gray-300">
          <p v-if="step.hint" class="text-gray-600 -mb-2">{{ step.hint }}</p>
          <CalculatorSection :key="`${fence.id}-${step.key}`" :step="step.key" />
          <BaseButton v-if="step.key !== 'install'" width="w-full sm:w-60" @click="next(step.key)">
            {{ $t("calc.layout.next") }}
          </BaseButton>
        </div>
      </section>
    </template>
  </div>
</template>
