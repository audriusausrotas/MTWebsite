<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { ref, computed } from "vue";

const localePath = useLocalePath();
const { locale } = useI18n();

const getSlug = (item: any) => item?.path?.split("/").pop() ?? "";

const path = computed(() => (locale.value === "lt" ? "/straipsniai" : "/articles"));
const collection = computed(() => ("content_" + locale.value) as keyof Collections);

const { data: section } = await useAsyncData(
  "straipsniai-nav",
  async () => {
    const nav = await queryCollectionNavigation(collection.value);
    return nav.find((item) => item.path === path.value) || null;
  },
  { watch: [locale], server: false },
);

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
  { watch: [locale], server: false },
);

const perPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil((articles.value?.length ?? 0) / perPage));

const pagedArticles = computed(() => {
  if (!articles.value) return [];
  const start = (currentPage.value - 1) * perPage;
  return articles.value.slice(start, start + perPage).filter((i) => i?.path);
});

const validChildren = computed(() => section.value?.children?.filter((i) => i?.path) || []);

const nextPage = () => {
  stollToTop();
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  stollToTop();
  if (currentPage.value > 1) currentPage.value--;
};

const stollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="bg-stone-100 w-full pb-12 h-full">
    <div class="flex max-w-default w-full m-auto gap-8">
      <div class="flex-4 flex flex-col gap-8">
        <div
          v-for="item in pagedArticles"
          :key="item.path"
          class="flex flex-col gap-4 p-8 rounded-lg shadow-xl bg-white"
        >
          <NuxtImg
            v-if="item.image"
            :src="item.image"
            class="w-full rounded max-h-134 object-cover object-center"
          />
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
            {{ $t("articles.pagination.read-more") }}
          </NuxtLink>
        </div>

        <!-- Paddington -->

        <div class="flex justify-center gap-4 mt-6" v-if="articles && articles.length > perPage">
          <BaseButton @click="prevPage" :disabled="currentPage === 1" class="bg-white">
            {{ $t("articles.pagination.previous") }}
          </BaseButton>

          <span class="px-4 py-2"
            >{{ $t("articles.pagination.page") }} {{ currentPage }}
            {{ $t("articles.pagination.of") }} {{ totalPages }}</span
          >

          <BaseButton @click="nextPage" :disabled="currentPage === totalPages" class="bg-white">
            {{ $t("articles.pagination.next") }}
          </BaseButton>
        </div>
      </div>

      <!-- Navigation -->

      <div class="flex flex-col flex-2 gap-6 bg-white rounded-lg shadow-xl p-6 max-h-fit">
        <h1 class="font-semibold text-4xl text-center">
          {{ $t("articles.pagination.articles") }}
        </h1>
        <div v-for="item in validChildren" :key="item.path" class="">
          <NuxtLink
            :to="localePath({ name: 'straipsniai-slug', params: { slug: getSlug(item) } })"
            class="hover:text-red-600"
          >
            <h2 class="font-medium">{{ item.title }}</h2>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :where(h1) {
  font-weight: 500;
  font-size: 1.8rem;
}
</style>
