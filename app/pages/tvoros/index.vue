<script setup lang="ts">
definePageMeta({
  breadcrumb: "tvoros",
});
</script>

<template>
  <BaseWrapper breadcrumb="tvoros">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLinkLocale
        to="/tvoros/skardines-tvoros"
        class="bg-[url('/images/tvoros/daimond6090.jpg')] w-full aspect-4/3 bg-cover bg-center text-center m-auto text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg flex items-center justify-center"
      >
        {{ $t("menu.skardines-tvoros") }}
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/tvoros/metalines-tvoros"
        class="bg-[url('/images/tvoros/metalines-tvoros.jpg')] w-full aspect-4/3 bg-cover bg-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg flex items-center justify-center"
        >{{ $t("menu.metalines-tvoros") }}</NuxtLinkLocale
      >
      <NuxtLinkLocale
        to="/tvoros/tvoralentes"
        class="bg-[url('/images/tvoros/dilė.jpg')] w-full aspect-4/3 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.tvoralentes") }}</NuxtLinkLocale
      >
      <NuxtLinkLocale
        to="/tvoros/segmentines-tvoros"
        class="bg-[url('/images/tvoros/tvora22.jpg')] w-full aspect-4/3 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.segmentines-tvoros") }}</NuxtLinkLocale
      >
    </div>

    <div></div>
  </BaseWrapper>
</template>

<style scoped></style>
