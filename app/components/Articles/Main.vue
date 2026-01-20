<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const localePath = useLocalePath();
const { locale } = useI18n();

const path = computed(() => (locale.value === "lt" ? "/straipsniai" : "/articles"));

const collection = computed(() => ("content_" + locale.value) as keyof Collections);

const { data: section } = await useAsyncData(
  "straipsniai-nav",
  async () => {
    const nav = await queryCollectionNavigation(collection.value);
    return nav.find((item) => item.path === path.value) || null;
  },
  { watch: [locale] },
);

const getSlug = (item: any) => {
  return item.path.split("/").pop();
};
</script>

<template>
  <div class="flex flex-col max-w-default w-full m-auto gap-4 items-center">
    <h1 class="text-2xl font-semibold">Straipsniai</h1>

    <div v-for="item in section?.children" :key="item.path">
      <NuxtLink
        :to="
          localePath({
            name: 'straipsniai-slug',
            params: { slug: getSlug(item) },
          })
        "
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
