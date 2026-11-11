<script setup lang="ts">
import type { CalculatorCategory, CalculatorModel } from "#shared/types/calculator";

// Tvoros modelis (kortelės su objektų nuotraukomis) ir nuo jo priklausantys pasirinkimai:
// skarda, pramatomumas, tvoralenčių montavimas, spalva
const { t, locale } = useI18n();
const { config, fence, model, colorsOf, selectModel, selectSteel } = useCalculator();

const colors = computed(() => colorsOf(fence.value));

const GROUPS: { category: CalculatorCategory; title: string }[] = [
  { category: "Tvora", title: "menu.skardines-tvoros" },
  { category: "Tvoralentė", title: "menu.tvoralentes" },
  { category: "Segmentas", title: "menu.segmentines-tvoros" },
];

const groups = computed(() =>
  GROUPS.map((group) => ({
    ...group,
    models: (config.value?.models ?? []).filter((item) => item.category === group.category),
  })).filter((group) => group.models.length),
);

// Segmentai MTSoft'e – atskiros tvoros kiekvienam aukščiui, čia – vienas modelis
const nameOf = (item: CalculatorModel) => (item.category === "Segmentas" ? t("calc.model.segment") : item.name);

const altOf = (item: CalculatorModel) =>
  (locale.value === "en" ? item.images[0]?.altEN : item.images[0]?.alt) || nameOf(item);

// Objektų nuotraukų peržiūra
const gallery = ref<CalculatorModel | null>(null);

// Pramatomumo pavyzdžiai
const SEE_THROUGH_IMAGES: Record<string, string> = {
  aklina: "/images/tvoros/eglėplus.jpg",
  nepramatoma: "/images/tvoros/daimond6090.jpg",
  vidutiniska: "/images/tvoros/tvora8.jpg",
  pramatoma: "/images/tvoros/plank.jpg",
  pramatoma25: "/images/tvoros/tvora7.jpg",
  pramatoma50: "/images/tvoros/tvora17.jpg",
};

const showTable = ref(false);
</script>

<template>
  <div class="flex flex-col gap-10">
    <div v-for="group in groups" :key="group.category" class="flex flex-col gap-4">
      <h3 class="text-xl font-medium">{{ $t(group.title) }}</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <CalculatorCard
          v-for="item in group.models"
          :key="item.id"
          :title="nameOf(item)"
          :image="item.images[0]?.url"
          :alt="altOf(item)"
          :placeholder="!item.images.length"
          :selected="fence.modelId === item.id"
          @select="selectModel(item.id)"
        >
          <button
            v-if="item.images.length"
            type="button"
            class="flex items-center justify-center gap-2 px-3 py-2 border-t border-gray-200 text-sm font-semibold text-gray-700 hover:text-red-main hover:cursor-pointer"
            @click="gallery = item"
          >
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 16 5-5 4 4 3-3 6 6" stroke-linejoin="round" />
            </svg>
            {{ $t("calc.photos") }} ({{ item.images.length }})
          </button>
        </CalculatorCard>
      </div>
    </div>

    <template v-if="model">
      <div v-if="model.steel" class="flex flex-col gap-4">
        <h3 class="text-xl font-medium">{{ $t("calc.steel.title") }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorCard
            :title="$t('calc.steel.premium')"
            :text="$t('calc.steel.premiumText')"
            :selected="fence.steel === 'premium'"
            @select="selectSteel('premium')"
          />
          <CalculatorCard
            v-if="model.eco"
            :title="$t('calc.steel.eco')"
            :text="$t('calc.steel.ecoText')"
            :selected="fence.steel === 'eco'"
            @select="selectSteel('eco')"
          />
        </div>
        <button
          type="button"
          class="self-start text-red-main font-semibold hover:underline hover:cursor-pointer"
          :aria-expanded="showTable"
          @click="showTable = !showTable"
        >
          {{ showTable ? $t("calc.steel.hide") : $t("calc.steel.compare") }}
        </button>
        <CalculatorSteelTable v-if="showTable" />
      </div>

      <div v-if="model.seeThrough.length" class="flex flex-col gap-4">
        <h3 class="text-xl font-medium">{{ $t("calc.seeThrough.title") }}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <CalculatorCard
            v-for="key in model.seeThrough"
            :key="key"
            :title="$t(`calc.seeThrough.${key}`)"
            :image="SEE_THROUGH_IMAGES[key]"
            :placeholder="!SEE_THROUGH_IMAGES[key]"
            :selected="fence.seeThrough === key"
            @select="fence.seeThrough = key"
          />
        </div>
      </div>

      <div v-if="model.twoSided" class="flex flex-col gap-4">
        <h3 class="text-xl font-medium">{{ $t("calc.boards.title") }}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          <CalculatorCard
            :title="$t('calc.boards.oneSided')"
            image="/images/tvoros/dilė.jpg"
            :selected="!fence.twoSided"
            @select="fence.twoSided = false"
          />
          <CalculatorCard
            :title="$t('calc.boards.twoSided')"
            image="/images/tvoros/tvora20.jpg"
            :selected="fence.twoSided"
            @select="fence.twoSided = true"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-medium">{{ $t("calc.color.title") }}</h3>
        <CalculatorColors v-model="fence.color" :colors="colors" />
        <p v-if="model.steel && fence.steel === 'eco'" class="text-sm text-gray-600">
          {{ $t("calc.color.ecoNote") }}
        </p>
      </div>
    </template>

    <BaseGalleryFullscreen
      v-if="gallery"
      :images="gallery.images"
      :currentImage="0"
      @closeModal="gallery = null"
    />
  </div>
</template>
