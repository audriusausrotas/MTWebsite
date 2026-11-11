<script setup lang="ts">
import type { CalculatorCategory, CalculatorModel } from "#shared/types/calculator";

// Tvoros modelis (kortelės su objektų nuotraukomis) ir nuo jo priklausantys pasirinkimai:
// skarda, pramatomumas, tvoralenčių montavimas, spalva
const { t, locale } = useI18n();
const { config, selection, model, colors, selectModel, selectSteel } = useCalculator();

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

// Spalvų pavyzdžiai – public/images/colors; kitoms – apytikslė RAL spalva
const COLOR_IMAGES = ["3009", "6020", "7016", "7024", "8004", "8017", "8019", "9005"];
const COLOR_HEX: Record<string, string> = { "6005": "#114232", Zn: "#c4c8cc" };

const colorLabel = (color: string) => (color === "Zn" ? t("calc.color.zinc") : `RAL ${color}`);

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
          :selected="selection.modelId === item.id"
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
            :selected="selection.steel === 'premium'"
            @select="selectSteel('premium')"
          />
          <CalculatorCard
            v-if="model.eco"
            :title="$t('calc.steel.eco')"
            :text="$t('calc.steel.ecoText')"
            :selected="selection.steel === 'eco'"
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
            :selected="selection.seeThrough === key"
            @select="selection.seeThrough = key"
          />
        </div>
      </div>

      <div v-if="model.twoSided" class="flex flex-col gap-4">
        <h3 class="text-xl font-medium">{{ $t("calc.boards.title") }}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          <CalculatorCard
            :title="$t('calc.boards.oneSided')"
            image="/images/tvoros/dilė.jpg"
            :selected="!selection.twoSided"
            @select="selection.twoSided = false"
          />
          <CalculatorCard
            :title="$t('calc.boards.twoSided')"
            image="/images/tvoros/tvora20.jpg"
            :selected="selection.twoSided"
            @select="selection.twoSided = true"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-medium">{{ $t("calc.color.title") }}</h3>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="color in colors"
            :key="color"
            type="button"
            :aria-pressed="selection.color === color"
            class="flex flex-col items-center gap-1 p-1 border-2 rounded-lg transition-colors hover:cursor-pointer"
            :class="selection.color === color ? 'border-red-main' : 'border-transparent hover:border-gray-300'"
            @click="selection.color = color"
          >
            <!-- pavyzdžio kampe – gamintojo užrašas, todėl rodoma priartinta apatinė dalis -->
            <span v-if="COLOR_IMAGES.includes(color)" class="block w-24 h-16 overflow-hidden rounded-md">
              <NuxtImg
                :src="`/images/colors/${color}.png`"
                alt=""
                width="192"
                height="128"
                class="w-full h-full object-cover scale-[2] origin-bottom-right"
              />
            </span>
            <span
              v-else
              class="w-24 h-16 rounded-md border border-gray-200"
              :style="{ backgroundColor: COLOR_HEX[color] ?? '#9ca3af' }"
            ></span>
            <span class="text-sm font-semibold">{{ colorLabel(color) }}</span>
          </button>
        </div>
        <p v-if="model.steel && selection.steel === 'eco'" class="text-sm text-gray-600">
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
