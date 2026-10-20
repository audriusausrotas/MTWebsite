<script setup lang="ts">
// Tekstinis puslapis iš content/<kalba>/tekstai (taisyklės, privatumas, pristatymas)
const props = defineProps<{ path: string }>();

const { locale } = useI18n();

// Per serverio API (naršyklei nereikia content duomenų bazės)
const { data } = await useFetch<{ doc: any }>("/api/content", {
  key: `text-${locale.value}-${props.path}`,
  query: { locale: locale.value, path: props.path },
});
const page = computed(() => data.value?.doc);

useSeoMeta({
  title: () => page.value?.seoTitle || page.value?.title,
  description: () => page.value?.seoDescription || page.value?.description,
  ogTitle: () => page.value?.seoTitle || page.value?.title,
  ogDescription: () => page.value?.seoDescription || page.value?.description,
});
</script>

<template>
  <BaseWrapper>
    <ContentRenderer
      v-if="page"
      :value="page"
      :components="demotedHeadings"
      class="prose prose-lg max-w-default w-full"
    />
  </BaseWrapper>
</template>

<style scoped>
.prose :where(h2) {
  font-size: 2.2rem;
  font-weight: 700;
}

.prose :where(h3) {
  font-size: 2rem;
}

.prose :where(h4) {
  font-size: 1.6rem;
}

.prose :where(a) {
  color: var(--color-red-main);
  font-weight: 600;
}

/* antraščių inkarų nuorodos atrodo kaip įprastos antraštės */
.prose :where(h2, h3, h4) a {
  color: inherit;
  font-weight: inherit;
  text-decoration: none;
}
</style>
