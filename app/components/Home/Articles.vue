<script setup lang="ts">
import type { ArticleListItem } from "#shared/types/website";

// Trys parinkti straipsniai pradžios puslapyje (adresai abiem kalbomis skirtingi).
// Jei kurio nors straipsnio nebėra – jis tiesiog nerodomas; jei nėra nė vieno – nerodoma visa skiltis.
const SLUGS: Record<string, string[]> = {
  lt: [
    "tvoros-kaina-kiek-kainuoja-tvora",
    "skardines-tvoros-tvoru-tipai-jusu-sklypui",
    "kaip-issirinkti-idealia-tvora-pagal-jusu-sklypo-reljefa",
  ],
  en: [
    "fence-price-how-much-does-a-fence-cost",
    "steel-fences-types-for-your-plot",
    "how-to-choose-perfect-fence-according-to-your-plot-terrain",
  ],
};

const { locale } = useI18n();
const localePath = useLocalePath();

const slugOf = (path: string) => path.split("/").pop() ?? "";

// transform: į puslapio duomenis patenka tik trijų straipsnių pavadinimai ir nuotraukos (be ištraukų)
const { data: articles } = await useFetch("/api/articles", {
  key: `home-articles-${locale.value}`,
  query: { locale },
  default: () => [] as { title: string; slug: string; image?: string }[],
  transform: (list: ArticleListItem[]) => {
    const slugs = SLUGS[locale.value] ?? [];
    return slugs
      .map((slug) => list.find((item) => slugOf(item.path) === slug))
      .filter((item): item is ArticleListItem => Boolean(item))
      .map((item) => ({ title: item.title, slug: slugOf(item.path), image: item.image }));
  },
});
</script>

<template>
  <section v-if="articles.length" class="flex flex-col gap-10 max-w-default w-full px-4 m-auto">
    <div class="flex sm:justify-between justify-center flex-wrap gap-8 items-center">
      <h2 class="text-4xl font-medium">{{ $t("menu.straipsniai") }}</h2>
      <BaseArrowButton
        :name="$t('home.seeMore')"
        :to="localePath('/straipsniai')"
        custom-text="hidden sm:block"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <NuxtLink
        v-for="article in articles"
        :key="article.slug"
        :to="localePath({ name: 'straipsniai-slug', params: { slug: article.slug } })"
        class="group flex flex-col gap-4"
      >
        <div class="overflow-hidden rounded-lg bg-gray-100">
          <NuxtImg
            v-if="article.image"
            :src="article.image"
            alt=""
            sizes="sm:100vw md:33vw lg:400px"
            loading="lazy"
            class="w-full aspect-3/2 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 class="text-xl font-medium group-hover:text-red-main transition-colors">
          {{ article.title }}
        </h3>
      </NuxtLink>
    </div>
  </section>
</template>
