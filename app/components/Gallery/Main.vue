<script setup lang="ts">
const images = [
  "/images/tvoros/tvora1.jpg",
  "/images/tvoros/tvora2.jpg",
  "/images/tvoros/tvora3.jpg",
  "/images/tvoros/tvora4.jpg",
  "/images/tvoros/tvora5.jpg",
  "/images/tvoros/tvora7.jpg",
  "/images/tvoros/tvora8.jpg",
  "/images/tvoros/tvora9.jpg",
  "/images/tvoros/tvora10.jpg",
  "/images/tvoros/tvora11.jpg",
  "/images/tvoros/tvora12.jpg",
  "/images/tvoros/tvora13.jpg",
  "/images/tvoros/tvora14.jpg",
  "/images/tvoros/tvora15.jpg",
  "/images/tvoros/tvora16.jpg",
  "/images/tvoros/tvora17.jpg",
  "/images/tvoros/tvora18.jpg",
  "/images/tvoros/tvora20.jpg",
  "/images/tvoros/tvora21.jpg",
  "/images/tvoros/tvora22.jpg",
  "/images/tvoros/daimond6090.jpg",
  "/images/tvoros/daimond40105.jpg",
  "/images/tvoros/daimond60140.jpg",
  "/images/tvoros/daimondvertical.jpg",
  "/images/tvoros/dilė.jpg",
  "/images/tvoros/eglė.jpg",
  "/images/tvoros/eglėplus.jpg",
  "/images/tvoros/kaip-issirinkti-tvora.jpg",
  "/images/tvoros/plank.jpg",
  "/images/zaliuzes/blinds.jpg",
  "/images/zaliuzes/blinds2.jpg",
];

const modalOpen = ref(false);
const currentImageIndex = ref(0);

const openModal = (index: number) => {
  currentImageIndex.value = index;
  modalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = "";
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length;
};

const selectImage = (index: number) => {
  currentImageIndex.value = index;
};

const getThumbnailOffset = () => {
  const thumbnailWidth = 88;
  const centerOffset = Math.floor(1200 / thumbnailWidth / 2) * thumbnailWidth;
  return currentImageIndex.value * thumbnailWidth - centerOffset;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!modalOpen.value) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div
    class="gallery-grid max-w-default w-full m-auto pb-28 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 grid-flow-dense"
  >
    <NuxtImg
      v-for="(image, index) in images"
      :key="image"
      :src="image"
      :alt="image"
      class="gallery-item hover:scale-105 hover:cursor-pointer w-full h-50 object-cover rounded transition-transform duration-300 nth-[3n]:row-span-2 nth-[3n]:h-104 nth-[7n]:col-span-2 nth-[7n]:row-span-2 nth-[7n]:h-104"
      @click="openModal(index)"
    />
  </div>

  <Teleport v-if="modalOpen" to="body">
    <div class="fixed inset-0 z-50 flex flex-col bg-black p-4 pb-10">
      <div class="flex justify-between">
        <div class="text-white text-lg font-semibold">
          {{ currentImageIndex + 1 }} / {{ images.length }}
        </div>
        <button
          @click="closeModal"
          class="text-white hover:text-red-600 transition-colors hover:cursor-pointer"
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

      <div class="flex gap-8 items-center justify-between h-full">
        <button
          @click="prevImage"
          class="text-white hover:text-red-600 transition-all hover:scale-110 rounded-full border p-2 hover:cursor-pointer"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

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
            :src="images[currentImageIndex]"
            :alt="`Image ${currentImageIndex + 1}`"
            class="max-w-[80vw] max-h-[70vh] w-full h-full object-contain rounded-lg"
          />
        </Transition>

        <button
          @click="nextImage"
          class="text-white hover:text-red-600 transition-all hover:scale-110 border rounded-full p-2 hover:cursor-pointer"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        class="max-w-default w-full h-40 m-auto rounded overflow-hidden flex items-center justify-center"
      >
        <div
          class="flex gap-2 transition-transform duration-300 ease-in-out"
          :style="`transform: translateX(-${getThumbnailOffset()}px)`"
        >
          <button
            v-for="(image, index) in [...images, ...images]"
            :key="`thumb-${index}`"
            @click="selectImage(index % images.length)"
            :class="[
              'shrink-0 rounded-md overflow-hidden transition-all duration-200  hover:cursor-pointer',
              index % images.length === currentImageIndex
                ? 'border-red-600 border-2  hover:scale-110'
                : '  hover:scale-110',
            ]"
          >
            <NuxtImg
              :src="image"
              :alt="`Thumbnail ${(index % images.length) + 1}`"
              class="w-20 h-20 object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
