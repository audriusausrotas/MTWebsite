<script setup lang="ts">
interface Props {
  reverse?: boolean;
  title?: string;
  text?: string;
  url?: string;
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  title: "",
  text: "",
  url: "",
  alt: "",
});
</script>

<template>
  <div class="flex gap-4 justify-between items-center">
    <div class="flex flex-col gap-12 max-w-100" :class="reverse ? 'order-2' : 'order-1'">
      <h2 class="font-medium text-4xl">{{ title }}</h2>
      <p class="text-justify">
        {{ text }}
      </p>
      <slot />
    </div>

    <NuxtImg
      :src="url"
      class="max-w-150 w-full h-auto object-cover"
      :class="reverse ? 'order-1' : 'order-2'"
    />
  </div>
</template>
