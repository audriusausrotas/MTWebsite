<script setup lang="ts">
interface Props {
  title?: string;
  url?: string;
  to?: string;
}

// Nuotrauka per NuxtImg (sumažinta pagal ekraną), o ne CSS fonas – išvaizda ta pati
const props = defineProps<Props>();
</script>

<template>
  <div class="relative flex items-center justify-center h-80 overflow-hidden">
    <NuxtImg
      :src="url"
      alt=""
      sizes="sm:100vw md:50vw lg:600px"
      loading="lazy"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <BaseArrowButton class="relative" :name="title" variant="third" :to="to" />
  </div>
</template>

<style scoped></style>
