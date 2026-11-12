<script setup lang="ts">
import type { StepInfo, StepKey } from "~/composables/useCalculatorSteps";

// 3 išdėstymas: mygtukai ir iššokantys langai. Puslapyje – tik pasirinkimų sąrašas (pavadinimas, reikšmė, „Keisti“);
// patys pasirinkimai atsidaro lange. „Toliau“ lange atidaro kitą žingsnį, tad galima pereiti visus iš eilės.
const { fence } = useCalculator();
const { steps, before, inFence, after } = useCalculatorSteps();

const open = ref<StepKey | null>(null);
const current = computed(() => steps.value.find((step) => step.key === open.value) ?? null);
const nextStep = computed(() => {
  const index = steps.value.findIndex((step) => step.key === open.value);
  return index >= 0 ? (steps.value[index + 1] ?? null) : null;
});

const close = () => {
  open.value = null;
};

const onKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

const groups = computed<{ key: string; fence: boolean; steps: StepInfo[] }[]>(() =>
  [
    { key: "before", fence: false, steps: before.value },
    { key: "fence", fence: true, steps: inFence.value },
    { key: "after", fence: false, steps: after.value },
  ].filter((group) => group.steps.length),
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <template v-for="group in groups" :key="group.key">
      <CalculatorFenceTabs v-if="group.fence" />

      <div class="flex flex-col rounded-lg border-2 border-gray-300 bg-white overflow-hidden divide-y divide-gray-200">
        <button
          v-for="step in group.steps"
          :key="step.key"
          type="button"
          class="flex items-center gap-4 px-4 py-3 text-left hover:bg-gray-50 hover:cursor-pointer"
          @click="open = step.key"
        >
          <span
            class="flex items-center justify-center w-9 h-9 shrink-0 text-lg font-bold"
            :class="step.done ? 'bg-red-main text-white' : 'border-2 border-gray-400 text-gray-600'"
          >
            {{ step.number }}
          </span>
          <span class="flex flex-col min-w-0 flex-1">
            <span class="text-sm text-gray-600">{{ step.title }}</span>
            <span class="text-lg font-bold truncate" :class="step.done && step.value ? '' : 'text-red-main'">
              {{ step.done && step.value ? step.value : $t("calc.layout.choose") }}
            </span>
          </span>
          <span
            class="shrink-0 px-4 py-2 border-2 font-bold"
            :class="step.done ? 'border-gray-300 text-gray-700' : 'border-red-main bg-red-main text-white'"
          >
            {{ $t(step.done ? "calc.layout.change" : "calc.layout.pick") }}
          </span>
        </button>
      </div>
    </template>

    <Teleport to="body">
      <div
        v-if="current"
        class="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 p-3 sm:p-6"
        @click.self="close"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="current.title"
          class="relative w-full max-w-4xl my-auto flex flex-col bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div class="flex items-center gap-4 px-4 sm:px-6 py-3 bg-gray-100 border-b border-gray-300">
            <span class="flex items-center justify-center w-10 h-10 shrink-0 bg-red-main text-white text-xl font-bold">
              {{ current.number }}
            </span>
            <h2 class="flex-1 text-2xl font-bold">{{ current.title }}</h2>
            <button
              type="button"
              class="w-10 h-10 text-2xl leading-none text-gray-500 hover:text-black hover:cursor-pointer"
              :aria-label="$t('calc.request.close')"
              @click="close"
            >
              ×
            </button>
          </div>

          <div class="flex flex-col gap-8 p-4 sm:p-6">
            <p v-if="current.hint" class="text-gray-600 -mb-2">{{ current.hint }}</p>
            <CalculatorSection :key="`${fence.id}-${current.key}`" :step="current.key" />
          </div>

          <div class="flex flex-wrap justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              class="min-h-12 px-6 border-2 border-gray-300 bg-white font-bold hover:border-black hover:cursor-pointer"
              @click="close"
            >
              {{ $t("calc.layout.done") }}
            </button>
            <BaseButton v-if="nextStep" width="w-full sm:w-auto sm:px-8" @click="open = nextStep.key">
              {{ $t("calc.layout.nextNamed", { title: nextStep.title }) }}
            </BaseButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
