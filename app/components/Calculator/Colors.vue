<script setup lang="ts">
const { selectedColor, selectedFenceType } = useCalculations();

const selectHandler = (value: string) => {
  selectedColor.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold">Pasirinkite tvoros spalvą pagal RAL spalvų paletę</h2>
    <div class="flex gap-2 flex-wrap">
      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Tvora'"
        name="9005"
        color="bg-black"
        :image="false"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        name="7016"
        color="bg-gray-800"
        :image="false"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Tvora'"
        color="bg-gray-600"
        :image="false"
        name="7024"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType !== 'Segmentas'"
        color="bg-yellow-950"
        :image="false"
        name="8019"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        color="bg-orange-900"
        :image="false"
        name="8017"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Tvora'"
        color="bg-green-900"
        :image="false"
        name="6020"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Segmentas'"
        color="bg-green-800"
        :image="false"
        name="6005"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Segmentas'"
        color="bg-gray-200"
        :image="false"
        name="Zn"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Tvora'"
        color="bg-red-900"
        :image="false"
        name="3009"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />

      <CalculatorButtonWithPicture
        v-if="selectedFenceType === 'Tvora'"
        color="bg-amber-800"
        :image="false"
        name="8004"
        :selected="selectedColor"
        @onSelect="selectHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
