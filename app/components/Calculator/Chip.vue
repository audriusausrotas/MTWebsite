<script setup lang="ts">
// Pasirenkamas mygtukas trumpoms reikšmėms (aukštis, plotis, kiekis)
defineProps<{ selected?: boolean }>();
defineEmits<{ select: [] }>();
</script>

<template>
  <button
    type="button"
    :aria-pressed="selected"
    class="min-w-16 h-12 px-4 border-2 font-bold transition-colors hover:cursor-pointer"
    :class="
      selected
        ? 'border-red-main bg-red-main text-white'
        : 'border-gray-300 bg-white hover:border-red-main hover:text-red-main'
    "
    @click="$emit('select')"
  >
    <slot />
  </button>
</template>
