<script setup lang="ts">
// Skaičiuoklės žingsnis – atskira kortelė: juosta su numeriu ir pavadinimu, po ja turinys
defineProps<{ number: number; title: string; hint?: string }>();
</script>

<template>
  <section class="flex flex-col rounded-lg border border-gray-300 bg-white shadow-md overflow-hidden">
    <div class="flex items-center gap-4 px-4 sm:px-6 py-3 bg-gray-100 border-b border-gray-300">
      <span
        class="flex items-center justify-center w-10 h-10 shrink-0 bg-red-main text-white text-xl font-bold"
      >
        {{ number }}
      </span>
      <h2 class="text-2xl font-bold">{{ title }}</h2>
    </div>
    <div class="flex flex-col gap-8 p-4 sm:p-6">
      <p v-if="hint" class="text-gray-600 -mb-2">{{ hint }}</p>
      <slot />
    </div>
  </section>
</template>
