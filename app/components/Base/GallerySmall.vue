<script setup lang="ts">
import type { Image } from "~/data/interfaces";

const props = defineProps<{ images: Image[] }>();

const { locale } = useI18n();
const currentImageIndex = ref<number>(0);
const thumbRefs = ref<HTMLElement[]>([]);
const modalOpen = ref<boolean>(false);

watch(currentImageIndex, (i) => {
  const el = thumbRefs.value[i];
  el?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
});
</script>

<template>
  <div
    @contextmenu.prevent
    class="flex flex-col gap-4 justify-between max-w-default w-full h-140 select-none"
  >
    <Transition
      enter-active-class="transition-opacity duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <NuxtImg
        @click="modalOpen = true"
        :key="currentImageIndex"
        :src="images[currentImageIndex]?.url"
        :alt="locale === 'lt' ? images[currentImageIndex]?.alt : images[currentImageIndex]?.altEN"
        class="w-full h-full max-h-108 object-contain hover:cursor-pointer"
      />
    </Transition>

    <div class="flex overflow-hidden max-w-[calc(theme(maxWidth.default)/2)] rounded-lg">
      <div class="flex gap-2 scroll-smooth">
        <button
          v-for="(image, index) in images"
          :key="`thumb-${index}`"
          :ref="(el) => (thumbRefs[index] = el as HTMLElement)"
          @click="() => (currentImageIndex = index)"
          :class="[
            'shrink-0 rounded-md overflow-hidden transition-all duration-200 border-2 hover:cursor-pointer',
            index === currentImageIndex ? 'border-red-600' : 'hover:scale-105 border-transparent',
          ]"
        >
          <NuxtImg
            v-if="image.url"
            :src="image.url"
            :alt="locale === 'lt' ? image.alt : image.altEN"
            class="w-28 h-28 object-cover"
          />
        </button>
      </div>
    </div>
    <BaseGalleryFullscreen
      v-if="modalOpen"
      :images="images"
      :currentImage="currentImageIndex"
      @closeModal="modalOpen = false"
    />
  </div>
</template>

<style scoped></style>
