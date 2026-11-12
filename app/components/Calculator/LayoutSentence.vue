<script setup lang="ts">
// 10 išdėstymas: sakinys su laukais. Visas užsakymas – keli sakiniai, kuriuose pasirinkimai įterpti tiesiai į tekstą
// („Man reikia [tvoros]. Modelis – [Daimond 60/90] …“). Skaitoma kaip užsakymo aprašymas, keičiama vietoje.
const { fence, model, isBlinds, hasFence } = useCalculator();
const { scopes, lookStep } = useCalculatorSteps();
</script>

<template>
  <div class="flex flex-col gap-5">
    <CalculatorFenceTabs v-if="!isBlinds" />

    <div
      :key="fence.id"
      class="flex flex-col gap-4 p-5 sm:p-8 rounded-lg border-2 border-gray-300 bg-white text-lg sm:text-xl leading-[3.2rem]"
    >
      <p v-if="scopes.length > 1">
        {{ $t("calc.sentence.scope") }}
        <CalculatorControl field="scope" inline />.
      </p>

      <template v-if="!isBlinds">
        <p>
          {{ $t("calc.sentence.need") }}
          <CalculatorControl field="need" inline />.
          {{ $t(hasFence ? "calc.sentence.model" : "calc.sentence.modelGates") }}
          <CalculatorControl field="model" inline /><template v-if="model && lookStep"
            >, {{ $t(model.twoSided ? "calc.sentence.boards" : "calc.sentence.look") }}
            <CalculatorControl field="look" inline /></template
          ><template v-if="model?.steel"
            >, {{ $t("calc.sentence.steel") }}
            <CalculatorControl field="steel" inline /></template
          >, {{ $t("calc.sentence.color") }}
          <CalculatorControl field="color" inline />.
        </p>

        <p>
          {{ $t(hasFence ? "calc.sentence.height" : "calc.sentence.heightGates") }}
          <CalculatorControl field="height" inline />
          cm<template v-if="hasFence"
            >, {{ $t("calc.sentence.length") }}
            <CalculatorControl field="length" inline />
            m</template
          >.
          {{ $t(hasFence ? "calc.sentence.parts" : "calc.sentence.partsGates") }}
          <CalculatorControl field="parts" inline />.
        </p>
      </template>

      <p>
        {{ $t("calc.sentence.install") }}
        <CalculatorControl field="install" inline />.
      </p>
    </div>

    <div v-if="isBlinds" class="flex flex-col gap-8 p-4 sm:p-6 rounded-lg border-2 border-gray-300 bg-white">
      <CalculatorBlinds />
    </div>

    <div v-else-if="fence.needGates" class="flex flex-col gap-4 p-4 sm:p-6 rounded-lg border-2 border-gray-300 bg-white">
      <CalculatorHeading>{{ $t("calc.steps.gates") }}</CalculatorHeading>
      <CalculatorGates :key="fence.id" />
    </div>
  </div>
</template>
