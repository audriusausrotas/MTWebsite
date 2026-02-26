div
<script setup lang="ts">
const { selectedTwoSided, selectedSpace } = useCalculations();

const selectHandler = (value: string) => {
  selectedTwoSided.value = value === "Vienpusės" ? false : true;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold">Pasirinkite tvoralenčių montavimo būdą</h2>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 flex-wrap">
        <CalculatorButtonWithPicture
          src="/images/tvoros/dilė.jpg"
          name="Vienpusės"
          :selected="selectedTwoSided ? 'Dvipusės' : 'Vienpusės'"
          @onSelect="selectHandler"
        />
        <CalculatorButtonWithPicture
          src="/images/tvoros/tvora20.jpg"
          name="Dvipusės"
          :selected="selectedTwoSided ? 'Dvipusės' : 'Vienpusės'"
          @onSelect="selectHandler"
        />
      </div>
      <div class="flex flex-col gap-1 w-92">
        <BaseInput
          :name="selectedSpace"
          type="number"
          label="Pasirinkite norimą tarpą tarp tvoralenčių *"
          @onChange="(value) => (selectedSpace = +value)"
          width="w-full"
        />
        <p class="text-xs text-gray-500 pl-2">
          * standartiniai tarpai parenkami automatiškai pakeitus tvoralenčių montavimo būdą
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
