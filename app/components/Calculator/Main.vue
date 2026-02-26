<script setup lang="ts">
const { selectedFenceType } = useCalculations();
</script>

<template>
  <div class="flex flex-col gap-20">
    <CalculatorClient />
    <CalculatorFences />
    <CalculatorSeeThrough v-if="selectedFenceType === 'Tvora'" />
    <CalculatorFenceboardData v-if="selectedFenceType === 'Tvoralentė'" />
    <CalculatorColors />
    <CalculatorParts />
    <CalculatorGates />
  </div>
</template>

<style scoped></style>
