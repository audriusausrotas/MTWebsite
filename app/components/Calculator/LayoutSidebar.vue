<script setup lang="ts">
import type { StepKey } from "~/composables/useCalculatorSteps";

// 5 išdėstymas: meniu kairėje. Šone – visų žingsnių sąrašas su pasirinktomis reikšmėmis (galima šokti į bet kurį),
// dešinėje – pasirinkto žingsnio turinys. Telefone sąrašas virsta slenkama juosta viršuje.
const { fence } = useCalculator();
const { steps } = useCalculatorSteps();

const active = ref<StepKey>(steps.value.find((step) => !step.done)?.key ?? steps.value[0]!.key);

// pasikeitus žingsnių sąrašui (pvz. perjungus į žaliuzes) pasirinkto gali nebelikti
const current = computed(() => steps.value.find((step) => step.key === active.value) ?? steps.value[0]!);
const index = computed(() => steps.value.indexOf(current.value));

const go = (offset: number) => {
  const target = steps.value[index.value + offset];
  if (target) active.value = target.key;
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[230px_minmax(0,1fr)] gap-4 md:gap-6 items-start">
    <nav class="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0" :aria-label="$t('calc.layout.stepsNav')">
      <button
        v-for="step in steps"
        :key="step.key"
        type="button"
        class="flex items-center gap-3 shrink-0 md:shrink px-3 py-2 border-2 text-left transition-colors hover:cursor-pointer"
        :class="
          step.key === current.key
            ? 'border-red-main bg-red-main text-white'
            : 'border-gray-300 bg-white hover:border-gray-500'
        "
        :aria-current="step.key === current.key ? 'step' : undefined"
        @click="active = step.key"
      >
        <span
          class="flex items-center justify-center w-7 h-7 shrink-0 text-sm font-bold"
          :class="
            step.key === current.key
              ? 'bg-white text-red-main'
              : step.done
                ? 'bg-red-main text-white'
                : 'border-2 border-gray-400 text-gray-600'
          "
        >
          {{ step.number }}
        </span>
        <span class="flex flex-col min-w-0">
          <span class="font-bold leading-tight whitespace-nowrap md:whitespace-normal">{{ step.title }}</span>
          <span
            class="hidden md:block text-sm truncate"
            :class="step.key === current.key ? 'text-white/90' : step.done && step.value ? 'text-gray-600' : 'text-red-main font-semibold'"
          >
            {{ step.done && step.value ? step.value : $t("calc.layout.choose") }}
          </span>
        </span>
      </button>
    </nav>

    <div class="flex flex-col gap-5 min-w-0">
      <CalculatorFenceTabs v-if="current.fence" />

      <CalculatorStep :number="current.number" :title="current.title" :hint="current.hint">
        <CalculatorSection :key="`${fence.id}-${current.key}`" :step="current.key" />
      </CalculatorStep>

      <div class="flex justify-between gap-3">
        <button
          type="button"
          class="min-h-12 px-6 border-2 border-gray-300 bg-white font-bold hover:border-black hover:cursor-pointer disabled:opacity-40 disabled:cursor-default"
          :disabled="index === 0"
          @click="go(-1)"
        >
          ← {{ $t("calc.layout.back") }}
        </button>
        <BaseButton v-if="index < steps.length - 1" width="w-40 sm:w-60" @click="go(1)">
          {{ $t("calc.layout.next") }} →
        </BaseButton>
      </div>
    </div>
  </div>
</template>
