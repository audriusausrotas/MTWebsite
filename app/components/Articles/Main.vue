<script setup lang="ts">
import type { ArticleListItem } from "#shared/types/website";

const { locale } = useI18n();
const route = useRoute();

// Sąrašas per serverio API (naršyklei nereikia content duomenų bazės)
const { data: articles } = await useFetch<ArticleListItem[]>("/api/articles", {
  key: `articles-${locale.value}`,
  query: { locale },
  default: () => [],
});

const perPage = 9;
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
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  await navigateTo({ query: { ...route.query, page: page > 1 ? page : undefined } });
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ArticlesCard v-for="item in pagedArticles" :key="item.path" :article="item" />
    </div>

    <!-- Puslapiavimas -->
    <nav
      v-if="totalPages > 1"
      :aria-label="$t('articles.pagination.articles')"
      class="flex flex-wrap justify-center items-center gap-2"
    >
      <button
        type="button"
        :disabled="currentPage === 1"
        :aria-label="$t('articles.pagination.previous')"
        class="w-12 h-12 flex items-center justify-center border-2 border-red-main text-red-main transition-colors hover:cursor-pointer hover:bg-red-main hover:text-white disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-red-main"
        @click="goToPage(currentPage - 1)"
      >
        <svg class="w-6 h-6 fill-none stroke-current stroke-2 rotate-180" viewBox="0 0 24 24">
          <path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        :aria-label="`${$t('articles.pagination.page')} ${page}`"
        :aria-current="page === currentPage ? 'page' : undefined"
        class="w-12 h-12 flex items-center justify-center border-2 font-bold transition-colors hover:cursor-pointer"
        :class="
          page === currentPage
            ? 'border-red-main bg-red-main text-white'
            : 'border-gray-200 hover:border-red-main hover:text-red-main'
        "
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        type="button"
        :disabled="currentPage === totalPages"
        :aria-label="$t('articles.pagination.next')"
        class="w-12 h-12 flex items-center justify-center border-2 border-red-main text-red-main transition-colors hover:cursor-pointer hover:bg-red-main hover:text-white disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-red-main"
        @click="goToPage(currentPage + 1)"
      >
        <svg class="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </nav>
  </div>
</template>
