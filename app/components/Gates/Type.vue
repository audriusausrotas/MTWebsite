<script setup lang="ts">
// Vartų tipo blokas: gaminio vaizdas + aprašymas su privalumais
defineProps<{
  title: string;
  text: string;
  points: string[];
  image: string;
  alt: string;
  reverse?: boolean;
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="bg-gray-100 rounded-lg overflow-hidden" :class="reverse ? 'md:order-2' : ''">
      <!-- gaminių vaizdai turi daug tuščio fono – šiek tiek priartinami -->
      <NuxtImg
        :src="image"
        :alt="alt"
        sizes="sm:100vw md:50vw lg:600px"
        loading="lazy"
        class="w-full aspect-4/3 object-contain scale-110"
      />
    </div>
    <div class="flex flex-col gap-6">
      <h3 class="text-3xl font-medium text-center md:text-left">{{ title }}</h3>
      <p class="text-justify">{{ text }}</p>
      <ul class="flex flex-col gap-3 font-medium">
        <li v-for="point in points" :key="point" class="flex gap-3">
          <span class="mt-2 w-2 h-2 shrink-0 bg-red-main"></span>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
