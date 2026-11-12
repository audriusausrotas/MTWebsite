<script setup lang="ts">
// 8 išdėstymas: kompaktiška forma. Visi pasirinkimai – vienoje formoje paprastais laukais (išskleidžiami sąrašai ir
// įvedimas), be nuotraukų: pavadinimas kairėje, laukas dešinėje. Viskas matoma iš karto, be slinkimo.
const { fence, model, isBlinds, hasFence } = useCalculator();
const { scopes, lookStep } = useCalculatorSteps();
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-if="scopes.length > 1" class="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] items-center gap-x-6 gap-y-1 p-4 sm:p-5 rounded-lg border-2 border-gray-300 bg-white">
      <span class="font-bold">{{ $t("calc.steps.scope") }}</span>
      <CalculatorControl field="scope" />
    </div>

    <div v-if="isBlinds" class="flex flex-col gap-8 p-4 sm:p-5 rounded-lg border-2 border-gray-300 bg-white">
      <CalculatorBlinds />
    </div>

    <template v-else>
      <CalculatorFenceTabs />

      <div
        :key="fence.id"
        class="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] items-center gap-x-6 gap-y-1 sm:gap-y-4 p-4 sm:p-5 rounded-lg border-2 border-gray-300 bg-white"
      >
        <span class="font-bold mt-3 sm:mt-0">{{ $t("calc.steps.need") }}</span>
        <CalculatorControl field="need" />

        <span class="font-bold mt-3 sm:mt-0">{{ $t(hasFence ? "calc.steps.model" : "calc.steps.modelGates") }}</span>
        <CalculatorControl field="model" />

        <template v-if="model && lookStep">
          <span class="font-bold mt-3 sm:mt-0">{{ $t(model.twoSided ? "calc.boards.title" : "calc.seeThrough.title") }}</span>
          <CalculatorControl field="look" />
        </template>

        <template v-if="model?.steel">
          <span class="font-bold mt-3 sm:mt-0">{{ $t("calc.steel.title") }}</span>
          <CalculatorControl field="steel" />
        </template>

        <span class="font-bold mt-3 sm:mt-0">{{ $t("calc.color.title") }}</span>
        <CalculatorControl field="color" />

        <span class="font-bold mt-3 sm:mt-0">{{ $t(hasFence ? "calc.size.height" : "calc.size.gateHeight") }}</span>
        <div class="sm:w-60"><CalculatorControl field="height" /></div>

        <template v-if="hasFence">
          <span class="font-bold mt-3 sm:mt-0">{{ $t("calc.size.length") }}</span>
          <div class="sm:w-60"><CalculatorControl field="length" /></div>
        </template>

        <span class="font-bold mt-3 sm:mt-0">{{ $t(hasFence ? "calc.steps.parts" : "calc.steps.partsGates") }}</span>
        <CalculatorControl field="parts" />
      </div>

      <div v-if="fence.needGates" class="flex flex-col gap-4 p-4 sm:p-5 rounded-lg border-2 border-gray-300 bg-white">
        <CalculatorHeading>{{ $t("calc.steps.gates") }}</CalculatorHeading>
        <CalculatorGates :key="fence.id" />
      </div>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] items-center gap-x-6 gap-y-1 p-4 sm:p-5 rounded-lg border-2 border-gray-300 bg-white">
      <span class="font-bold">{{ $t("calc.steps.install") }}</span>
      <CalculatorControl field="install" />
    </div>
  </div>
</template>
