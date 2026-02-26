<script setup lang="ts">
const props = defineProps(["name"]);
const open = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div @click="open = !open" class="font-bold text-xl flex gap-4 hover:cursor-pointer">
      <NuxtImg
        src="/icons/arrowDown.svg"
        alt="arrow-down"
        class="w-4 transition-transform duration-300"
        :class="open ? 'rotate-180' : ''"
      />
      <div>{{ name }}</div>
    </div>
    <Transition name="slide-fade" :duration="{ enter: 100, leave: 250 }">
      <div v-if="open" class="flex flex-col gap-4">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
