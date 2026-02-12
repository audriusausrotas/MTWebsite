<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="flex lg:flex-row flex-col text-white w-full max-w-default px-4 m-auto">
    <NuxtImg src="/images/tvoros/tvora5.jpg" alt="" class="w-full object-cover max-h-100" />
    <div
      class="bg-red-main p-8 lg:max-w-100 w-full flex flex-col gap-8 justify-center max-w-[calc(100%-32px)] mx-auto -mt-40 lg:m-0"
    >
      <div class="flex gap-4">
        <img src="/icons/calculator.svg" alt="" />
        <h3 class="text-4xl">{{ $t("skaiciuokle.title") }}</h3>
      </div>
      <p>{{ $t("skaiciuokle.text") }}</p>
      <BaseArrowButton
        :name="$t('skaiciuokle.button')"
        variant="secondary"
        :to="localePath('/tvoru-skaiciuokle')"
      />
    </div>
  </div>
</template>

<style scoped></style>
