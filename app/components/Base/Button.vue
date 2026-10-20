<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
  // nuoroda (vidinė `to` arba išorinė / mailto `href`) – tada atvaizduojama kaip <a>
  to?: string;
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "w-48",
  height: "h-12",
});
</script>

<template>
  <NuxtLink
    v-if="to || href"
    :to="to || href"
    :external="!!href"
    class="flex gap-2 border-2 px-4 justify-center items-center border-red-main text-red-main font-bold hover:cursor-pointer hover:bg-red-100 transition-colors"
    :class="[width, height]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    class="flex gap-2 border-2 px-4 justify-center items-center border-red-main text-red-main font-bold hover:cursor-pointer hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent"
    :class="[width, height]"
  >
    <slot />
  </button>
</template>
