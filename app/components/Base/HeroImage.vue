<script setup lang="ts">
interface Props {
  url?: string;
  name?: string;
  heading?: boolean;
  breadcrumbs?: boolean;
  // ilgas pavadinimas (pvz. straipsnio) – mažesnis šriftas
  small?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  url: "/images/hero1.jpg",
  name: "",
  heading: true,
  breadcrumbs: true,
  small: false,
});
</script>

<template>
  <div>
    <!-- pavadinimas prispaustas prie apačios: ilgas pavadinimas auga į viršų, o ne išlenda iš juostos -->
    <div class="relative w-full min-h-56 flex items-end overflow-hidden">
      <NuxtImg
        :src="url"
        alt=""
        sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- užtamsinimas: apačioje – pavadinimui, viršuje – meniu; per vidurį nuotrauka lieka šviesi -->
      <div class="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-black/35"></div>
      <div class="relative max-w-default w-full mx-auto px-4 pt-28 pb-8">
        <component
          :is="heading ? 'h1' : 'p'"
          class="font-medium text-white tracking-wide text-balance max-w-220"
          :class="small ? 'text-2xl sm:text-3xl md:text-4xl md:leading-tight' : 'text-4xl md:text-5xl'"
        >
          {{ name }}
        </component>
      </div>
    </div>
    <BaseBreadcrumbs v-if="breadcrumbs" />
    <div v-else class="h-20"></div>
  </div>
</template>
