<script setup lang="ts">
definePageMeta({
  breadcrumb: "kiemo-vartai",
});

// Galerija ir pakeisti puslapio vaizdai valdomi MTSoft'e (Tinklapio nustatymai → Vartų puslapis).
// Kol galerijoje nuotraukų nėra, skiltis nerodoma; nepakeistoms vietoms lieka numatytieji vaizdai.
await Promise.all([loadSiteData("gates"), loadSiteData("gateSlots")]);

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { gateImages, gateSlots } = useGates();

// Vaizdas pagal vietos raktą (raktai sutampa su MTSoft `Website/Slots.vue`):
// MTSoft'e nurodytas kelias ir aprašymas arba numatytieji
const slot = (key: string, fallback: string, alt: string) => {
  const image = gateSlots.value.find((item) => item.name === key);
  return {
    image: image?.url || fallback,
    alt: (locale.value === "en" ? image?.altEN : image?.alt) || alt,
  };
};

const intro = computed(() => slot("intro", "/images/tvoros/tvora14.jpg", t("gates.intro.alt")));

useSeo("kiemo-vartai", intro.value.image);

const types = computed(() =>
  [
    { key: "sliding", image: "/images/vartai/stumdomi-vartai.png" },
    { key: "swing", image: "/images/vartai/varstomi-vartai.png" },
    { key: "wicket", image: "/images/vartai/varteliai.png" },
  ].map(({ key, image }) => ({
    key,
    ...slot(key, image, t(`gates.${key}.alt`)),
    title: t(`gates.${key}.title`),
    text: t(`gates.${key}.text`),
    points: [1, 2, 3].map((n) => t(`gates.${key}.p${n}`)),
  })),
);

// Užpildai – mūsų tvorų profiliai (pavadinimai neverčiami)
const infills = computed(() => [
  { name: "Daimond", image: "/images/tvoros/daimond6090.jpg", to: "/tvoros/skardines-tvoros" },
  { name: "Plank", image: "/images/tvoros/plank.jpg", to: "/tvoros/skardines-tvoros" },
  { name: "Eglė", image: "/images/tvoros/eglė.jpg", to: "/tvoros/skardines-tvoros" },
  { name: "Žaliuzi", image: "/images/tvoros/žaliuzi.jpg", to: "/tvoros/skardines-tvoros" },
  { name: t("gates.infill.boards"), image: "/images/tvoros/dilė.jpg", to: "/tvoros/tvoralentes" },
  {
    name: t("gates.infill.segment"),
    image: "/images/tvoros/tvora22.jpg",
    to: "/tvoros/segmentines-tvoros",
  },
]);

const brands = computed(() =>
  [
    {
      name: "ROGER Technology",
      key: "roger",
      sliding: { image: "/images/vartai/roger-stumdomu-vartu-automatika.webp", models: "H30, R30, BG30" },
      swing: { image: "/images/vartai/roger-varstomu-vartu-automatika.webp", models: "BE20" },
    },
    {
      name: "CAME",
      key: "came",
      sliding: { image: "/images/vartai/came-stumdomu-vartu-automatika.jpg", models: "BX, BK, BKV" },
      swing: { image: "/images/vartai/came-varstomu-vartu-automatika.png", models: "KRONO, ATS" },
    },
  ].map((brand) => ({
    name: brand.name,
    text: t(`gates.automation.${brand.key}Text`),
    kits: [
      {
        label: t("gates.automation.forSliding"),
        models: brand.sliding.models,
        ...slot(
          `${brand.key}Sliding`,
          brand.sliding.image,
          t("gates.automation.altSliding", { brand: brand.name }),
        ),
      },
      {
        label: t("gates.automation.forSwing"),
        models: brand.swing.models,
        ...slot(
          `${brand.key}Swing`,
          brand.swing.image,
          t("gates.automation.altSwing", { brand: brand.name }),
        ),
      },
    ],
  })),
);

const features = computed(() => [1, 2, 3, 4].map((n) => t(`gates.automation.f${n}`)));

const steps = computed(() =>
  [1, 2, 3, 4].map((n) => ({
    title: t(`gates.steps.s${n}.title`),
    text: t(`gates.steps.s${n}.text`),
  })),
);

const faq = computed(() =>
  [1, 2, 3, 4].map((n) => ({ q: t(`gates.faq.q${n}.q`), a: t(`gates.faq.q${n}.a`) })),
);

// Straipsnių adresai abiem kalbomis skirtingi
const articles = computed(() =>
  locale.value === "en"
    ? [
        {
          title: t("gates.articles.a1"),
          to: "/en/articles/sliding-or-swing-yard-gates-which-are-suitable-for-me",
        },
        {
          title: t("gates.articles.a2"),
          to: "/en/articles/fence-gates-wickets-and-gate-automation-what-you-need-to-know",
        },
      ]
    : [
        {
          title: t("gates.articles.a1"),
          to: "/straipsniai/stumdomi-kiemo-vartai-ar-atveriami-kiemo-vartai-kurie-tinkami-man",
        },
        {
          title: t("gates.articles.a2"),
          to: "/straipsniai/tvoros-vartai-varteliai-ir-vartu-automatika-ka-reikia-zinoti",
        },
      ],
);

const phone = computed(() => t("contacts.ofisoTelNr"));

// DUK Google rezultatams (FAQPage)
useHead(() => ({
  script: [
    {
      key: "gates-faq-ld",
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
      :title="$t('gates.intro.title')"
      :text="$t('gates.intro.text')"
      :url="intro.image"
      :alt="intro.alt"
    >
      <BaseArrowButton :name="$t('gates.intro.cta')" :to="localePath('/kontaktai')" />
    </AboutBlock>

    <section class="flex flex-col gap-12">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("gates.types.title") }}</h2>
      <GatesType
        v-for="(type, index) in types"
        :key="type.key"
        v-bind="type"
        :reverse="index % 2 === 1"
      />
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("gates.infill.title") }}</h2>
      <p class="text-justify max-w-200">{{ $t("gates.infill.text") }}</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink
          v-for="infill in infills"
          :key="infill.name"
          :to="localePath(infill.to)"
          class="group flex flex-col gap-2 text-center font-medium"
        >
          <div class="overflow-hidden rounded-lg">
            <NuxtImg
              :src="infill.image"
              :alt="infill.name"
              sizes="sm:50vw md:33vw lg:200px"
              loading="lazy"
              class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span class="group-hover:text-red-main transition-colors">{{ infill.name }}</span>
        </NuxtLink>
      </div>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">
        {{ $t("gates.automation.title") }}
      </h2>
      <p class="text-justify max-w-200">{{ $t("gates.automation.text") }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="brand in brands"
          :key="brand.name"
          class="flex flex-col gap-6 shadow-lg p-4 md:p-8 rounded-lg border border-gray-100"
        >
          <h3 class="text-3xl font-medium">{{ brand.name }}</h3>
          <p>{{ brand.text }}</p>
          <div class="grid grid-cols-2 gap-4 mt-auto">
            <div v-for="kit in brand.kits" :key="kit.label" class="flex flex-col gap-2 text-center">
              <NuxtImg
                :src="kit.image"
                :alt="kit.alt"
                sizes="sm:50vw md:25vw lg:260px"
                loading="lazy"
                class="w-full aspect-4/3 object-contain"
              />
              <span class="font-medium">{{ kit.label }}</span>
              <span class="text-sm text-gray-600">{{ kit.models }}</span>
            </div>
          </div>
        </div>
      </div>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-medium">
        <li v-for="feature in features" :key="feature" class="flex gap-3">
          <span class="mt-2 w-2 h-2 shrink-0 bg-red-main"></span>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("gates.steps.title") }}</h2>
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

    <section v-if="gateImages.length" class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">
        {{ $t("gates.gallery.title") }}
      </h2>
      <GalleryMain :images="gateImages" />
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("gates.faq.title") }}</h2>
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
          <p class="pt-4 text-justify">{{ item.a }}</p>
        </details>
      </div>
    </section>

    <section class="flex flex-col gap-6">
      <h2 class="text-4xl font-medium text-center sm:text-left">
        {{ $t("gates.articles.title") }}
      </h2>
      <ul class="flex flex-col gap-3">
        <li v-for="article in articles" :key="article.to">
          <NuxtLink :to="article.to" class="text-red-main font-semibold hover:underline">
            {{ article.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="bg-red-main text-white p-8 md:p-12 flex flex-col gap-6 items-center text-center">
      <h2 class="text-4xl font-medium">{{ $t("gates.cta.title") }}</h2>
      <p class="max-w-150">{{ $t("gates.cta.text") }}</p>
      <div class="flex flex-col sm:flex-row gap-8 items-center">
        <BaseArrowButton
          :name="$t('gates.intro.cta')"
          variant="secondary"
          :to="localePath('/kontaktai')"
        />
        <a :href="`tel:${phone.replaceAll(' ', '')}`" class="text-2xl font-bold hover:underline">
          {{ phone }}
        </a>
      </div>
    </section>
  </BaseWrapper>
</template>
