<script setup lang="ts">
// 4 išdėstymas: po vieną žingsnį. Ekrane – tik vienas klausimas, viršuje – eigos juosta, apačioje „Atgal“ / „Toliau“.
const { fence } = useCalculator();
const { steps } = useCalculatorSteps();

const index = ref(0);

// pasikeitus žingsnių sąrašui (pvz. nuėmus vartus) lieka galiojantis numeris
watch(
  () => steps.value.length,
  (length) => {
    if (index.value > length - 1) index.value = Math.max(0, length - 1);
  },
);

const current = computed(() => steps.value[Math.min(index.value, steps.value.length - 1)]!);
const last = computed(() => index.value >= steps.value.length - 1);

const go = (target: number) => {
  index.value = Math.max(0, Math.min(steps.value.length - 1, target));
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- eiga: žingsnių taškai, užpildyti – raudoni; galima peršokti į bet kurį -->
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between gap-4 text-sm font-semibold text-gray-600">
        <span>{{ $t("calc.layout.progress", { n: current.number, total: steps.length }) }}</span>
        <span class="text-black">{{ current.title }}</span>
      </div>
      <div class="flex gap-1.5">
        <button
          v-for="(step, position) in steps"
          :key="step.key"
          type="button"
          class="h-2.5 flex-1 transition-colors hover:cursor-pointer"
          :class="position === index ? 'bg-black' : step.done ? 'bg-red-main' : 'bg-gray-300'"
          :aria-label="`${step.number}. ${step.title}`"
          :title="`${step.number}. ${step.title}`"
          @click="go(position)"
        ></button>
      </div>
    </div>

    <CalculatorFenceTabs v-if="current.fence" />

    <CalculatorStep :number="current.number" :title="current.title" :hint="current.hint">
      <CalculatorSection :key="`${fence.id}-${current.key}`" :step="current.key" />
    </CalculatorStep>

    <div class="flex items-center justify-between gap-3">
      <button
        type="button"
        class="min-h-12 px-6 border-2 border-gray-300 bg-white font-bold hover:border-black hover:cursor-pointer disabled:opacity-40 disabled:cursor-default"
        :disabled="index === 0"
        @click="go(index - 1)"
      >
        ← {{ $t("calc.layout.back") }}
      </button>
      <p v-if="!current.done" class="flex-1 text-right text-sm font-semibold text-red-main">
        {{ $t("calc.layout.fillFirst") }}
      </p>
      <BaseButton v-if="!last" width="w-40 sm:w-60" :disabled="!current.done" @click="go(index + 1)">
        {{ $t("calc.layout.next") }} →
      </BaseButton>
      <a
        v-else
        href="#calc-summary"
        class="flex items-center justify-center min-h-12 px-6 bg-red-main text-white font-bold lg:hidden"
      >
        {{ $t("calc.summary.show") }}
      </a>
    </div>
  </div>
</template>
