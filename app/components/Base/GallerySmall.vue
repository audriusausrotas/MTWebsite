<script setup lang="ts">
import type { Image } from "~/data/interfaces";

const props = defineProps<{ images: Image[]; fallbackAlt?: string }>();

const { locale } = useI18n();
const currentImageIndex = ref<number>(0);
const thumbRefs = ref<HTMLElement[]>([]);
const modalOpen = ref<boolean>(false);

const altOf = (image?: Image) =>
  (locale.value === "en" ? image?.altEN : image?.alt) || props.fallbackAlt || image?.name || "";

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
  <div class="flex flex-col gap-4 justify-between w-full select-none">
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
        :alt="altOf(images[currentImageIndex])"
        sizes="sm:100vw md:600px"
        class="w-full h-full max-h-108 object-contain hover:cursor-pointer"
      />
    </Transition>

    <div v-if="images.length > 1" class="flex overflow-x-auto max-w-full rounded-lg">
      <div class="flex gap-2 scroll-smooth">
        <button
          v-for="(image, index) in images"
          :key="`thumb-${index}`"
          type="button"
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
            :alt="altOf(image)"
            width="112"
            height="112"
            fit="cover"
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
