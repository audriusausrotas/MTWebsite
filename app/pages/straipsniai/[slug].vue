<script setup lang="ts">
import type { Collections } from "@nuxt/content";
const localePath = useLocalePath();
const { locale } = useI18n();
const route = useRoute();

definePageMeta({
  breadcrumb: "straipsniai",
  slug: true,
  middleware: ["article-redirect"],
});

const slug = computed(() => {
  return route.path.replace(/^\/[a-z]{2}(?=\/)/, "");
});

const canonical = computed(() => `https://modernitvora.lt${route.path}`);

const { data: page } = await useAsyncData("page-" + slug.value, async () => {
  const collection = ("content_" + locale.value) as keyof Collections;
  const content = await queryCollection(collection).path(slug.value).first();

  return content as any;
});

useSeoMeta({
  title: () => (page.value as any)?.seoTitle || page.value?.title,
  description: () => (page.value as any)?.seoDescription || page.value?.description,
});

useHead(() => ({
  meta: [
    { property: "og:title", content: (page.value as any)?.seoTitle || page.value?.title },
    {
      property: "og:description",
      content: (page.value as any)?.seoDescription || page.value?.description,
    },
    { property: "og:image", content: (page.value as any)?.image },

    { name: "twitter:title", content: (page.value as any)?.seoTitle || page.value?.title },
    {
      name: "twitter:description",
      content: (page.value as any)?.seoDescription || page.value?.description,
    },
    { name: "twitter:image", content: (page.value as any)?.image },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    {
      rel: "canonical",
      href: canonical.value,
    },
  ],
}));
</script>

<template>
  <BaseWrapper breadcrumb="straipsniai">
    <div
      class="flex flex-col gap-8 md:gap-16 max-w-default w-full p-4 md:p-24 m-auto bg-white rounded-lg shadow-2xl"
    >
      <article>
        <NuxtImg
          :src="page?.image"
          class="rounded-md w-full max-h-168 object-cover object-center"
        />
        <ContentRenderer
          v-if="page"
          :value="page"
          class="prose prose-lg px-4 max-w-default w-full m-auto mt-14"
        />
      </article>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-4 justify-between flex-1 px-4">
          <h4 class="font-semibold text-xl text-center md:text-left">
            {{ $t("articles.article.title") }}
          </h4>
          <p class="text-justify leading-8">{{ $t("articles.article.text") }}</p>
          <BaseButton @click="navigateTo(localePath('/kontaktai'))" width="w-full md:w-48">{{
            $t("articles.article.button-text")
          }}</BaseButton>
        </div>
        <NuxtImg
          src="/images/tvoros/tvora5.jpg"
          class="rounded w-full max-h-80 h-full object-cover"
        />
      </div>
    </div>
  </BaseWrapper>
</template>

<style>
.prose :where(h1) {
  font-size: 2.2rem;
  font-weight: 700;
}

@media (max-width: 600px) {
  .prose :where(h1) {
    font-weight: 700;
    font-size: 1.6rem;
  }

  .prose :where(h2) {
    font-size: 1.4rem;
  }

  .prose :where(h3) {
    font-size: 1.2rem;
  }
}

@media (min-width: 600px) {
  .prose :where(h1) {
    font-weight: 700;
    font-size: 2.2rem;
  }

  .prose :where(h2) {
    font-size: 2rem;
  }

  .prose :where(h3) {
    font-size: 1.2rem;
  }
}

.prose :where(a) {
  pointer-events: none;
  text-decoration: none;
  font-weight: 600;
}
</style>
