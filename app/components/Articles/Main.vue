<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { ref, computed } from "vue";

const localePath = useLocalePath();
const { locale } = useI18n();

// Paths & collections
const path = computed(() => (locale.value === "lt" ? "/straipsniai" : "/articles"));
const collection = computed(() => ("content_" + locale.value) as keyof Collections);

// Safe slug generator
const getSlug = (item: any) => item?.path?.split("/").pop() ?? "";

// Fetch sidebar navigation
const { data: section } = await useAsyncData(
  "straipsniai-nav",
  async () => {
    const nav = await queryCollectionNavigation(collection.value);
    return nav.find((item) => item.path === path.value) || null;
  },
  { watch: [locale] },
);

// Fetch all articles
const { data: articles } = await useAsyncData(
  "straipsniai-list",
  async () => {
    const docs = await queryCollection(collection.value).all();
    return docs
      .filter((doc) => doc.path.startsWith(path.value + "/"))
      .map((doc) => ({
        title: doc.title,
        path: doc.path,
        excerpt: doc.excerpt,
        image: doc.image,
      }));
  },
  { watch: [locale] },
);

// Pagination
const perPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil((articles.value?.length ?? 0) / perPage));

const pagedArticles = computed(() => {
  if (!articles.value) return [];
  const start = (currentPage.value - 1) * perPage;
  return articles.value.slice(start, start + perPage).filter((i) => i?.path);
});

// Sidebar valid children
const validChildren = computed(() => section.value?.children?.filter((i) => i?.path) || []);

// Pagination functions
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>

<template>
  <div class="flex max-w-default w-full m-auto gap-10 py-10">
    <!-- Main articles -->
    <div class="flex-4 flex flex-col gap-8">
      <div
        v-for="item in pagedArticles"
        :key="item.path"
        class="flex flex-col gap-10 bg-white p-8 rounded-lg shadow-xl"
      >
        <NuxtImg v-if="item.image" :src="item.image" class="w-full rounded" />
        <ContentRenderer
          v-if="item.excerpt"
          :value="item.excerpt"
          :excerpt="true"
          class="prose text-justify"
        />
        <NuxtLink
          v-if="item.path"
          :to="localePath({ name: 'straipsniai-slug', params: { slug: getSlug(item) } })"
          class="font-bold text-red-600 mt-2 inline-block"
        >
          Skaityti daugiau >>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center gap-4 mt-6" v-if="articles && articles.length > perPage">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Ankstesnis
        </button>
        <span class="px-4 py-2">Puslapis {{ currentPage }} iš {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Kitas
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="flex flex-col flex-2 gap-4">
      <h1 class="font-semibold text-2xl text-center">Straipsniai</h1>
      <div v-for="item in validChildren" :key="item.path" class="border-b p-2">
        <NuxtLink
          :to="localePath({ name: 'straipsniai-slug', params: { slug: getSlug(item) } })"
          class="block hover:text-red-600"
        >
          <h2 class="text-lg font-medium">{{ item.title }}</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :where(h1) {
  font-weight: 600;
  font-size: 2rem;
}
</style>
