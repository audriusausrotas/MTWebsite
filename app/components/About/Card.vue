<script setup lang="ts">
interface Props {
  title?: string;
  text?: string;
  url?: string;
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  text: "",
  url: "",
  alt: "",
});
</script>

<template>
  <div class="flex flex-col flex-1 min-w-48 h-full">
    <div class="relative">
      <NuxtImg :src="url" class="object-cover w-full" />
      <div
        class="flex items-center justify-center text-center -translate-y-1/2 bg-red-main text-white font-medium px-4 min-h-16 max-w-[85%]"
      >
        {{ title }}
      </div>
    </div>
    <p class="text-justify">{{ text }}</p>
  </div>
</template>

<style scoped></style>
