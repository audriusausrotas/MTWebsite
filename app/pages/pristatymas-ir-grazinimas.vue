<script setup lang="ts">
definePageMeta({
  breadcrumb: "pristatymas-ir-grazinimas",
});

const { locale } = useI18n();

const filePath = `/tekstai/pristatymas`;

const { data: page } = await useAsyncData(
  filePath,
  () => {
    return queryCollection(`content_${locale.value}`).path(filePath).first();
  },
  { watch: [locale], server: false },
);
</script>

<template>
  <div>
    <BaseHeroImage :name="$t('menu.pristatymas-ir-grazinimas')" />
    <ContentRenderer
      v-if="page"
      :value="page"
      class="prose prose-lg max-w-default w-full m-auto mb-12"
    />
  </div>
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
