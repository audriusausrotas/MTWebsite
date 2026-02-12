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
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <div class="flex flex-col gap-12 w-full sm:max-w-100" :class="reverse ? 'order-2' : 'order-1'">
      <h2 class="font-medium text-4xl text-center sm:text-left">{{ title }}</h2>
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
