<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const localePath = useLocalePath();
const { locale } = useI18n();

const path = computed(() => (locale.value === "lt" ? "/straipsniai" : "/articles"));
const collection = computed(() => ("content_" + locale.value) as keyof Collections);
const getSlug = (item: any) => item.path.split("/").pop();

const { data: section } = await useAsyncData(
  "straipsniai-nav",
  async () => {
    const nav = await queryCollectionNavigation(collection.value);
    return nav.find((item) => item.path === path.value) || null;
  },
  { watch: [locale] },
);

// import type { ParsedContentv2 } from "@nuxt/content";

// const { data: articles } = await useAsyncData(
//   "straipsniai-list",
//   async () => {
//     const docs = queryCollection(collection.value).all();
//     return docs;

// return docs
//   .filter((doc) => doc.path.startsWith(path.value + "/"))
//   .map((doc) => ({
//     title: doc.title,
//     path: doc.path,
//     excerpt: doc.excerpt as ParsedContentv2,
//   }));
//   },
//   {
//     watch: [locale],
//   },
// );

// console.log(typeof articles.value[0].excerpt);
</script>

<template>
  <!-- <div v-for="item in articles" :key="item.path">
    <NuxtLink
      :to="
        localePath({
          name: 'straipsniai-slug',
          params: { slug: getSlug(item) },
        })
      "
    >
      <h2>{{ item?.title }}</h2>

      <ContentRenderer v-if="item.excerpt" :value="item.excerpt" :excerpt="true" />
    </NuxtLink>
  </div> -->

  <div class="flex max-w-default w-full m-auto gap-4 py-8">
    <div class="flex-3"></div>
    <div class="flex flex-col flex-2 gap-4">
      <h1 class="font-semibold text-2xl text-center">Straipsniai</h1>
      <div v-for="item in section?.children" :key="item.path" class="border-b p-1">
        <NuxtLink
          :to="
            localePath({
              name: 'straipsniai-slug',
              params: { slug: getSlug(item) },
            })
          "
        >
          <h2>{{ item.title }}</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
