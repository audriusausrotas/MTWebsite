<script setup lang="ts">
// 1 išdėstymas: visi žingsniai viename puslapyje, kiekvienas – atskira kortelė. Tvoros žingsniai – bendrame rėme
// su tvorų skirtukais.
const { fence } = useCalculator();
const { before, inFence, after } = useCalculatorSteps();
</script>

<template>
  <div class="flex flex-col gap-8">
    <CalculatorStep v-for="step in before" :key="step.key" :number="step.number" :title="step.title" :hint="step.hint">
      <CalculatorSection :step="step.key" />
    </CalculatorStep>

    <div v-if="inFence.length" class="flex flex-col gap-6 p-3 sm:p-5 rounded-lg border-2 border-gray-300 bg-gray-100">
      <CalculatorFenceTabs />
      <CalculatorStep
        v-for="step in inFence"
        :key="step.key"
        :number="step.number"
        :title="step.title"
        :hint="step.hint"
      >
        <CalculatorSection :key="`${fence.id}-${step.key}`" :step="step.key" />
      </CalculatorStep>
    </div>

    <CalculatorStep v-for="step in after" :key="step.key" :number="step.number" :title="step.title" :hint="step.hint">
      <CalculatorSection :step="step.key" />
    </CalculatorStep>
  </div>
</template>
