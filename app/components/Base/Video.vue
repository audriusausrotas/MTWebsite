<script setup lang="ts">
interface Props {
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 440,
});
</script>

<template>
  <div :style="{ height: height + 'px' }">
    <video
      src="/video/MTLOOP3.mp4"
      type="video/mp4"
      autoplay
      muted
      loop
      class="h-full w-full object-cover"
    ></video>
  </div>
</template>

<style scoped></style>
