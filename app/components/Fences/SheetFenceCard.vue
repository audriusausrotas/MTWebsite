<script setup lang="ts">
import type { Fence } from "~/data/interfaces";

const props = defineProps<{ fence: Fence }>();
</script>

<template>
  <div v-if="fence?.aditional?.show">
    <p>{{ fence?.name }}</p>
    <div class="flex">
      <NuxtImg
        v-for="image in fence?.aditional?.images"
        :key="image.url"
        :src="image.url"
        :alt="image.alt"
        class="max-w-100 max-h-80"
      />
    </div>
  </div>
</template>

<style scoped></style>
