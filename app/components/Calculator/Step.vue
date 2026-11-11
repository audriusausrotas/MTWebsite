<script setup lang="ts">
// Skaičiuoklės žingsnis: numeris, pavadinimas ir turinys
defineProps<{ number: number; title: string; hint?: string }>();
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex items-center gap-4">
      <span
        class="flex items-center justify-center w-10 h-10 shrink-0 bg-red-main text-white text-xl font-bold"
      >
        {{ number }}
      </span>
      <h2 class="text-2xl font-bold">{{ title }}</h2>
    </div>
    <p v-if="hint" class="text-gray-600 -mt-2">{{ hint }}</p>
    <slot />
  </section>
</template>
