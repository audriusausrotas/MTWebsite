<script setup lang="ts">
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

interface Array {
  name?: string;
  text?: string;
  url?: string;
}

interface Props {
  arr?: Array[];
  images?: boolean;
  gap?: number;
  speed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  images: true,
  gap: 18,
  speed: 2000,
});

const carouselConfig = {
  itemsToShow: 1.2,
  wrapAround: true,
  breakpoints: {
    640: { itemsToShow: 2 },
    1024: { itemsToShow: 2.5 },
  },
};
</script>

<template>
  <Carousel
    v-bind="carouselConfig"
    :autoplay="speed"
    :gap="gap"
    :transition="500"
    class="rounded overflow-hidden"
  >
    <Slide v-for="(slide, index) in arr" :key="images ? slide.url : slide.name! + index">
      <div class="h-fit w-full">
        <!-- visos skaidrės vienodo aukščio (3:2), nepriklausomai nuo nuotraukos proporcijų -->
        <NuxtImg
          v-if="images"
          :src="slide.url"
          :alt="slide.name || ''"
          sizes="sm:100vw md:500px"
          loading="lazy"
          class="w-full aspect-3/2 object-cover rounded"
        />
        <div v-else class="flex flex-col gap-4">
          <p class="text-2xl font-medium">{{ slide.name }}</p>
          <p>{{ slide.text }}</p>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel {
  --vc-nav-background: rgba(0, 0, 0, 0.3);
  --vc-nav-color: white;
  --vc-nav-color-hover: #df0914;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 40px;
  --vc-nav-height: 40px;
}
</style>
