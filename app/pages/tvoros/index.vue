<script setup lang="ts">
definePageMeta({
  breadcrumb: "tvoros",
});

const introImage = "/images/tvoros/tvora11.jpg";

useSeo("tvoros", introImage);

// Kategorijų kortelėse rodomi modelių pavadinimai (iš MTSoft)
await loadSiteData("fences");

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { groupsOf } = useFences();

const categories = computed(() =>
  FENCE_CATEGORIES.map((item) => ({
    key: item.key,
    image: item.image,
    to: localePath(`/tvoros/${item.key}`),
    title: t(`menu.${item.key}`),
    text: t(`fences.categories.${item.key}.short`),
    models: groupsOf(item.key).map((group) => group.name),
  })),
);

const reasons = computed(() =>
  [1, 2, 3, 4].map((n) => ({
    title: t(`fences.why.w${n}.title`),
    text: t(`fences.why.w${n}.text`),
  })),
);

const steps = computed(() =>
  [1, 2, 3, 4].map((n) => ({
    title: t(`fences.steps.s${n}.title`),
    text: t(`fences.steps.s${n}.text`),
  })),
);

const faq = computed(() =>
  [1, 2, 3, 4].map((n) => ({ q: t(`fences.faq.q${n}.q`), a: t(`fences.faq.q${n}.a`) })),
);

// Straipsnių adresai abiem kalbomis skirtingi
const articles = computed(() =>
  (locale.value === "en"
    ? [
        "/en/articles/fence-price-how-much-does-a-fence-cost",
        "/en/articles/steel-fences-types-for-your-plot",
        "/en/articles/how-to-choose-perfect-fence-according-to-your-plot-terrain",
      ]
    : [
        "/straipsniai/tvoros-kaina-kiek-kainuoja-tvora",
        "/straipsniai/skardines-tvoros-tvoru-tipai-jusu-sklypui",
        "/straipsniai/kaip-issirinkti-idealia-tvora-pagal-jusu-sklypo-reljefa",
      ]
  ).map((to, index) => ({ to, title: t(`fences.articles.a${index + 1}`) })),
);

// DUK Google rezultatams (FAQPage)
useHead(() => ({
  script: [
    {
      key: "fences-faq-ld",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.value.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }),
    },
  ],
}));
</script>

<template>
  <BaseWrapper customStyles="gap-20">
    <AboutBlock
      :title="$t('fences.intro.title')"
      :text="$t('fences.intro.text')"
      :url="introImage"
      :alt="$t('fences.intro.alt')"
    >
      <BaseArrowButton :name="$t('fences.cta.button')" :to="localePath('/kontaktai')" />
    </AboutBlock>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("fences.types.title") }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
        <FencesCategoryCard v-for="category in categories" :key="category.key" v-bind="category" />
      </div>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("fences.why.title") }}</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <li v-for="reason in reasons" :key="reason.title" class="flex gap-4">
          <span class="mt-2 w-3 h-3 shrink-0 bg-red-main"></span>
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold">{{ reason.title }}</h3>
            <p>{{ reason.text }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("fences.steps.title") }}</h2>
      <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <li v-for="(step, index) in steps" :key="step.title" class="flex flex-col gap-4">
          <span
            class="flex items-center justify-center w-14 h-14 bg-red-main text-white text-2xl font-bold"
          >
            {{ index + 1 }}
          </span>
          <h3 class="text-xl font-bold">{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("fences.faq.title") }}</h2>
      <div class="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
        <details v-for="item in faq" :key="item.q" class="group py-4">
          <summary
            class="flex items-center justify-between gap-4 text-xl font-medium hover:cursor-pointer list-none [&::-webkit-details-marker]:hidden"
          >
            {{ item.q }}
            <img
              src="/icons/arrowDown.svg"
              alt=""
              class="w-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p class="pt-4">{{ item.a }}</p>
        </details>
      </div>
    </section>

    <section class="flex flex-col gap-6">
      <h2 class="text-4xl font-medium text-center sm:text-left">
        {{ $t("fences.articles.title") }}
      </h2>
      <ul class="flex flex-col gap-3">
        <li v-for="article in articles" :key="article.to">
          <NuxtLink :to="article.to" class="text-red-main font-semibold hover:underline">
            {{ article.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <FencesCta />
  </BaseWrapper>
</template>
