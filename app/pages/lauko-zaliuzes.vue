<script setup lang="ts">
definePageMeta({
  breadcrumb: "lauko-zaliuzes",
  hero: "/images/zaliuzes/blinds2.jpg",
});

// Turinys – pagal MTSoft viešą žaliuzių pasiūlymą (mtsoft.lt/zaliuzes), tik be kainų.
const { t } = useI18n();
const localePath = useLocalePath();

const introImage = "/images/zaliuzes/blinds.jpg";

useSeo("lauko-zaliuzes", introImage);

const info = computed(() =>
  [1, 2, 3].map((n) => ({ title: t(`blinds.info.i${n}.title`), text: t(`blinds.info.i${n}.text`) })),
);

// Žaliuzės – vieno standarto: 19x100 (pavadinimas kaip MTSoft'e, neverčiamas)
const model = computed(() => ({
  title: t("blinds.models.name", { name: "19x100" }),
  image: "/images/zaliuzes/blinds2.jpg",
  alt: t("blinds.models.alt"),
  specs: [
    { label: t("blinds.models.thickness"), value: "19 mm" },
    { label: t("blinds.models.width"), value: "100 mm" },
    { label: t("blinds.models.lengthHorizontal"), value: t("blinds.models.upTo", { value: 1500 }) },
    { label: t("blinds.models.lengthVertical"), value: t("blinds.models.upTo", { value: 2500 }) },
  ],
}));

const features = computed(() => [1, 2, 3, 4].map((n) => t(`blinds.features.f${n}`)));

const steel = computed(() =>
  [
    { key: "type", value: "Premium" },
    { key: "manufacturer", value: "Arcelor Ultramatt" },
    { key: "country", value: t("blinds.steel.countryValue") },
    { key: "techWarranty", value: t("blinds.steel.techWarrantyValue") },
    { key: "colorWarranty", value: t("blinds.steel.colorWarrantyValue") },
    { key: "thickness", value: "0,5 mm" },
    { key: "sameShade", value: t("blinds.steel.yes") },
    { key: "recommendedLength", value: "1500 mm" },
    { key: "coatingMass", value: "Zn 275 g/m²" },
    { key: "coating", value: t("blinds.steel.coatingValue") },
  ].map((row) => ({ label: t(`blinds.steel.${row.key}`), value: row.value })),
);

const colors = ["7016", "7024", "8019", "8017", "6020", "9005", "8004", "3009"];

const phone = computed(() => t("contacts.ofisoTelNr"));
</script>

<template>
  <BaseWrapper customStyles="gap-20">
    <AboutBlock
      :title="$t('blinds.intro.title')"
      :text="$t('blinds.intro.text')"
      :url="introImage"
      :alt="$t('blinds.intro.alt')"
    >
      <BaseArrowButton :name="$t('blinds.intro.contact')" :to="localePath('/kontaktai')" />
    </AboutBlock>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("blinds.info.title") }}</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <li
          v-for="item in info"
          :key="item.title"
          class="flex flex-col gap-2 border-l-4 border-red-main pl-6 py-2"
        >
          <span class="text-2xl font-bold">{{ item.title }}</span>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ model.title }}</h2>
      <p class="max-w-200">{{ $t("blinds.models.text") }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <NuxtImg
          :src="model.image"
          :alt="model.alt"
          sizes="sm:100vw md:50vw lg:600px"
          loading="lazy"
          class="w-full aspect-4/3 object-cover rounded-lg shadow-lg"
        />
        <div class="flex flex-col gap-8">
          <dl class="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
            <div v-for="spec in model.specs" :key="spec.label" class="flex justify-between gap-4 py-3">
              <dt class="text-gray-600">{{ spec.label }}</dt>
              <dd class="font-medium text-right">{{ spec.value }}</dd>
            </div>
          </dl>
          <ul class="flex flex-col gap-3 font-medium">
            <li v-for="feature in features" :key="feature" class="flex gap-3">
              <span class="mt-2 w-2 h-2 shrink-0 bg-red-main"></span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("blinds.steel.title") }}</h2>
      <p class="max-w-200">{{ $t("blinds.steel.text") }}</p>
      <dl class="max-w-200 flex flex-col divide-y divide-gray-200 border-y border-gray-200">
        <div
          v-for="row in steel"
          :key="row.label"
          class="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4 py-3"
        >
          <dt class="text-gray-600">{{ row.label }}</dt>
          <dd class="font-medium">{{ row.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("blinds.colors.title") }}</h2>
      <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <li v-for="color in colors" :key="color" class="flex flex-col gap-2 text-center font-medium">
          <NuxtImg
            :src="`/images/colors/${color}.png`"
            :alt="$t('blinds.colors.alt', { code: color })"
            width="292"
            height="126"
            loading="lazy"
            class="w-full h-auto rounded"
          />
          <span>RAL {{ color }}</span>
        </li>
      </ul>
      <p>{{ $t("blinds.colors.note") }}</p>
    </section>

    <section class="bg-gray-100 p-8 md:p-12 flex flex-col gap-6 items-center text-center">
      <h2 class="text-4xl font-medium">{{ $t("blinds.cta.title") }}</h2>
      <p class="max-w-150">{{ $t("blinds.cta.text") }}</p>
      <div class="flex flex-col sm:flex-row gap-8 items-center">
        <BaseArrowButton :name="$t('blinds.intro.contact')" :to="localePath('/kontaktai')" />
        <a
          :href="`tel:${phone.replaceAll(' ', '')}`"
          class="text-2xl font-bold hover:text-red-main transition-colors"
        >
          {{ phone }}
        </a>
      </div>
    </section>
  </BaseWrapper>
</template>
