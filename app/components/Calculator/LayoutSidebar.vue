<script setup lang="ts">
import type { StepKey } from "~/composables/useCalculatorSteps";

// 5 išdėstymas: meniu kairėje. Vienas šoninis stulpelis: visų žingsnių sąrašas su pasirinktomis reikšmėmis (galima
// šokti į bet kurį) ir po juo – kaina su užklausos mygtuku. Visas likęs plotis – pasirinkto žingsnio turiniui.
// Atskiros santraukos dešinėje nėra (žr. Main.vue): pasirinkimai jau matomi žingsnių sąraše.
// Telefone sąrašas virsta slenkama juosta viršuje, kaina – po turiniu.
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
  <div class="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-5 lg:gap-8 items-start">
    <!-- šoninis stulpelis; telefone jo dalys – atskiri blokai (meniu viršuje, kaina po turiniu) -->
    <div
      class="contents lg:flex lg:flex-col lg:gap-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1"
    >
      <nav
        class="order-1 flex lg:flex-col gap-2 lg:gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
        :aria-label="$t('calc.layout.stepsNav')"
      >
        <button
          v-for="step in steps"
          :key="step.key"
          type="button"
          class="flex items-center gap-3 shrink-0 lg:shrink px-3 py-2 lg:py-1.5 border-2 text-left transition-colors hover:cursor-pointer"
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
            <span class="font-bold leading-tight whitespace-nowrap lg:whitespace-normal">{{ step.title }}</span>
            <span
              class="hidden lg:block text-sm leading-tight truncate"
              :class="step.key === current.key ? 'text-white/90' : step.done && step.value ? 'text-gray-600' : 'text-red-main font-semibold'"
            >
              {{ step.done && step.value ? step.value : $t("calc.layout.choose") }}
            </span>
          </span>
        </button>
      </nav>

      <CalculatorSummary compact class="order-3" />
    </div>

    <div class="order-2 flex flex-col gap-5 min-w-0">
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
