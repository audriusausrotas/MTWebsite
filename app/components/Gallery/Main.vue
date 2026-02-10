<script setup lang="ts">
const { images } = useGallery();

const modalOpen = ref<boolean>(false);
const currentImage = ref<number>(0);

const openModal = (index: number) => {
  currentImage.value = index;
  modalOpen.value = true;
};
</script>

<template>
  <div
    class="gallery-grid max-w-default w-full m-auto pb-28 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 grid-flow-dense"
  >
    <NuxtImg
      v-for="(image, index) in images"
      :key="image.url"
      :src="image.url"
      :alt="image.alt"
      class="gallery-item hover:scale-105 hover:cursor-pointer w-full h-50 object-cover rounded transition-transform duration-300 nth-[3n]:row-span-2 nth-[3n]:h-104 nth-[7n]:col-span-2 nth-[7n]:row-span-2 nth-[7n]:h-104"
      @click="openModal(index)"
    />
  </div>

  <BaseGalleryFullscreen
    v-if="modalOpen"
    :images="images"
    :currentImage="currentImage"
    @closeModal="modalOpen = false"
  />
</template>

<style scoped></style>
