<script setup lang="ts">
interface Props {
  title?: string;
  url?: string;
  to?: string;
}

// Visa kortelė – nuoroda. Nuotrauka per NuxtImg (sumažinta pagal ekraną);
// tamsus perėjimas apačioje, kad pavadinimas būtų įskaitomas ir ant šviesių nuotraukų
const props = defineProps<Props>();
</script>

<template>
  <NuxtLink :to="to" class="group relative block h-80 overflow-hidden">
    <NuxtImg
      :src="url"
      alt=""
      sizes="sm:100vw md:50vw lg:600px"
      loading="lazy"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent"></div>
    <div class="absolute inset-x-0 bottom-0 p-6 flex items-center gap-4 text-white">
      <span
        class="w-14 h-14 shrink-0 flex items-center justify-center border-2 border-white transition-colors duration-100 group-hover:bg-red-main group-hover:border-red-main"
        aria-hidden="true"
      >
        <svg class="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="text-2xl font-semibold">{{ title }}</span>
    </div>
  </NuxtLink>
</template>
