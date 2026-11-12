<script setup lang="ts">
// Pasirinkimų grupės pavadinimas žingsnio viduje (pvz. „Skarda“, „Spalva“): raudonas brūkšnys ir linija,
// kad grupės ilgame puslapyje nesusilietų
defineProps<{ for?: string }>();
</script>

<template>
  <component
    :is="$props.for ? 'label' : 'h3'"
    :for="$props.for"
    class="flex items-center gap-3 pb-2 border-b-2 border-gray-200 text-xl font-bold"
  >
    <span class="w-1.5 h-6 shrink-0 bg-red-main" aria-hidden="true"></span>
    <span><slot /></span>
  </component>
</template>
