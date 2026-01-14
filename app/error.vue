<script setup lang="ts">
interface NuxtError {
  status: number;
  fatal: boolean;
  unhandled: boolean;
  statusText?: string;
  data?: unknown;
  cause?: unknown;
  statusCode: number;
  statusMessage?: string;
}

const props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="error.statusMessage"
      class="fixed top-0 left-0 z-50 flex justify-center w-full pointer-events-none"
      :class="error.statusMessage ? 'animation' : ''"
    >
      <div
        class="flex items-center justify-center px-8 py-4 text-xl font-medium text-center text-white capitalize w-72 min-h-20 rounded-b-3xl bg-red-full"
      >
        {{ error.statusMessage }}
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.animation {
  animation: slide 1s;
}

@keyframes slide {
  0% {
    transform: translateY(-100%);
  }
  10% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
