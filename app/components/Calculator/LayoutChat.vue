<script setup lang="ts">
import type { StepKey } from "~/composables/useCalculatorSteps";

// 7 išdėstymas: klausimas po klausimo. Rodomas tik vienas klausimas; atsakius jis susitraukia į eilutę
// „klausimas – atsakymas“ ir pasirodo kitas. Tolimesnių klausimų dar nematyti, tad nėra ko išsigąsti.
// Atsakytą klausimą galima atidaryti iš naujo („Keisti“).
const { fence } = useCalculator();
const { steps } = useCalculatorSteps();

// kiek klausimų jau patvirtinta („Toliau“) ir kuris atsakytas šiuo metu taisomas
const reached = ref(0);
const editing = ref<StepKey | null>(null);

watch(
  () => steps.value.length,
  (length) => {
    if (reached.value > length) reached.value = length;
  },
);

const answered = computed(() => steps.value.slice(0, reached.value));
const question = computed(() => steps.value[reached.value] ?? null);

const confirm = () => {
  editing.value = null;
  reached.value = Math.min(reached.value + 1, steps.value.length);
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- atsakyti klausimai -->
    <template v-for="step in answered" :key="step.key">
      <section
        v-if="editing === step.key"
        class="flex flex-col gap-6 p-4 sm:p-6 rounded-lg border-2 border-red-main bg-white shadow-lg"
      >
        <h2 class="text-xl font-bold">{{ step.title }}</h2>
        <CalculatorFenceTabs v-if="step.key === 'need'" />
        <CalculatorSection :key="`${fence.id}-${step.key}`" :step="step.key" />
        <BaseButton width="w-full sm:w-60" :disabled="!step.done" @click="editing = null">
          {{ $t("calc.layout.done") }}
        </BaseButton>
      </section>

      <div v-else class="flex flex-col gap-1">
        <p class="text-sm text-gray-600">{{ step.title }}</p>
        <div class="flex justify-end">
          <button
            type="button"
            class="flex items-center gap-3 max-w-full px-4 py-2 rounded-2xl rounded-br-sm text-left hover:cursor-pointer"
            :class="step.done ? 'bg-red-main text-white hover:brightness-110' : 'border-2 border-red-main text-red-main'"
            :title="$t('calc.layout.change')"
            @click="editing = step.key"
          >
            <span class="font-bold">{{ step.done && step.value ? step.value : $t("calc.layout.choose") }}</span>
            <span class="shrink-0 text-sm underline opacity-90">{{ $t("calc.layout.change") }}</span>
          </button>
        </div>
      </div>
    </template>

    <!-- dabartinis klausimas -->
    <section
      v-if="question"
      class="flex flex-col gap-6 mt-2 p-4 sm:p-6 rounded-2xl rounded-bl-sm border-2 border-gray-300 bg-gray-50"
    >
      <div class="flex flex-col gap-1">
        <p class="text-sm font-semibold text-gray-600">
          {{ $t("calc.layout.progress", { n: question.number, total: steps.length }) }}
        </p>
        <h2 class="text-2xl font-bold">{{ question.title }}</h2>
        <p v-if="question.hint" class="text-gray-600">{{ question.hint }}</p>
      </div>
      <CalculatorFenceTabs v-if="question.key === 'need'" />
      <CalculatorSection :key="`${fence.id}-${question.key}`" :step="question.key" />
      <div class="flex flex-wrap items-center gap-4">
        <BaseButton width="w-full sm:w-60" :disabled="!question.done" @click="confirm">
          {{ $t("calc.layout.next") }} →
        </BaseButton>
        <p v-if="!question.done" class="text-sm font-semibold text-red-main">{{ $t("calc.layout.fillFirst") }}</p>
      </div>
    </section>

    <p v-else class="mt-2 p-4 rounded-2xl rounded-bl-sm border-2 border-gray-300 bg-gray-50 font-semibold">
      {{ $t("calc.layout.allDone") }}
    </p>
  </div>
</template>
