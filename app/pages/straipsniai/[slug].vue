<script setup lang="ts">
import { absoluteUrl } from "#shared/site";
import type { ArticleListItem } from "#shared/types/website";

const localePath = useLocalePath();
const { locale } = useI18n();
const route = useRoute();

definePageMeta({
  breadcrumb: "straipsniai",
  hero: "/images/tvoros/eglėplus.jpg",
  slug: true,
  article: true,
});

// /en/articles/x -> /articles/x (content kelias be kalbos priešdėlio).
// Adresas gali ateiti koduotas (pvz. lietuviškos raidės), content keliai – ne.
const decodePath = (path: string) => {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
};
const contentPath = computed(() => decodePath(route.path).replace(/^\/en(?=\/)/, ""));

// Straipsnis per serverio API (naršyklei nereikia content duomenų bazės)
const { data, error } = await useFetch<{ doc: any }>("/api/content", {
  key: `article-${locale.value}-${contentPath.value}`,
  query: { locale: locale.value, path: contentPath.value },
});

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const page = computed(() => data.value!.doc);

useBreadcrumbTitle().value = page.value.title;

// Abiejų kalbų adresai (hreflang ir kalbos keitimui); be vertimo – tik dabartinė kalba
const otherLocale = locale.value === "en" ? "lt" : "en";
useArticleAlternates().value = {
  [locale.value]: articleSitePath(page.value.path),
  ...(page.value.translation ? { [otherLocale]: articleSitePath(page.value.translation) } : {}),
};

const title = computed(() => page.value.seoTitle || page.value.title);
const description = computed(() => page.value.seoDescription || page.value.description);
const image = computed(() => (page.value.image ? absoluteUrl(page.value.image) : undefined));

// „Kiti straipsniai“: trys sąraše einantys po šio (sąrašo gale – nuo pradžios).
// transform: į puslapio duomenis patenka tik šie trys, ne visas sąrašas
const currentPath = page.value.path as string;
const { data: related } = await useFetch("/api/articles", {
  key: `related-${locale.value}-${currentPath}`,
  query: { locale },
  default: () => [] as ArticleListItem[],
  transform: (list: ArticleListItem[]) => {
    const index = list.findIndex((item) => item.path === currentPath);
    const others = [...list.slice(index + 1), ...list.slice(0, Math.max(index, 0))];
    return others.filter((item) => item.path !== currentPath).slice(0, 3);
  },
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "article",
  ...(image.value ? { ogImage: image.value } : {}),
});

useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.value.title,
        description: description.value,
        image: image.value,
        datePublished: page.value.date,
        inLanguage: locale.value,
        mainEntityOfPage: absoluteUrl(route.path),
        publisher: { "@type": "Organization", name: "Moderni Tvora" },
      }),
    },
  ],
}));
</script>

<template>
  <!-- straipsnio pavadinimas – hero juostoje (h1), todėl tekste jis praleidžiamas -->
  <BaseWrapper :title="page.title" small-title customStyles="gap-20">
    <article v-if="page" class="flex flex-col gap-8 max-w-220 w-full m-auto">
      <NuxtImg
        v-if="page.image"
        :src="page.image"
        :alt="page.title"
        sizes="sm:100vw md:100vw lg:900px"
        class="rounded-lg w-full max-h-130 object-cover object-center"
      />
      <ContentRenderer
        :value="page"
        :components="withoutTitle"
        class="prose prose-lg max-w-190 w-full m-auto"
      />
    </article>

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-220 w-full m-auto bg-gray-100 rounded-lg overflow-hidden"
    >
      <div class="flex flex-col gap-4 justify-center p-8">
        <h2 class="font-medium text-2xl">
          {{ $t("articles.article.title") }}
        </h2>
        <p>{{ $t("articles.article.text") }}</p>
        <BaseButton :to="localePath('/kontaktai')" width="w-full md:w-48" class="bg-white">{{
          $t("articles.article.button-text")
        }}</BaseButton>
      </div>
      <NuxtImg
        src="/images/tvoros/tvora5.jpg"
        alt=""
        sizes="sm:100vw md:600px"
        loading="lazy"
        class="w-full h-full max-h-80 md:max-h-none object-cover"
      />
    </div>

    <section v-if="related.length" class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("articles.related") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticlesCard v-for="item in related" :key="item.path" :article="item" tag="h3" />
      </div>
    </section>
  </BaseWrapper>
</template>

<style>
@media (max-width: 600px) {
  .prose :where(h2) {
    font-size: 1.4rem;
  }

  .prose :where(h3) {
    font-size: 1.2rem;
  }
}

@media (min-width: 600px) {
  .prose :where(h2) {
    font-size: 1.8rem;
  }

  .prose :where(h3) {
    font-size: 1.3rem;
  }
}

.prose :where(a) {
  color: var(--color-red-main);
  font-weight: 600;
}

/* antraščių inkarų nuorodos atrodo kaip įprastos antraštės */
.prose :where(h1, h2, h3, h4) a {
  color: inherit;
  font-weight: inherit;
  text-decoration: none;
}
</style>
