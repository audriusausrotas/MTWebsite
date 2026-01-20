<script setup lang="ts">
const { locale } = useI18n();

const base = locale.value === "lt" ? "/straipsniai" : `/${locale.value}/straipsniai`;

const { data: section } = await useAsyncData(base, async () => {
  const nav = await queryCollectionNavigation("content");
  return nav.find((item) => item.path === base) || null;
});
</script>

<template>
  <div>
    <h1>Straipsniai</h1>

    <div v-for="item in section?.children" :key="item.path">
      <NuxtLink :to="item.path">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
