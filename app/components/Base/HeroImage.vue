<script setup lang="ts">
interface Props {
  url?: string;
  name?: string;
}
const props = withDefaults(defineProps<Props>(), {
  url: "/images/hero1.jpeg",
  name: "",
});
</script>

<template>
  <div>
    <div class="relative w-full h-80">
      <NuxtImg :src="url" class="w-full h-full object-cover" />

      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative max-w-default w-full m-auto">
        <h1 class="absolute -top-24 left-4 text-4xl font-medium text-white tracking-wide">
          {{ name }}
        </h1>
      </div>
    </div>
    <BaseBreadcrumbs />
  </div>
</template>

<style scoped></style>
