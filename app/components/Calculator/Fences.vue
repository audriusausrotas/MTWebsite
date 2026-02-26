<script setup lang="ts">
const { selectedFence } = useCalculations();

const selectHandler = (value: string) => {
  selectedFence.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold">Pasirinkite tvoros profilį</h2>
    <div class="flex gap-2 flex-wrap">
      <CalculatorButtonWithPicture
        src="/images/tvoros/daimond6090.jpg"
        name="Daimond 60/90"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/daimond40105.jpg"
        name="Daimond 40/105"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/daimond60140.jpg"
        name="Daimond 60/140"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/daimondvertical.jpg"
        name="Daimond Vertical"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/plank.jpg"
        name="Plank"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/eglė.jpg"
        name="Eglė"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/eglėplus.jpg"
        name="Eglė Plus"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/žaliuzi.jpg"
        name="Žaliuzi"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/dilė.jpg"
        name="Dilė"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/kaip-issirinkti-tvora.jpg"
        name="Tvoralentė Alba"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
      <CalculatorButtonWithPicture
        src="/images/tvoros/tvora22.jpg"
        name="Segmentas"
        :selected="selectedFence"
        @onSelect="selectHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
