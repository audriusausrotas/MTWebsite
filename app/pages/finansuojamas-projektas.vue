<script setup lang="ts">
definePageMeta({
  breadcrumb: "finansuojamas-projektas",
});

useSeo("finansuojamas-projektas");

await loadSiteData("funded");

const { funded } = useFunded();
const { locale } = useI18n();
</script>

<template>
  <BaseWrapper>
    <div class="max-w-200 w-full m-auto flex flex-col gap-20">
      <NuxtImg
        v-for="item in funded"
        :key="item.url"
        :src="item.url.trim()"
        :alt="(locale === 'en' ? item.altEN : item.alt) || item.name"
        sizes="sm:100vw md:800px"
        class="w-full shadow-2xl rounded-lg"
      />
    </div>
  </BaseWrapper>
</template>

<style scoped></style>
