<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "w-48",
  height: "h-12",
});
</script>

<template>
  <button
    class="flex gap-2 border-2 px-4 justify-center items-center border-red-main text-red-main font-bold hover:cursor-pointer hover:bg-red-100 transition-colors"
    :class="[width, height]"
  >
    <slot />
  </button>
</template>
