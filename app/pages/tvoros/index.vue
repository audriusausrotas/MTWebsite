<script setup lang="ts">
definePageMeta({
  breadcrumb: "tvoros",
});
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('menu.tvoros')" />
    <div class="flex gap-10 max-w-default w-full flex-wrap m-auto justify-center pb-20">
      <NuxtLinkLocale
        to="/tvoros/skardines-tvoros"
        class="bg-[url('/images/tvoros/daimond6090.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
      >
        {{ $t("menu.skardines-tvoros") }}
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/tvoros/metalines-tvoros"
        class="bg-[url('/images/tvoros/metalines-tvoros.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.metalines-tvoros") }}</NuxtLinkLocale
      >
      <NuxtLinkLocale
        to="/tvoros/tvoralentes"
        class="bg-[url('/images/tvoros/dilė.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.tvoralentes") }}</NuxtLinkLocale
      >
      <NuxtLinkLocale
        to="/tvoros/segmentines-tvoros"
        class="bg-[url('/images/tvoros/tvora22.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.segmentines-tvoros") }}</NuxtLinkLocale
      >
    </div>

    <div></div>
  </div>
</template>

<style scoped></style>
