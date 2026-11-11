<script setup lang="ts">
import type { Image } from "~/data/interfaces";

definePageMeta({
  breadcrumb: "lauko-zaliuzes",
});

// Turinys – pagal MTSoft viešą žaliuzių pasiūlymą (mtsoft.lt/zaliuzes), tik be kainų.
const { t } = useI18n();
const localePath = useLocalePath();

const introImage = "/images/zaliuzes/blinds.jpg";

useSeo("lauko-zaliuzes", introImage);

const info = computed(() =>
  [1, 2, 3].map((n) => ({ title: t(`blinds.info.i${n}.title`), text: t(`blinds.info.i${n}.text`) })),
);

// Modelių pavadinimai kaip MTSoft'e (neverčiami)
const models = computed(() =>
  [
    { key: "m1", name: "20x100", thickness: "20 mm", image: "/images/zaliuzes/blinds.jpg" },
    { key: "m2", name: "18x100", thickness: "18 mm", image: "/images/zaliuzes/blinds2.jpg" },
  ].map((model) => ({
    title: t("blinds.models.name", { name: model.name }),
    image: model.image,
    alt: t(`blinds.models.${model.key}Alt`),
    specs: [
      { label: t("blinds.models.thickness"), value: model.thickness },
      { label: t("blinds.models.width"), value: "99 mm" },
      { label: t("blinds.models.length"), value: t("blinds.models.lengthValue") },
      { label: t("blinds.models.weight"), value: t("blinds.models.weightValue") },
    ],
  })),
);

const features = computed(() => [1, 2, 3, 4, 5, 6].map((n) => t(`blinds.features.f${n}`)));

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

// Gaminio informaciniai lapai (tekstas juose – lietuviškas); paspaudus atidaromi per visą ekraną
const sheets = computed<Image[]>(() =>
  [2, 3, 4, 5, 6].map((file, index) => {
    const name = t(`blinds.more.s${index + 1}`);
    return { name, url: `/images/zaliuzes/blindsPDF${file}.jpg`, alt: name, altEN: name };
  }),
);

const modalOpen = ref(false);
const currentSheet = ref(0);

const openSheet = (index: number) => {
  currentSheet.value = index;
  modalOpen.value = true;
};

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
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("blinds.models.title") }}</h2>
      <p class="text-justify max-w-200">{{ $t("blinds.models.text") }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article
          v-for="model in models"
          :key="model.title"
          class="flex flex-col shadow-lg rounded-lg border border-gray-100 overflow-hidden"
        >
          <NuxtImg
            :src="model.image"
            :alt="model.alt"
            sizes="sm:100vw md:50vw lg:600px"
            loading="lazy"
            class="w-full aspect-4/3 object-cover"
          />
          <div class="flex flex-col gap-4 p-4 md:p-8">
            <h3 class="text-3xl font-medium">{{ model.title }}</h3>
            <dl class="flex flex-col divide-y divide-gray-200">
              <div v-for="spec in model.specs" :key="spec.label" class="flex justify-between gap-4 py-2">
                <dt class="text-gray-600">{{ spec.label }}</dt>
                <dd class="font-medium text-right">{{ spec.value }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-medium">
        <li v-for="feature in features" :key="feature" class="flex gap-3">
          <span class="mt-2 w-2 h-2 shrink-0 bg-red-main"></span>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("blinds.steel.title") }}</h2>
      <p class="text-justify max-w-200">{{ $t("blinds.steel.text") }}</p>
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

    <section class="flex flex-col gap-8">
      <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("blinds.more.title") }}</h2>
      <p class="text-justify max-w-200">{{ $t("blinds.more.text") }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="(sheet, index) in sheets"
          :key="sheet.url"
          type="button"
          :aria-label="`${$t('blinds.more.zoom')}: ${sheet.name}`"
          class="overflow-hidden rounded-lg border border-gray-200 hover:cursor-pointer hover:border-red-main transition-colors"
          @click="openSheet(index)"
        >
          <NuxtImg
            :src="sheet.url"
            :alt="sheet.name"
            sizes="sm:100vw md:50vw lg:600px"
            loading="lazy"
            class="block w-full h-auto"
          />
        </button>
      </div>
      <BaseGalleryFullscreen
        v-if="modalOpen"
        :images="sheets"
        :currentImage="currentSheet"
        @closeModal="modalOpen = false"
      />
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
