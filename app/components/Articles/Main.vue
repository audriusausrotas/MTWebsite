<script setup lang="ts">
import type { ArticleListItem } from "#shared/types/website";

const localePath = useLocalePath();
const { locale } = useI18n();
const route = useRoute();

const getSlug = (path: string) => path.split("/").pop() ?? "";

// Sąrašas per serverio API (naršyklei nereikia content duomenų bazės)
const { data: articles } = await useFetch<ArticleListItem[]>("/api/articles", {
  key: `articles-${locale.value}`,
  query: { locale },
  default: () => [],
});

const perPage = 5;
const totalPages = computed(() => Math.max(1, Math.ceil(articles.value.length / perPage)));

// Puslapis laikomas adrese (?page=2) – „atgal“ grąžina į tą patį puslapį
const currentPage = computed(() => {
  const page = Number.parseInt(String(route.query.page ?? "1"), 10);
  return Number.isFinite(page) ? Math.min(Math.max(page, 1), totalPages.value) : 1;
});

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return articles.value.slice(start, start + perPage);
});

const goToPage = async (page: number) => {
  await navigateTo({ query: { ...route.query, page: page > 1 ? page : undefined } });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const nextPage = () => currentPage.value < totalPages.value && goToPage(currentPage.value + 1);
const prevPage = () => currentPage.value > 1 && goToPage(currentPage.value - 1);
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="flex flex-col gap-8 col-span-2">
      <div
        v-for="item in pagedArticles"
        :key="item.path"
        class="flex flex-col gap-4 p-8 rounded-lg shadow-xl bg-white"
      >
        <NuxtImg
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          sizes="sm:100vw md:100vw lg:800px"
          class="w-full rounded max-h-134 object-cover object-center"
        />
        <ContentRenderer
          v-if="item.excerpt"
          :value="item.excerpt"
          :excerpt="true"
          :components="demotedHeadings"
          class="prose text-justify"
        />
        <NuxtLink
          :to="localePath({ name: 'straipsniai-slug', params: { slug: getSlug(item.path) } })"
          class="font-bold text-red-600 mt-2 inline-block"
        >
          {{ $t("articles.pagination.read-more") }}
        </NuxtLink>
      </div>

      <!-- Puslapiavimas -->

      <div class="flex justify-center gap-4 mt-6" v-if="articles.length > perPage">
        <BaseButton @click="prevPage" :disabled="currentPage === 1" class="bg-white">
          {{ $t("articles.pagination.previous") }}
        </BaseButton>

        <span class="px-4 py-2"
          >{{ $t("articles.pagination.page") }} {{ currentPage }} {{ $t("articles.pagination.of") }}
          {{ totalPages }}</span
        >

        <BaseButton @click="nextPage" :disabled="currentPage === totalPages" class="bg-white">
          {{ $t("articles.pagination.next") }}
        </BaseButton>
      </div>
    </div>

    <!-- Navigation -->

    <div
      class="hidden lg:flex flex-col w-full max-w-96 min-w-80 gap-6 bg-white rounded-lg shadow-xl p-6 max-h-fit"
    >
      <h2 class="font-semibold text-4xl text-center">
        {{ $t("articles.pagination.articles") }}
      </h2>
      <div v-for="item in articles" :key="item.path">
        <NuxtLink
          :to="localePath({ name: 'straipsniai-slug', params: { slug: getSlug(item.path) } })"
          class="hover:text-red-600"
        >
          <span class="font-medium">{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .prose :where(h2) {
    font-weight: 500;
    font-size: 1.4rem;
  }
}

@media (min-width: 600px) {
  .prose :where(h2) {
    font-weight: 500;
    font-size: 1.8rem;
  }
}
.prose {
  max-width: 100%;
}
.prose :where(h2) {
  text-align: left;
}
.prose :where(h2) a {
  color: inherit;
  text-decoration: none;
}
</style>
