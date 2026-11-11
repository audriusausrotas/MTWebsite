<script setup lang="ts">
definePageMeta({
  breadcrumb: "parduotuve",
  // dar neužbaigtas – neindeksuojamas ir neįtrauktas į sitemap
  noindex: true,
});

useSeo("parduotuve");

const localePath = useLocalePath();
</script>

<template>
  <BaseWrapper>
    <div class="flex flex-col items-center text-center gap-8 max-w-150 w-full m-auto py-10">
      <h2 class="text-4xl font-medium">{{ $t("shop.title") }}</h2>
      <p>{{ $t("shop.text") }}</p>
      <div class="flex flex-col sm:flex-row gap-8">
        <BaseArrowButton :name="$t('menu.tvoros')" :to="localePath('/tvoros')" />
        <BaseArrowButton :name="$t('menu.kontaktai')" :to="localePath('/kontaktai')" />
      </div>
    </div>
  </BaseWrapper>
</template>

<style scoped></style>
