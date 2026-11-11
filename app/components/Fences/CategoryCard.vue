<script setup lang="ts">
// Tvorų kategorijos kortelė: nuotrauka, pavadinimas, trumpas aprašymas ir (jei yra) modelių sąrašas
defineProps<{
  title: string;
  to: string;
  image: string;
  text?: string;
  models?: string[];
}>();
</script>

<template>
  <NuxtLink :to="to" class="group flex flex-col gap-4">
    <div class="overflow-hidden rounded-lg bg-gray-100">
      <NuxtImg
        :src="image"
        :alt="title"
        sizes="sm:100vw md:50vw lg:600px"
        loading="lazy"
        class="w-full aspect-3/2 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div class="flex items-center justify-between gap-4">
      <h3
        class="font-medium group-hover:text-red-main transition-colors"
        :class="text ? 'text-3xl' : 'text-xl'"
      >
        {{ title }}
      </h3>
      <span
        class="w-10 h-10 shrink-0 flex items-center justify-center border-2 border-red-main text-red-main transition-colors duration-100 group-hover:bg-red-main group-hover:text-white"
        aria-hidden="true"
      >
        <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>
    <p v-if="text" class="text-justify">{{ text }}</p>
    <p v-if="models?.length" class="text-sm text-gray-600">
      <span class="font-semibold text-black">{{ $t("fences.models") }}:</span>
      {{ models.join(" · ") }}
    </p>
  </NuxtLink>
</template>
