<script setup lang="ts">
interface Props {
  title?: string;
  url?: string;
  to?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center justify-center bg-cover bg-center h-80"
    :style="{ backgroundImage: `url(${url})` }"
  >
    <BaseArrowButton :name="title" variant="third" :to="to" />
  </div>
</template>

<style scoped></style>
