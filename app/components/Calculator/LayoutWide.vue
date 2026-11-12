<script setup lang="ts">
// 9 išdėstymas: platus, dviem stulpeliais. Visi žingsniai matomi iš karto per visą puslapio plotį (santrauka – ne
// šone, o po jais; kaina visada matoma juostoje apačioje). Mažiau slinkimo nei viename stulpelyje.
const { fence } = useCalculator();
const { before, inFence, after } = useCalculatorSteps();
</script>

<template>
  <div class="flex flex-col gap-6">
    <CalculatorStep v-for="step in before" :key="step.key" :number="step.number" :title="step.title" :hint="step.hint">
      <CalculatorSection :step="step.key" />
    </CalculatorStep>

    <div v-if="inFence.length" class="flex flex-col gap-5 p-3 sm:p-5 rounded-lg border-2 border-gray-300 bg-gray-100">
      <CalculatorFenceTabs />
      <!-- stulpeliai pildomi iš viršaus į apačią: 2, 3, 4… kairėje, likę – dešinėje -->
      <div class="lg:columns-2 gap-5 space-y-5">
        <CalculatorStep
          v-for="step in inFence"
          :key="step.key"
          class="break-inside-avoid"
          :number="step.number"
          :title="step.title"
          :hint="step.hint"
        >
          <CalculatorSection :key="`${fence.id}-${step.key}`" :step="step.key" />
        </CalculatorStep>
      </div>
    </div>

    <CalculatorStep v-for="step in after" :key="step.key" :number="step.number" :title="step.title" :hint="step.hint">
      <CalculatorSection :step="step.key" />
    </CalculatorStep>
  </div>
</template>
