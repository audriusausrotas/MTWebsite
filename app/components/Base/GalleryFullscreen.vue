<script setup lang="ts">
import type { Image } from "~/data/interfaces";

const props = defineProps<{
  images: Image[];
  currentImage: number;
}>();

const emit = defineEmits<{ closeModal: [] }>();

const { locale } = useI18n();
const currentImageIndex = ref(props.currentImage);
const modalRef = ref<HTMLElement | null>(null);
const thumbRefs = ref<HTMLElement[]>([]);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + props.images.length) % props.images.length;
};

watch(
  () => props.currentImage,
  (val) => (currentImageIndex.value = val),
);

watch(currentImageIndex, (i) => {
  const el = thumbRefs.value[i];
  el?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
});

const closeModal = () => emit("closeModal");

const selectImage = (index: number) => {
  currentImageIndex.value = index;
};

onMounted(() => {
  modalRef.value?.focus();
  document.body.style.overflow = "hidden";

  nextTick(() => {
    thumbRefs.value[currentImageIndex.value]?.scrollIntoView({
      behavior: "auto",
      inline: "center",
      block: "nearest",
    });
  });
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      ref="modalRef"
      tabindex="0"
      class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center select-none"
      @keydown.prevent.stop.esc="closeModal"
      @click.self="closeModal"
    >
      <div
        class="flex flex-col overflow-hidden justify-between max-w-default w-full max-h-250 h-full bg-white rounded-md"
      >
        <div class="flex justify-between bg-stone-300 py-2 px-4">
          <div class="text-lg font-semibold">{{ currentImageIndex + 1 }} / {{ images.length }}</div>

          <div class="text-lg font-semibold">{{ images[currentImageIndex]?.name }}</div>

          <button
            @click="closeModal"
            class="hover:text-red-600 transition-all hover:cursor-pointer hover:scale-125"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-4 relative">
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
              @contextmenu.prevent
              :key="currentImageIndex"
              :src="images[currentImageIndex]?.url"
              :alt="
                locale === 'lt' ? images[currentImageIndex]?.alt : images[currentImageIndex]?.altEN
              "
              class="max-h-196 w-full h-full object-contain rounded"
            />
          </Transition>
          <button
            @click="prevImage"
            class="text-black transition-all hover:scale-125 hover:cursor-pointer p-1 absolute top-1/2 left-6 -translate-y-1/2 rounded-full bg-white/60"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            @click="nextImage"
            class="text-black transition-all hover:scale-125 hover:cursor-pointer p-1 absolute top-1/2 right-6 -translate-y-1/2 rounded-full bg-white/70"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div></div>
        </div>

        <div
          class="flex overflow-hidden mx-4 mb-4 max-w-[calc(theme(maxWidth.default)-20px)] rounded-lg"
        >
          <div @contextmenu.prevent class="flex gap-2 scroll-smooth">
            <button
              v-for="(image, index) in images"
              :key="`thumb-${index}`"
              :ref="(el) => (thumbRefs[index] = el as HTMLElement)"
              @click="selectImage(index)"
              :class="[
                'shrink-0 rounded-md overflow-hidden transition-all duration-200 border-3 hover:cursor-pointer',
                index === currentImageIndex
                  ? 'border-black-600'
                  : 'hover:scale-105 border-transparent',
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
      </div>
    </div>
  </Teleport>
</template>
