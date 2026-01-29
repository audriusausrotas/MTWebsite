<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="flex h-100 text-white w-full max-w-default px-4 m-auto">
    <NuxtImg src="/images/tvoros/tvora5.jpg" alt="" class="w-full object-cover" />
    <div class="bg-red-main p-8 max-w-100 w-full flex flex-col gap-8 justify-center">
      <div class="flex gap-4">
        <img src="/icons/calculator.svg" alt="" />
        <h3 class="text-4xl">{{ $t("menu.calculator") }}</h3>
      </div>
      <p>Gaukite kainos pasiūlymą dabar!</p>
      <BaseArrowButton
        name="SKAIČIUOTI"
        variant="secondary"
        :to="localePath('/tvoru-skaiciuokle')"
      />
    </div>
  </div>
</template>

<style scoped></style>
