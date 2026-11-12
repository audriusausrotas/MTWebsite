<script setup lang="ts">
import type { CalculatorCategory, CalculatorModel } from "#shared/types/calculator";

// Tvoros užpildo pasirinkimai, kiekvienas – atskirame skaičiuoklės žingsnyje (section):
//   model – modelis (kortelės su objektų nuotraukomis; grupės skirtukais, pasirinkus sąrašas susiskleidžia),
//   look  – pramatomumas (skardinėms tvoroms) arba tvoralenčių montavimas,
//   color – skarda (Premium / Eco) ir spalva.
const props = defineProps<{ section: "model" | "look" | "color" }>();

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

// rodoma grupė ir ar sąrašas išskleistas (kol modelis nepasirinktas – visada)
const category = ref<CalculatorCategory>(model.value?.category ?? groups.value[0]?.category ?? "Tvora");
const changing = ref(false);
const expanded = computed(() => !model.value || changing.value);
const shown = computed(() => groups.value.find((group) => group.category === category.value) ?? groups.value[0]);

const choose = (id: string) => {
  selectModel(id);
  changing.value = false;
};

const change = () => {
  if (model.value) category.value = model.value.category;
  changing.value = true;
};

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
  <!-- ---------- modelis ---------- -->
  <div v-if="props.section === 'model'" class="flex flex-col gap-5">
    <!-- pasirinktas modelis: viena eilutė vietoj viso sąrašo -->
    <div
      v-if="model && !expanded"
      class="flex items-center gap-4 p-3 border-2 border-red-main rounded-lg bg-white shadow-lg"
    >
      <NuxtImg
        v-if="model.images[0]"
        :src="model.images[0].url"
        :alt="altOf(model)"
        sizes="160px"
        class="w-24 sm:w-36 aspect-4/3 shrink-0 object-cover rounded"
      />
      <div class="flex flex-col gap-1 min-w-0 flex-1">
        <span class="text-sm text-gray-600">{{ $t(GROUPS.find((group) => group.category === model!.category)!.title) }}</span>
        <span class="text-xl font-bold text-red-main">{{ nameOf(model) }}</span>
        <button
          v-if="model.images.length"
          type="button"
          class="self-start text-sm font-semibold text-gray-700 hover:text-red-main hover:underline hover:cursor-pointer"
          @click="gallery = model"
        >
          {{ $t("calc.photos") }} ({{ model.images.length }})
        </button>
      </div>
      <button
        type="button"
        class="shrink-0 min-h-12 px-4 py-2 border-2 border-gray-300 font-bold hover:border-red-main hover:text-red-main hover:cursor-pointer"
        @click="change"
      >
        {{ $t("calc.model.change") }}
      </button>
    </div>

    <template v-else>
      <div v-if="groups.length > 1" class="flex flex-wrap gap-2" role="tablist">
        <button
          v-for="group in groups"
          :key="group.category"
          type="button"
          role="tab"
          :aria-selected="category === group.category"
          class="min-h-12 px-4 py-2 border-2 font-bold transition-colors hover:cursor-pointer"
          :class="
            category === group.category
              ? 'border-black bg-black text-white'
              : 'border-gray-300 bg-white hover:border-black'
          "
          @click="category = group.category"
        >
          {{ $t(group.title) }}
          <span class="font-normal opacity-70">({{ group.models.length }})</span>
        </button>
      </div>

      <div v-if="shown" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <CalculatorCard
          v-for="item in shown.models"
          :key="item.id"
          :title="nameOf(item)"
          :image="item.images[0]?.url"
          :alt="altOf(item)"
          :placeholder="!item.images.length"
          :selected="fence.modelId === item.id"
          @select="choose(item.id)"
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
    </template>

    <BaseGalleryFullscreen
      v-if="gallery"
      :images="gallery.images"
      :currentImage="0"
      @closeModal="gallery = null"
    />
  </div>

  <!-- kol modelis nepasirinktas, kiti žingsniai – tik užuomina -->
  <p v-else-if="!model" class="text-gray-600">{{ $t("calc.model.first") }}</p>

  <!-- ---------- pramatomumas arba tvoralenčių montavimas ---------- -->
  <template v-else-if="props.section === 'look'">
    <div v-if="model.seeThrough.length" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

    <div v-else-if="model.twoSided" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
  </template>

  <!-- ---------- skarda ir spalva ---------- -->
  <template v-else>
    <div v-if="model.steel" class="flex flex-col gap-4">
      <CalculatorHeading>{{ $t("calc.steel.title") }}</CalculatorHeading>
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

    <div class="flex flex-col gap-4">
      <CalculatorHeading v-if="model.steel">{{ $t("calc.color.title") }}</CalculatorHeading>
      <CalculatorColors v-model="fence.color" :colors="colors" />
      <p v-if="model.steel && fence.steel === 'eco'" class="text-sm text-gray-600">
        {{ $t("calc.color.ecoNote") }}
      </p>
    </div>
  </template>
</template>
