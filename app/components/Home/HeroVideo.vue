<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="relative">
    <!-- aukštis – 900px, bet ne daugiau nei ekranas (telefone hero neužima daugiau nei vieno ekrano) -->
    <BaseVideo :height="900" />
    <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/20"></div>
    <div class="absolute inset-0 flex items-end">
      <div class="max-w-default w-full mx-auto px-4 pb-14 md:pb-28 flex flex-col gap-6 text-white">
        <h1 class="text-4xl md:text-5xl md:leading-tight font-medium tracking-wide max-w-160">
          {{ $t("home.title") }}
        </h1>
        <p class="text-lg max-w-140">{{ $t("home.subtitle") }}</p>
        <div class="flex flex-wrap gap-4 pt-2">
          <NuxtLink
            :to="localePath('/kontaktai')"
            class="h-12 px-6 flex items-center border-2 border-red-main bg-red-main font-bold transition-colors hover:bg-white hover:border-white hover:text-red-main"
          >
            {{ $t("fences.cta.button") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/tvoros')"
            class="h-12 px-6 flex items-center border-2 border-white font-bold transition-colors hover:bg-white hover:text-black"
          >
            {{ $t("home.viewFences") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
