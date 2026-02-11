<script setup lang="ts">
definePageMeta({
  breadcrumb: "privatumo-politika",
});

const { locale } = useI18n();

const filePath = `/tekstai/privatumas`;

const { data: page } = await useAsyncData(
  filePath,
  () => {
    return queryCollection(`content_${locale.value}`).path(filePath).first();
  },
  { watch: [locale], server: false },
);
</script>

<template>
  <BaseWrapper breadcrumb="privatumo-politika">
    <ContentRenderer v-if="page" :value="page" class="prose prose-lg max-w-default w-full" />
  </BaseWrapper>
</template>

<style scoped>
.prose :where(h1) {
  font-size: 2.2rem;
  font-weight: 700;
}
.prose :where(h2) {
  font-size: 2rem;
}

.prose :where(h3) {
  font-size: 1.6rem;
}

.prose :where(a) {
  pointer-events: none;
  text-decoration: none;
  font-weight: 600;
}
</style>
