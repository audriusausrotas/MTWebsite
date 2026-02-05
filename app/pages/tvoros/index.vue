<script setup lang="ts">
definePageMeta({
  breadcrumb: "tvoros",
});
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('breadcrumbs.tvoros')" />
    <div class="flex gap-4 max-w-default w-full m-auto justify-evenly pb-20">
      <NuxtLinkLocale
        to="/tvoros/skardines-tvoros"
        class="bg-[url('/images/tvoros/daimond6090.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
      >
        {{ $t("menu.skardines") }}
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/tvoros/metalines-tvoros"
        class="bg-[url('/images/tvoros/metalines-tvoros.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.metalines") }}</NuxtLinkLocale
      >
      <NuxtLinkLocale
        to="/tvoros/tvoralentes"
        class="bg-[url('/images/tvoros/dilė.jpg')] max-w-120 w-full h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
        >{{ $t("menu.tvoralentes") }}</NuxtLinkLocale
      >
    </div>

    <div></div>
  </div>
</template>

<style scoped></style>
