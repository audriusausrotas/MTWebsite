<script setup lang="ts">
const { selectedSeeThrough } = useCalculations();

const selectHandler = (value: string) => {
  selectedSeeThrough.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold">Pasirinkite tvoros pramatomumą</h2>
    <div class="flex gap-2 flex-wrap">
      <CalculatorButtonWithPicture
        src="/images/tvoros/eglėplus.jpg"
        name="Aklina"
        :selected="selectedSeeThrough"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/daimond6090.jpg"
        name="Nepramatoma"
        :selected="selectedSeeThrough"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/tvora8.jpg"
        name="Vidutiniška"
        :selected="selectedSeeThrough"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/plank.jpg"
        name="pramatoma"
        :selected="selectedSeeThrough"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/tvora7.jpg"
        name="25% pramatomumas"
        :selected="selectedSeeThrough"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/tvora17.jpg"
        name="50% pramatomumas"
        :selected="selectedSeeThrough"
        @onSelect="selectHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
