<script setup lang="ts">
interface Props {
  url?: string;
  name?: string;
  heading?: boolean;
  breadcrumbs?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  url: "/images/hero1.jpg",
  name: "",
  heading: true,
  breadcrumbs: true,
});
</script>

<template>
  <div>
    <div class="relative w-full h-80">
      <NuxtImg
        :src="url"
        alt=""
        sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        class="w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative max-w-default w-full m-auto">
        <component
          :is="heading ? 'h1' : 'p'"
          class="absolute -top-24 left-4 text-4xl font-medium text-white tracking-wide"
        >
          {{ name }}
        </component>
      </div>
    </div>
    <BaseBreadcrumbs v-if="breadcrumbs" />
    <div v-else class="h-20"></div>
  </div>
</template>
