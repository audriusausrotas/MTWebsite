<script setup lang="ts">
const images = [
  { url: "/images/tvoros/tvora1.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora2.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora3.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora4.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora5.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora7.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora8.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora9.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora10.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora11.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora12.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora13.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora14.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora15.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora16.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora17.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora18.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora20.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora21.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/tvora22.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/daimond6090.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/daimond40105.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/daimond60140.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/daimondvertical.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/dilė.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/eglė.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/eglėplus.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/kaip-issirinkti-tvora.jpg", alt: "", altEN: "" },
  { url: "/images/tvoros/plank.jpg", alt: "", altEN: "" },
  { url: "/images/zaliuzes/blinds.jpg", alt: "", altEN: "" },
  { url: "/images/zaliuzes/blinds2.jpg", alt: "", altEN: "" },
];

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
