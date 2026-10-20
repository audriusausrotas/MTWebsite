<script setup lang="ts">
import { absoluteUrl } from "#shared/site";

const localePath = useLocalePath();
const { locale } = useI18n();
const route = useRoute();

definePageMeta({
  breadcrumb: "straipsniai",
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
  <BaseWrapper own-heading>
    <div
      v-if="page"
      class="flex flex-col gap-8 md:gap-16 max-w-default w-full p-4 md:p-24 m-auto bg-white rounded-lg shadow-2xl"
    >
      <article>
        <NuxtImg
          v-if="page.image"
          :src="page.image"
          :alt="page.title"
          sizes="sm:100vw md:100vw lg:1000px"
          class="rounded-md w-full max-h-168 object-cover object-center"
        />
        <ContentRenderer
          :value="page"
          class="prose prose-lg px-4 max-w-default w-full m-auto mt-14"
        />
      </article>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-4 justify-between flex-1 px-4">
          <h2 class="font-semibold text-xl text-center md:text-left">
            {{ $t("articles.article.title") }}
          </h2>
          <p class="text-justify leading-8">{{ $t("articles.article.text") }}</p>
          <BaseButton :to="localePath('/kontaktai')" width="w-full md:w-48">{{
            $t("articles.article.button-text")
          }}</BaseButton>
        </div>
        <NuxtImg
          src="/images/tvoros/tvora5.jpg"
          alt=""
          sizes="sm:100vw md:600px"
          loading="lazy"
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
