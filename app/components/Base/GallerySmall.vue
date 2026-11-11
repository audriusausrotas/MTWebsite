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
  <div class="flex flex-col gap-3 w-full select-none">
    <!-- Vaizdas visada rodomas visas (object-contain): nuotraukos 3:2 užpildo langelį,
         o aukšti brėžiniai telpa nenukirpti. mix-blend-multiply baltą brėžinio foną sulieja su langelio fonu -->
    <button
      type="button"
      :aria-label="$t('gallery.enlarge')"
      class="relative w-full aspect-3/2 bg-gray-100 rounded-lg overflow-hidden hover:cursor-zoom-in"
      @click="modalOpen = true"
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
          :key="currentImageIndex"
          :src="images[currentImageIndex]?.url"
          :alt="altOf(images[currentImageIndex])"
          sizes="sm:100vw md:600px"
          class="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
        />
      </Transition>
    </button>

    <div v-if="images.length > 1" class="flex overflow-x-auto max-w-full">
      <div class="flex gap-2 scroll-smooth">
        <button
          v-for="(image, index) in images"
          :key="`thumb-${index}`"
          type="button"
          :ref="(el) => (thumbRefs[index] = el as HTMLElement)"
          :aria-label="altOf(image)"
          :aria-current="index === currentImageIndex"
          @click="() => (currentImageIndex = index)"
          :class="[
            'shrink-0 w-30 h-20 bg-gray-100 rounded-md overflow-hidden transition-colors duration-200 border-2 hover:cursor-pointer',
            index === currentImageIndex ? 'border-red-main' : 'border-transparent hover:border-gray-300',
          ]"
        >
          <!-- fit="inside": serveris vaizdą sumažina, bet neapkerpa -->
          <NuxtImg
            v-if="image.url"
            :src="image.url"
            alt=""
            width="240"
            height="160"
            fit="inside"
            loading="lazy"
            class="w-full h-full object-contain mix-blend-multiply"
          />
        </button>
      </div>
    </div>
    <BaseGalleryFullscreen
      v-if="modalOpen"
      :images="images"
      :currentImage="currentImageIndex"
      contain-thumbs
      @closeModal="modalOpen = false"
    />
  </div>
</template>
